import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Lazy shared GoogleGenAI client instance with required User-Agent and fast timeout
let aiInstance: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  // If no key or placeholder template key, return null immediately for sub-millisecond fallback
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'undefined') return null;
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// SafariQuest Knowledge Base & Persona
const SYSTEM_INSTRUCTION = `You are the SafariQuest AI Concierge & Multilingual Safari Guide for "SafariQuest Tours & Travel Ltd", a premier tour operator based in Nairobi, Kenya.
Your mission is to provide warm, knowledgeable, and helpful travel guidance to guests in whatever language they write to you (English, Kiswahili, Français, Deutsch, Español, Italiano, Arabic, Japanese, etc.). Always respond in the language the visitor uses.

COMPANY INFORMATION:
- Company Name: SafariQuest Tours & Travel Ltd
- Official Payment Till (Buy Goods & Services): Till 6608497 (No extra transaction charges for guests)
- Direct Customer Support & WhatsApp: 0752632206 (International format: +254 752 632 206)
- Official Website: https://Kenya-Quest-Safari.com (Domain: Kenya-Quest-Safari.com)
- Official Email: reservations@Kenya-Quest-Safari.com
- Office Location: SafariQuest Plaza, Waiyaki Way, Westlands, Nairobi, Kenya
- License: Fully accredited by Kenya Association of Tour Operators (KATO) and Tourism Regulatory Authority (TRA)

FEATURED DESTINATIONS & TOUR PACKAGES (All include 4x4 transport, licensed guides, park fees, accommodations/meals as listed):
1. Nairobi National Park & City Tour: 30,000 KES (2 Days). Dawn game drive with city skyline, Sheldrick Elephant Orphanage, Giraffe Centre feeding, Bomas of Kenya cultural dance.
2. Mombasa & Malindi Coastal Holiday: 50,000 KES (4 Days / 3 Nights). Watamu marine coral gardens & dolphins, historic 1498 Vasco da Gama Pillar, UNESCO Fort Jesus, Diani white sands, Wasini Island dhow cruise.
3. Maasai Mara Big Five Migration Safari: 45,000 KES (3 Days / 2 Nights). Open savannah game drives, lions, leopards, cheetahs, elephants, Mara River hippo & crocodile crossings, luxury tented camp.
4. Cape Town & Winelands: 98,000 KES (5 Days / 4 Nights). Table Mountain rotating cable car, Chapman's Peak drive, Boulders Beach penguins, Stellenbosch wine tasting.
5. Zanzibar Spice Island: 54,000 KES (4 Days / 3 Nights). Stone Town UNESCO labyrinth, organic spice tour, Prison Island giant tortoises, Safari Blue sandbank dhow cruise.
6. Dubai City Lights & Desert Dune: 1,250 USD / 162,500 KES (5 Days / 4 Nights). Burj Khalifa 124th floor, VIP 4x4 red dune bashing with BBQ & fire show, Marina luxury yacht cruise.
7. Miami South Beach & Everglades: 1,500 USD / 195,000 KES (6 Days / 5 Nights). Art Deco Ocean Drive, Everglades alligator airboat safari, Biscayne Bay celebrity cruise, Little Havana.
8. Tokyo, Mount Fuji & Shinto Heritage: 1,800 USD / 234,000 KES (6 Days / 5 Nights). Senso-ji temple, TeamLab Planets digital art, Shinkansen bullet train to Mount Fuji & Lake Ashi, Shibuya scramble.

HOW TO BOOK & PAY VIA M-PESA:
1. Go to M-Pesa on mobile phone.
2. Select "Lipa Na M-Pesa" -> Select "Buy Goods and Services".
3. Enter Till Number: 6608497 (Registered as SafariQuest Tours & Travel Ltd).
4. Enter Deposit (30% of package cost) or Full Amount.
5. Enter M-Pesa PIN and confirm.
6. An instant confirmation code is issued; travelers enter the code on our website or show it via WhatsApp 0752632206 to receive their digital travel voucher and itinerary!

BEHAVIOR & SPEED GUIDELINES:
- Deliver fast, concise, and direct answers (under 120 words unless full multi-day itinerary is requested).
- Jump straight to the solution without repetitive throat-clearing, long intros, or excessive disclaimers.
- Greet visitors warmly with African hospitality (e.g. "Jambo!", "Karibu SafariQuest!").
- If asked about prices, provide the exact figures immediately.
- Mention Till 6608497 (Buy Goods, 0 fees) and WhatsApp 0752632206 for immediate booking assistance.
- Use clean formatting with quick bullet points and bold highlights for effortless scanning on phones.
- Never invent fabricated payment numbers or fake phone numbers.`;

