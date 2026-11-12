import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Globe2,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { OFFICIAL_TILL_NUMBER, OFFICIAL_SUPPORT_PHONE } from '../data/toursData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'agent',
    text: `Jambo & Welcome! 🦁 I am your SafariQuest AI Travel Concierge.

Feel free to ask me about:
- **Safari Itineraries:** Day-by-day schedules for Nairobi, Maasai Mara, Mombasa, Cape Town, Dubai, Tokyo, and Miami.
- **Tour Pricing & Inclusions:** Nairobi (30,000 KES), Mombasa (50,000 KES), Mara (45,000 KES), Dubai ($1,250), Tokyo ($1,800).
- **Payment & Booking:** How to pay 30% deposit via **Till 6608497**.
- **Multilingual Support:** I can chat in English, Kiswahili, Français, Deutsch, Español, and more!

How can I help you plan your journey today?`,
    timestamp: 'Just now',
  },
];

const QUICK_PROMPTS = [
  'Best time for Maasai Mara migration?',
  'How do I pay deposit with Till 6608497?',
  'What is included in the 4-Day Mombasa trip?',
  'Tell me about Dubai & Tokyo packages',
  'Ratiba ya Nairobi kwa Kiswahili',
  'Quels sont les détails du safari ?',
];

// Robust multilingual safari intelligence fallback
function getLocalSafariResponse(userText: string): string {
  const lower = userText.toLowerCase();

  // Swahili
  if (
    lower.includes('hujambo') ||
    lower.includes('jambo') ||
    lower.includes('habari') ||
    lower.includes('shingapi') ||
    lower.includes('bei') ||
    lower.includes('ratiba') ||
    lower.includes('lipa') ||
    lower.includes('pesa') ||
    lower.includes('safari')
  ) {
    if (lower.includes('nairobi')) {
      return `Jambo! Safari ya **Nairobi National Park & Wildlife Sanctuary (Siku 2)** ni **30,000 KES** tu kwa kila mtu.\n\n**Ratiba ya Siku kwa Siku:**\n- **Siku ya 1:** Mchezo wa asubuhi katika Mbuga ya Wanyama ya Nairobi (simba na vifaru weusi dhidi ya majumba marefu), watoto wa tembo wa David Sheldrick, kulisha twiga Giraffe Centre, na chakula cha jioni Bomas of Kenya.\n- **Siku ya 2:** Makumbusho ya Kitaifa ya Kenya, kahawa maalum Gigiri, maporomoko ya Karura Forest, na soko la Maasai.\n\nLipa amana ya 30% (9,000 KES) kupitia **Till 6608497** (SafariQuest Tours & Travel Ltd). Wasiliana nasi kwa WhatsApp **0752632206**!`;
    }
    if (lower.includes('mombasa') || lower.includes('malindi') || lower.includes('diani')) {
      return `Karibu Pwani! Likizo ya **Mombasa, Malindi na Diani Beach (Siku 4 / Usiku 3)** ni **50,000 KES** kwa kila mtu.\n\n**Vivutio Vikuu:**\n- Hifadhi ya Bahari ya Watamu na Pomboo (dolphins)\n- Mnara wa kihistoria wa Vasco da Gama (1498) na Ngome ya Fort Jesus\n- Kisiwa cha Wasini na chakula cha vyakula vya baharini\n- Malazi ya kifahari ufukweni mwa Diani\n\nLipa amana kupitia **Till 6608497**. Piga simu au WhatsApp **0752632206**!`;
    }
    if (lower.includes('mara') || lower.includes('maasai')) {
      return `Karibu Maasai Mara! Safari ya **Maasai Mara Big Five Migration (Siku 3 / Usiku 2)** ni **45,000 KES** kwa kila mtu.\n\nInajumuisha:\n- Gari la 4x4 Land Cruiser lenye paa la picha\n- Kambi ya kifahari ya Keekorok au Mara Serena\n- Malazi na milo yote (Full Board)\n- Viingilio vyote vya mbuga ya KWS & Mara Reserve\n\nKuhifadhi nafasi, tuma amana kupitia M-Pesa **Till 6608497**!`;
    }
    if (lower.includes('till') || lower.includes('lipa') || lower.includes('mpesa')) {
      return `Jinsi ya kulipa kupitia M-Pesa:\n1. Fungua M-Pesa kisha chagua **Lipa Na M-Pesa**.\n2. Chagua **Buy Goods and Services**.\n3. Weka Till Number: **6608497** (*SafariQuest Tours & Travel Ltd*).\n4. Weka amana ya 30% au kiasi kamili.\n5. Weka PIN na uthibitishe.\n\nUkishalipa, weka nambari ya uthibitisho kwenye tovuti yetu au tutumie WhatsApp **0752632206** kwa tikiti ya haraka!`;
    }
    return `Jambo na Karibu SafariQuest Tours & Travel! 🦁\n\nTuna vifurushi vifuatavyo:\n- **Nairobi City & Wildlife (Siku 2):** 30,000 KES\n- **Mombasa & Malindi Beach (Siku 4):** 50,000 KES\n- **Maasai Mara Big Five (Siku 3):** 45,000 KES\n- **Dubai City & Desert (Siku 5):** 1,250 USD\n- **Tokyo & Mount Fuji (Siku 6):** 1,800 USD\n- **Miami & Everglades (Siku 6):** 1,500 USD\n\nMalipo yote yanalindwa kupitia M-Pesa **Till 6608497**. Je, ungependa ratiba ya safari ipi? Tupigie **0752632206**!`;
  }

  // French
  if (
    lower.includes('bonjour') ||
    lower.includes('salut') ||
    lower.includes('prix') ||
    lower.includes('combien') ||
    lower.includes('voyage') ||
    (lower.includes('safari') && (lower.includes('francais') || lower.includes('français')))
  ) {
    return `Bonjour et bienvenue chez SafariQuest Tours & Travel ! 🌍\n\nVoici nos forfaits incontournables :\n- **Nairobi Parc & Girafes (2 Jours) :** 30 000 KES (~230 USD)\n- **Mombasa & Malindi Plage (4 Jours) :** 50 000 KES (~385 USD)\n- **Maasai Mara Big Five Safari (3 Jours) :** 45 000 KES (~345 USD)\n- **Dubaï Cité & Désert (5 Jours) :** 1 250 USD\n- **Tokyo & Mont Fuji (6 Jours) :** 1 800 USD\n- **Miami & Everglades (6 Jours) :** 1 500 USD\n\n**Réservation :** Acompte de 30% par M-Pesa **Till 6608497** (SafariQuest Tours & Travel Ltd). Assistance 24/7 sur WhatsApp au **+254 752 632 206** !`;
  }

  // Migration questions
  if (lower.includes('migration') || lower.includes('wildebeest') || lower.includes('best time')) {
    return `The world-famous **Great Wildebeest Migration** in Maasai Mara peaks between **July and October**, when over 1.5 million wildebeest and zebras cross the crocodile-infested Mara River.\n\nHowever, Maasai Mara offers extraordinary Big Five game viewing **year-round**! Our 3-Day Maasai Mara Safari is priced at **45,000 KES** with 4x4 pop-up roof Land Cruisers and luxury tented lodge stays.\n\nSecure your travel dates with a 30% deposit via Till **6608497**!`;
  }

  // Till & M-Pesa
  if (lower.includes('till') || lower.includes('pay') || lower.includes('deposit') || lower.includes('mpesa')) {
    return `Booking with Lipa Na M-Pesa is instant and 100% secure:\n1. On your phone, go to **M-Pesa** -> **Lipa Na M-Pesa**.\n2. Select **Buy Goods and Services**.\n3. Enter Till Number: **6608497** (*SafariQuest Tours & Travel Ltd*).\n4. Enter 30% deposit or full tour amount.\n5. Enter your M-Pesa PIN and confirm.\n\nEnter your transaction code in the verification tool on our website or text WhatsApp **0752632206** to receive your booking voucher!`;
  }

  // Dubai / Tokyo / Miami
  if (lower.includes('dubai') || lower.includes('tokyo') || lower.includes('miami')) {
    return `Here are our premier international packages:\n- **Dubai (5 Days / 4 Nights):** 1,250 USD (approx. 162,500 KES) – Burj Khalifa 124th floor, VIP 4x4 red dune desert safari with BBQ show, Dubai Marina luxury yacht cruise.\n- **Tokyo & Mount Fuji (6 Days / 5 Nights):** 1,800 USD (approx. 234,000 KES) – Senso-ji Temple, TeamLab digital art, Shinkansen bullet train to Mount Fuji, Shibuya Sky.\n- **Miami & Everglades (6 Days / 5 Nights):** 1,500 USD (approx. 195,000 KES) – South Beach Ocean Drive, alligator airboat safari, Biscayne Bay cruise, Little Havana.\n\nAll packages include 4-star hotels, guided tours, and airport transfers. Inquire on WhatsApp **0752632206**!`;
  }

  // Default response
  return `Welcome to SafariQuest Tours & Travel! 🦁\n\nHow can I help you today?\n- **Tour Packages:** Nairobi (30,000 KES), Mombasa & Malindi (50,000 KES), Maasai Mara (45,000 KES), Dubai (1,250 USD), Tokyo (1,800 USD), Miami (1,500 USD).\n- **Day-by-Day Itineraries:** Open any tour or ask me here for full morning/afternoon/evening schedules.\n- **Payment:** Lipa Na M-Pesa **Till 6608497** (30% deposit to confirm).\n- **Direct Support:** WhatsApp / Call **0752632206**.\n\nFeel free to write to me in English, Kiswahili, Français, or any language you prefer!`;
}