// Intelligent fallback generator in case GEMINI_API_KEY is not set or network fails
function generateSmartFallback(message: string): string {
  const lower = message.toLowerCase();

  // Swahili Detection
  if (
    lower.includes('hujambo') ||
    lower.includes('jambo') ||
    lower.includes('habari') ||
    lower.includes('mambo') ||
    lower.includes('shingapi') ||
    lower.includes('bei') ||
    lower.includes('lipa') ||
    lower.includes('pesa') ||
    lower.includes('safari') ||
    lower.includes('asante')
  ) {
    if (lower.includes('nairobi')) {
      return `Jambo! Safari ya **Nairobi National Park & Wildlife Sanctuary (Siku 2)** ni **30,000 KES** kwa kila mtu. Inajumuisha mbuga ya wanyama, watoto wa tembo wa Sheldrick, Giraffe Centre na chakula cha jioni cha kitamaduni. Unaweza kulipa amana ya 30% (9,000 KES) kupitia **Till 6608497** (SafariQuest Tours & Travel Ltd). Tupigie au WhatsApp **0752632206** kwa usaidizi wa haraka!`;
    }
    if (lower.includes('mombasa') || lower.includes('malindi') || lower.includes('diani')) {
      return `Karibu Pwani! Likizo ya **Mombasa, Malindi na Diani (Siku 4 / Usiku 3)** ni **50,000 KES** kwa kila mtu. Inajumuisha hoteli ya ufukweni, safari ya Watamu Marine Park, Vasco da Gama Pillar, na ngome ya kihistoria ya Fort Jesus. Lipa kupitia M-Pesa **Till 6608497**. Wasiliana nasi kupitia WhatsApp **0752632206**!`;
    }
    if (lower.includes('mara') || lower.includes('maasai')) {
      return `Karibu Maasai Mara! Safari yetu ya **Maasai Mara Big Five (Siku 3 / Usiku 2)** ni **45,000 KES** kwa kila mtu. Inajumuisha gari la 4x4 Land Cruiser lenye paa la picha, kambi ya kifahari, viingilio vya mbuga na miongozo wa kitaalamu. Lipa amana kupitia **Till 6608497**. Tupigie **0752632206**!`;
    }
    if (lower.includes('till') || lower.includes('lipa') || lower.includes('mpesa')) {
      return `Kuhifadhi nafasi yako ni rahisi sana kupitia M-Pesa:\n1. Fungua M-Pesa kisha chagua **Lipa Na M-Pesa**.\n2. Chagua **Buy Goods and Services**.\n3. Weka Till Number: **6608497** (Jina: *SafariQuest Tours & Travel Ltd*).\n4. Weka amana ya 30% au kiasi kamili.\n5. Ingiza PIN yako na uthibitishe.\n\nUkishalipa, tutumie ujumbe kwenye WhatsApp **0752632206** ili upokee tikiti na ratiba rasmi!`;
    }
    return `Jambo na Karibu SafariQuest Tours & Travel! 🦁\n\nTuna vifurushi bora vya safari na likizo:\n- **Nairobi City & Wildlife (Siku 2):** 30,000 KES\n- **Mombasa & Malindi Beach (Siku 4):** 50,000 KES\n- **Maasai Mara Big 5 (Siku 3):** 45,000 KES\n- **Dubai (Siku 5):** 1,250 USD (162,500 KES)\n- **Cape Town (Siku 5):** 98,000 KES\n- **Tokyo, Japan (Siku 6):** 1,800 USD\n- **Miami, Florida (Siku 6):** 1,500 USD\n\nMalipo yote yanalindwa kupitia M-Pesa **Till 6608497**. Je, ungependa kupata ratiba ya safari ipi? Unaweza pia kutupigia moja kwa moja kwa **0752632206**!`;
  }

  // French Detection
  if (
    lower.includes('bonjour') ||
    lower.includes('salut') ||
    lower.includes('prix') ||
    lower.includes('combien') ||
    lower.includes('voyage') ||
    lower.includes('reserver') ||
    lower.includes('merci')
  ) {
    return `Bonjour et bienvenue chez SafariQuest Tours & Travel ! 🌍\n\nNous proposons des safaris inoubliables au Kenya et à l'international :\n- **Nairobi Parc National & Girafes (2 Jours) :** 30 000 KES\n- **Mombasa & Malindi Plage (4 Jours) :** 50 000 KES\n- **Maasai Mara Big Five Safari (3 Jours) :** 45 000 KES\n- **Dubaï Ville & Dunes (5 Jours) :** 1 250 USD\n- **Le Cap & Vignobles (5 Jours) :** 98 000 KES\n- **Tokyo & Mont Fuji (6 Jours) :** 1 800 USD\n- **Miami & Everglades (6 Jours) :** 1 500 USD\n\nPour réserver, un acompte de 30% se règle via M-Pesa **Till 6608497** (SafariQuest Tours & Travel Ltd). Pour toute question, écrivez-nous sur WhatsApp au **+254 752 632 206** ! Quelle destination vous intéresse ?`;
  }

  // German Detection
  if (lower.includes('hallo') || lower.includes('guten tag') || lower.includes('preis') || lower.includes('wie viel')) {
    return `Guten Tag und herzlich willkommen bei SafariQuest Tours! 🦁\n\nUnsere beliebtesten Safaris & Reisen:\n- **Nairobi Nationalpark & Giraffen (2 Tage):** 30.000 KES\n- **Mombasa & Malindi Strandurlaub (4 Tage):** 50.000 KES\n- **Maasai Mara Big Five Safari (3 Tage):** 45.000 KES\n- **Dubai (5 Tage):** 1.250 USD\n- **Kapstadt (5 Tage):** 98.000 KES\n\nZahlung via M-Pesa **Till 6608497**. Kontaktieren Sie uns direkt per WhatsApp unter **+254 752 632 206**!`;
  }

  // Spanish Detection
  if (lower.includes('hola') || lower.includes('cuanto') || lower.includes('precio') || lower.includes('viaje')) {
    return `¡Hola y bienvenido a SafariQuest Tours! 🌿\n\nNuestros mejores paquetes de safari:\n- **Nairobi y Parque Nacional (2 Días):** 30,000 KES\n- **Mombasa y Malindi Costa (4 Días):** 50,000 KES\n- **Maasai Mara Big 5 (3 Días):** 45,000 KES\n- **Dubái (5 Días):** 1,250 USD\n- **Ciudad del Cabo (5 Días):** 98,000 KES\n\nDepósito de reserva a través de M-Pesa **Till 6608497**. ¡Contáctenos en WhatsApp al **+254 752 632 206**!`;
  }

  // English / General Default
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('rate')) {
    return `Here are our official transparent tour rates per person:\n- **Nairobi Wildlife & City Grand Tour (2 Days):** 30,000 KES\n- **Mombasa & Malindi Beach Holiday (4 Days):** 50,000 KES\n- **Maasai Mara Big Five Migration (3 Days):** 45,000 KES\n- **Zanzibar Stone Town & Blue Safari (4 Days):** 54,000 KES\n- **Cape Town, Table Mountain & Winelands (5 Days):** 98,000 KES\n- **Dubai Lights & Desert Dune Safari (5 Days):** 1,250 USD (approx. 162,500 KES)\n- **Miami South Beach & Everglades (6 Days):** 1,500 USD (approx. 195,000 KES)\n- **Tokyo, Mount Fuji & Shinto Heritage (6 Days):** 1,800 USD (approx. 234,000 KES)\n\nAll tours can be secured with a **30% deposit** via M-Pesa **Till 6608497**!`;
  }

  if (lower.includes('till') || lower.includes('pay') || lower.includes('deposit') || lower.includes('mpesa')) {
    return `Booking is quick and verified through Lipa Na M-Pesa:\n1. Open your M-Pesa SIM tool / M-Pesa App.\n2. Tap **Lipa Na M-Pesa** -> **Buy Goods and Services**.\n3. Enter Till Number: **6608497** (*SafariQuest Tours & Travel Ltd*).\n4. Enter the 30% deposit or full amount.\n5. Enter your M-Pesa PIN and confirm.\n\nOnce paid, enter your confirmation code on our website or text our 24/7 team on WhatsApp **0752632206** to receive your booking voucher!`;
  }

  return `Karibu! I am your SafariQuest AI Travel Concierge. 🦁\n\nHow can I help you plan your dream adventure today?\n- **Explore Itineraries:** Ask about day-by-day schedules for Nairobi, Maasai Mara, Mombasa, Dubai, Tokyo, or Miami.\n- **Pricing & Discounts:** Get rates in KES or USD.\n- **Payment & Booking:** Guide on paying via M-Pesa **Till 6608497**.\n- **Support:** Direct contact via WhatsApp/Call at **0752632206**.\n\nFeel free to write to me in English, Kiswahili, French, or your preferred language!`;
}

// POST /api/chat/stream - Real-time low latency SSE streaming
app.post('/api/chat/stream', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Set SSE Headers for instantaneous chunk delivery
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const sendEvent = (data: { chunk?: string; done?: boolean }) => {
    if (!res.writableEnded && !res.closed) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  };

  const client = getAiClient();

  if (!client) {
    // Stream offline smart fallback smoothly with minimal delay
    const fallbackText = generateSmartFallback(message);
    const words = fallbackText.split(' ');
    for (let i = 0; i < words.length; i += 3) {
      if (res.writableEnded || res.closed) break;
      const piece = words.slice(i, i + 3).join(' ') + (i + 3 < words.length ? ' ' : '');
      sendEvent({ chunk: piece });
      await new Promise((resolve) => setTimeout(resolve, 15));
    }
    sendEvent({ done: true });
    return res.end();
  }

  let streamedAny = false;
  try {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) { // Keep last 6 turns for optimal speed and context
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'agent' || item.sender === 'assistant') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    // Stream with low latency thinking configuration
    const stream = await client.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW, // Minimizes reasoning latency for fastest response
        },
      },
    });

    for await (const chunk of stream) {
      if (res.writableEnded || res.closed) break;
      const chunkText = chunk.text;
      if (chunkText) {
        streamedAny = true;
        sendEvent({ chunk: chunkText });
      }
    }
    if (!res.writableEnded && !res.closed) {
      sendEvent({ done: true });
      res.end();
    }
  } catch (apiErr: any) {
    const isAborted =
      res.writableEnded ||
      res.closed ||
      apiErr?.name === 'AbortError' ||
      String(apiErr?.message || '').toLowerCase().includes('aborted');

    if (!isAborted) {
      console.warn('Gemini stream error, streaming smart fallback:', apiErr?.message || apiErr);
      if (!streamedAny && !res.writableEnded && !res.closed) {
        const fallbackText = generateSmartFallback(message);
        sendEvent({ chunk: fallbackText });
      }
    }
    if (!res.writableEnded && !res.closed) {
      sendEvent({ done: true });
      res.end();
    }
  }
});

// POST /api/chat - Fast single-shot fallback endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const client = getAiClient();

    if (!client) {
      const reply = generateSmartFallback(message);
      return res.json({ reply, model: 'safari-concierge-offline' });
    }

    try {
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.sender === 'user') {
            contents.push({ role: 'user', parts: [{ text: item.text }] });
          } else if (item.sender === 'agent' || item.sender === 'assistant') {
            contents.push({ role: 'model', parts: [{ text: item.text }] });
          }
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const replyText = response.text || generateSmartFallback(message);
      return res.json({ reply: replyText, model: 'gemini-3.8-flash' });
    } catch (apiErr: any) {
      const isAborted =
        apiErr?.name === 'AbortError' ||
        String(apiErr?.message || '').toLowerCase().includes('aborted');
      if (!isAborted) {
        console.warn('Gemini API call failed, using smart fallback:', apiErr?.message || apiErr);
      }
      const fallbackReply = generateSmartFallback(message);
      return res.json({ reply: fallbackReply, model: 'safari-concierge-fallback' });
    }
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`SafariQuest Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