interface AiChatAgentProps {
  onOpenBooking?: () => void;
  onSelectDestination?: (cityId: string) => void;
}

export const AiChatAgent: React.FC<AiChatAgentProps> = ({
  onOpenBooking,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Quick in-memory cache for ultra-fast instant answers on repeat queries
  const answerCacheRef = useRef<Map<string, string>>(new Map());

  // Handle sending a message with real-time streaming for fastest perceived response
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const agentMsgId = 'agt-' + (Date.now() + 1);
    const agentMessagePlaceholder: ChatMessage = {
      id: agentMsgId,
      sender: 'agent',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Optimistically add both messages right away so UI feels instantaneous
    setMessages((prev) => [...prev, userMessage, agentMessagePlaceholder]);
    setInputValue('');
    setIsLoading(true);

    // Fast-path: Check memory cache first
    const cacheKey = text.toLowerCase().trim();
    if (answerCacheRef.current.has(cacheKey)) {
      const cachedAnswer = answerCacheRef.current.get(cacheKey)!;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === agentMsgId ? { ...msg, text: cachedAnswer } : msg))
      );
      setIsLoading(false);
      return;
    }

    try {
      // Connect to fast SSE streaming endpoint
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              if (data.chunk) {
                accumulatedText += data.chunk;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === agentMsgId ? { ...msg, text: accumulatedText } : msg
                  )
                );
              }
            } catch (parseErr) {
              // Ignore partial JSON chunks
            }
          }
        }
      }

      // Check remaining buffer
      if (buffer.trim().startsWith('data: ')) {
        try {
          const data = JSON.parse(buffer.trim().slice(6));
          if (data.chunk) {
            accumulatedText += data.chunk;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === agentMsgId ? { ...msg, text: accumulatedText } : msg
              )
            );
          }
        } catch (e) {}
      }

      if (accumulatedText) {
        answerCacheRef.current.set(cacheKey, accumulatedText);
      } else {
        // Fallback to local intelligent response if stream returned empty
        const fallbackReply = getLocalSafariResponse(text);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === agentMsgId ? { ...msg, text: fallbackReply } : msg
          )
        );
        answerCacheRef.current.set(cacheKey, fallbackReply);
      }
    } catch (err) {
      console.warn('Streaming error, falling back to instant local responder:', err);
      const fallbackReply = getLocalSafariResponse(text);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === agentMsgId ? { ...msg, text: fallbackReply } : msg
        )
      );
      answerCacheRef.current.set(cacheKey, fallbackReply);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // Helper to render bold markdown and line breaks
  const formatMessageText = (content: string) => {
    return content.split('\n').map((line, idx) => {
      // Parse markdown bold: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block min-h-[1.2em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('- ')) {
              return (
                <span key={pIdx} className="flex items-start gap-1.5 pl-1 my-0.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">•</span>
                  <span>{part.slice(2)}</span>
                </span>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Launcher Button (Positioned above WhatsApp button to prevent collision) */}
      {!isOpen && (
        <div className="fixed bottom-22 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 border border-emerald-500/40"
            aria-label="Open Multilingual Safari AI Guide"
          >
            {/* Live Indicator Pulse */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
            </span>

            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            
            <div className="flex flex-col text-left">
              <span className="text-xs font-black tracking-wide flex items-center gap-1">
                <span>Safari AI Concierge</span>
              </span>
              <span className="text-[10px] text-emerald-200 font-medium">
                Multilingual Travel Guide
              </span>
            </div>

            {/* Micro Badge */}
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 font-semibold border border-emerald-400/20">
              Till 6608497
            </span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-200 max-h-[85vh] h-[600px] animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-4 flex items-center justify-between border-b border-emerald-800/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-white shadow-inner">
                  <Bot className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white">SafariQuest AI</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-semibold border border-emerald-400/30 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                    <span>Fast Response</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-200">
                  <Globe2 className="w-3 h-3" />
                  <span>EN · Kiswahili · FR · DE · ES</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 border-b border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-900 dark:text-emerald-200 shrink-0">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Ask in any language about tours & Till 6608497</span>
            </div>
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-emerald-800 dark:text-emerald-300 font-bold hover:underline cursor-pointer"
              >
                Book Now
              </button>
            )}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              const isCurrentStreaming = !isUser && isLoading && idx === messages.length - 1;

              // If agent message is still waiting for first token
              if (!isUser && !msg.text) {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 flex-row animate-fadeIn">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold bg-emerald-700 dark:bg-emerald-500 text-white shadow-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2 shadow-xs">
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                      </span>
                      <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300">Fast replying...</span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                        : 'bg-emerald-700 dark:bg-emerald-500 text-white'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs sm:text-sm shadow-xs ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-tr-xs'
                        : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80'
                    }`}
                  >
                    <div>
                      {formatMessageText(msg.text)}
                      {isCurrentStreaming && (
                        <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-500 animate-pulse align-middle" />
                      )}
                    </div>
                    <div
                      className={`text-[10px] mt-1 text-right font-medium ${
                        isUser ? 'text-emerald-200' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium whitespace-nowrap transition cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Send Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type in English, Kiswahili, Français..."
                disabled={isLoading}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 placeholder-slate-400 dark:placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 text-white rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
              <span>M-Pesa Till: <strong className="text-emerald-700 dark:text-emerald-400">{OFFICIAL_TILL_NUMBER}</strong></span>
              <span>Direct WhatsApp: <strong>{OFFICIAL_SUPPORT_PHONE}</strong></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
