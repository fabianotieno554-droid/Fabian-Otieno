export interface DestinationTip {
  cityId: string;
  cityName: string;
  country: string;
  region: string;
  tagline: string;
  taglineSw: string;
  taglineFr: string;
  heroHeadline: string;
  heroHeadlineSw: string;
  heroHeadlineFr: string;
  bestTimeToVisit: {
    idealMonths: string;
    idealMonthsSw: string;
    idealMonthsFr: string;
    weatherSummary: string;
    weatherSummarySw: string;
    weatherSummaryFr: string;
    wildlifeOrSeasonalPeak: string;
    wildlifeOrSeasonalPeakSw: string;
    wildlifeOrSeasonalPeakFr: string;
    monthsList: string[];
  };
  localEtiquette: {
    greeting: string;
    greetingSw: string;
    greetingFr: string;
    dos: string[];
    dosSw: string[];
    dosFr: string[];
    donts: string[];
    dontsSw: string[];
    dontsFr: string[];
    cultureTip: string;
    cultureTipSw: string;
    cultureTipFr: string;
  };
  currencyAndTipping: {
    currencyCode: string;
    currencyName: string;
    paymentAdvice: string;
    paymentAdviceSw: string;
    paymentAdviceFr: string;
    tippingNorms: string;
    tippingNormsSw: string;
    tippingNormsFr: string;
    acceptedMethods: string[];
  };
  packingAndDress: {
    dressCode: string;
    dressCodeSw: string;
    dressCodeFr: string;
    mustPackItems: string[];
    mustPackItemsSw: string[];
    mustPackItemsFr: string[];
    climateNote: string;
    climateNoteSw: string;
    climateNoteFr: string;
  };
  healthAndSafety: {
    healthAdvice: string;
    healthAdviceSw: string;
    healthAdviceFr: string;
    safetyAdvice: string;
    safetyAdviceSw: string;
    safetyAdviceFr: string;
    tapWaterSafe: boolean;
    emergencyNumber: string;
  };
}

export const LOCATION_TRAVEL_TIPS: Record<string, DestinationTip> = {
  nairobi: {
    cityId: 'nairobi',
    cityName: 'Nairobi',
    country: 'Kenya',
    region: 'East Africa',
    tagline: 'The Green City in the Sun & Urban Wildlife Capital',
    taglineSw: 'Jiji la Kijani kwenye Jua & Makao ya Wanyamapori',
    taglineFr: 'La Ville Verte au Soleil & Capitale de la Faune Urbaine',
    heroHeadline: 'Essential Safari & Urban Guide to Nairobi',
    heroHeadlineSw: 'Mwongozo Muhimu wa Safari na Jiji la Nairobi',
    heroHeadlineFr: 'Guide Indispensable pour Votre Safari & Séjour à Nairobi',
    bestTimeToVisit: {
      idealMonths: 'July to October & January to March',
      idealMonthsSw: 'Julai hadi Oktoba & Januari hadi Machi',
      idealMonthsFr: 'De juillet à octobre & de janvier à mars',
      weatherSummary: 'Sunny, pleasant days (22°C–27°C) with brisk, cool mornings (12°C–15°C). Avoid the heavy rains of April-May.',
      weatherSummarySw: 'Siku za jua na hali nzuri ya hewa (22°C–27°C) na asubuhi zenye ubaridi (12°C–15°C). Epuka mvua za masika za Aprili-Mei.',
      weatherSummaryFr: 'Journées ensoleillées et agréables (22°C–27°C) avec matinées fraîches (12°C–15°C). Évitez les fortes pluies d’avril-mai.',
      wildlifeOrSeasonalPeak: 'July–October coincides with the Mara Great Migration; Nairobi National Park offers prime rhino & lion sightings at dawn.',
      wildlifeOrSeasonalPeakSw: 'Julai–Oktoba huendana na Uhamaji Mkuu wa Nyumbu; Hifadhi ya Nairobi huwa na vifaru na simba wengi alfajiri.',
      wildlifeOrSeasonalPeakFr: 'Juillet à octobre correspond à la Grande Migration ; le Parc National de Nairobi offre de superbes observations de rhinocéros et lions à l’aube.',
      monthsList: ['Jan', 'Feb', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    localEtiquette: {
      greeting: 'Warm greetings are customary. Say "Habari" (How are you?) or "Jambo" followed by a gentle handshake with your right hand.',
      greetingSw: 'Salamu za kirafiki ni muhimu sana. Sema "Habari yako" au "Jambo" kisha ushikane mikono kwa heshima ukitumia mkono wa kulia.',
      greetingFr: 'Les salutations chaleureuses sont primordiales. Dites "Habari" ou "Jambo" avec une poignée de main de la main droite.',
      dos: [
        'Always ask permission before photographing locals or traditional dancers',
        'Respect wildlife space inside Nairobi National Park and stay in your vehicle',
        'Use respectful tone and right hand when handing over money or items',
        'Support certified local guides and community artisan crafts',
      ],
      dosSw: [
        'Omba ruhusa kabla ya kumpiga mtu picha au wacheza ngoma za kitamaduni',
        'Heshimu wanyamapori kwenye hifadhi na ubaki ndani ya gari la safari',
        'Tumia mkono wa kulia kutoa au kupokea pesa na vitu kwa heshima',
        'Saidia waelekezi wa ndani walioidhinishwa na kazi za mikono za kijamii',
      ],
      dosFr: [
        'Demandez toujours l’autorisation avant de photographier les habitants',
        'Respectez la distance de sécurité avec les animaux et restez dans le 4x4',
        'Utilisez la main droite pour tendre de l’argent ou un objet',
        'Privilégiez les artisans locaux et guides professionnels certifiés',
      ],
      donts: [
        'Do not smoke in public streets outside designated smoking zones (enforced fines)',
        'Avoid displaying flash jewelry or walking alone in poorly-lit alleys late at night',
        'Never litter in national parks or feed wildlife at Giraffe Centre/sanctuaries',
      ],
      dontsSw: [
        'Usivute sigara barabarani nje ya maeneo maalum yaliyotengwa (faini hutolewa)',
        'Epuka kuvaa vito vya thamani vinavyoonekana sana au kutembea vichochoroni usiku',
        'Usitupe takataka mbugani wala kuwalisha wanyama vyakula visivyo sahihi',
      ],
      dontsFr: [
        'Ne fumez pas dans la rue hors des zones fumeurs signalées (amendes strictes)',
        'Évitez d’exhiber des bijoux de valeur ou de marcher seul dans des ruelles isolées la nuit',
        'Ne jetez aucun déchet dans les parcs et ne nourrissez pas les animaux sauvages',
      ],
      cultureTip: 'Kenyans value warmth, patience, and humor. Inquiring about one\'s day or family before asking for directions breaks the ice instantly.',
      cultureTipSw: 'Wakenya wanapenda ukarimu, uvumilivu na bashasha. Kuanza na salamu za upole kabla ya kuuliza chochote hufungua milango yote.',
      cultureTipFr: 'Les Kényans apprécient la courtoisie et la bienveillance. Prendre des nouvelles avant de demander un renseignement est très apprécié.',
    },
    currencyAndTipping: {
      currencyCode: 'KES',
      currencyName: 'Kenyan Shilling (KES)',
      paymentAdvice: 'Safaricom M-Pesa is accepted everywhere from modern malls to fruit stalls. SafariQuest accepts direct Safaricom Till 6608497 payments with zero fees.',
      paymentAdviceSw: 'Safaricom M-Pesa inakubalika kila mahali kuanzia maduka makubwa hadi masoko ya mtaani. SafariQuest inakubali malipo ya Till 6608497 bila makato yoyote.',
      paymentAdviceFr: 'Le paiement mobile Safaricom M-Pesa est accepté partout. SafariQuest accepte les paiements sans frais sur le Till 6608497.',
      tippingNorms: 'Safari driver-guide: $15–$25 (KES 2,000–3,500) per group per day. Restaurants: 10% for good service. Hotel porters: KES 100–200 per bag.',
      tippingNormsSw: 'Dereva wa safari: KES 2,000–3,500 kwa siku kwa kikundi. Mikahawa: 10% ya bili. Wabeba mizigo hotelini: KES 100–200.',
      tippingNormsFr: 'Guide chauffeur de safari : 15$–25$ (2000–3500 KES) par jour par groupe. Restaurant : 10%. Bagagiste : 100–200 KES.',
      acceptedMethods: ['Safaricom M-Pesa Till 6608497', 'Visa & Mastercard', 'Cash KES / USD (post-2013 bills)'],
    },
    packingAndDress: {
      dressCode: 'Safari casual & city smart. Earthy tones (khaki, beige, olive green). Avoid bright neon or dark blue/black (attracts insects).',
      dressCodeSw: 'Nguo za safari zisizo na rangi kali (khaki, kahawia, kijani kibichi). Epuka rangi ya bluu iliyokoza au nyeusi (huvutia wadudu).',
      dressCodeFr: 'Tenue décontractée chic et tons neutres (kaki, beige, vert olive). Évitez le bleu foncé ou le noir qui attirent les insectes.',
      mustPackItems: [
        'Warm fleece or windbreaker jacket for dawn game drives',
        'Brimmed safari sun hat & polarized UV sunglasses',
        'Comfortable closed-toe walking boots or trail shoes',
        'Binoculars (8x42 or 10x42) & high-zoom camera',
        'UK 3-pin plug adapter (Type G) & high-capacity power bank',
      ],
      mustPackItemsSw: [
        'Sweta au koti jepesi la kuzuia upepo kwa ajili ya safari ya asubuhi',
        'Kofia ya kivuli ya safari & miwani ya jua yenye UV',
        'Viatu vizuri vya kutembea vilivyofungwa',
        'Darubini (Binoculars) na kamera yenye lensi ya mbali',
        'Plagi ya umeme ya mtindo wa Uingereza (Type G) na power bank',
      ],
      mustPackItemsFr: [
        'Veste polaire ou coupe-vent pour les départs matinaux en safari',
        'Chapeau de soleil à larges bords et lunettes de soleil polarisées',
        'Chaussures de marche confortables fermées',
        'Jumelles (8x42 ou 10x42) et appareil photo avec zoom',
        'Adaptateur prise anglaise (Type G) et batterie externe',
      ],
      climateNote: 'Nairobi sits at 1,795m altitude; evenings get surprisingly cool even when days are warm.',
      climateNoteSw: 'Nairobi iko mwinuko wa mita 1,795; jioni huwa na ubaridi hata kama mchana ulikuwa na joto.',
      climateNoteFr: 'Nairobi se situe à 1 795 m d’altitude ; les soirées sont fraîches même après une journée chaude.',
    },
    healthAndSafety: {
      healthAdvice: 'Yellow fever certificate required if arriving from endemic countries. Malaria risk in Nairobi city is low, but prophylaxis is advised for rural parks.',
      healthAdviceSw: 'Cheti cha homa ya manjano kinahitajika kama unatoka nchi zenye ugonjwa huo. Hatari ya malaria Nairobi ni ndogo lakini dawa inashauriwa kwa mbuga za mbali.',
      healthAdviceFr: 'Certificat de fièvre jaune requis en provenance de pays endémiques. Risque de paludisme faible à Nairobi, conseillé pour les parcs.',
      safetyAdvice: 'Use registered rideshare (Uber/Bolt) or trusted SafariQuest chauffeurs at night. Keep bags zipped when strolling in busy central markets.',
      safetyAdviceSw: 'Tumia usafiri ulioidhinishwa (Uber/Bolt) au madereva wa SafariQuest usiku. Funga mikoba yako vizuri unapopita masokoni.',
      safetyAdviceFr: 'Utilisez les applications de VTC (Uber/Bolt) ou les chauffeurs SafariQuest la nuit. Gardez vos sacs fermés dans les marchés animés.',
      tapWaterSafe: false,
      emergencyNumber: 'Tourist Police / Emergency: 999 or 112 | SafariQuest 24/7 Support: 0752632206',
    },
  },

  mombasa: {
    cityId: 'mombasa',
    cityName: 'Mombasa & Diani',
    country: 'Kenya',
    region: 'Swahili Coast',
    tagline: 'Turquoise Coral Reefs, Pristine Sands & Swahili Heritage',
    taglineSw: 'Bahari ya Matumbawe, Mchanga Mweupe na Utamaduni wa Waswahili',
    taglineFr: 'Récifs Coralliens, Sable Blanc & Héritage Swahili',
    heroHeadline: 'Coastal & Beach Holiday Traveler Essentials',
    heroHeadlineSw: 'Mwongozo Muhimu wa Likizo ya Pwani na Fukwe',
    heroHeadlineFr: 'Conseils Voyageurs pour la Côte et les Plages de Diani',
    bestTimeToVisit: {
      idealMonths: 'December to March & July to November',
      idealMonthsSw: 'Desemba hadi Machi & Julai hadi Novemba',
      idealMonthsFr: 'De décembre à mars & de juillet à novembre',
      weatherSummary: 'Warm tropical maritime climate (28°C–32°C) with balmy sea breezes. Calm ocean conditions ideal for snorkeling and diving.',
      weatherSummarySw: 'Hali ya hewa ya joto la pwani (28°C–32°C) na upepo mwanana wa bahari. Bahari tulivu inayofaa kuogelea na kupiga mbizi.',
      weatherSummaryFr: 'Climat tropical chaud (28°C–32°C) avec brise marine constante. Mer calme propice à la plongée et aux sorties dhow.',
      wildlifeOrSeasonalPeak: 'October to February brings optimal clarity for coral reef marine safaris and whale shark sightings off Diani.',
      wildlifeOrSeasonalPeakSw: 'Oktoba hadi Februari bahari huwa shwari sana na safi kwa kutazama matumbawe na papa-nyangumi Diani.',
      wildlifeOrSeasonalPeakFr: 'Octobre à février offre une clarté sous-marine exceptionnelle pour observer les récifs et requins-baleines.',
      monthsList: ['Jan', 'Feb', 'Mar', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    localEtiquette: {
      greeting: 'Greet with "Hujambo" or "Habari za asubuhi/mchana". In Swahili culture, elders are greeted with "Shikamoo" (answered by "Marahaba").',
      greetingSw: 'Salimia watu kwa "Hujambo" au "Habari". Kwa wazee tumia salamu ya heshima ya "Shikamoo" (huitikiwa "Marahaba").',
      greetingFr: 'Saluez par "Hujambo" ou "Habari". Pour les personnes âgées, la formule de respect traditionnelle est "Shikamoo".',
      dos: [
        'Dress modestly when walking through Mombasa Old Town or local villages (cover shoulders and knees)',
        'Try authentic coastal dishes: Biryani, Mishkaki, Viazi Karai, and fresh coconut water (Madafu)',
        'Remove shoes before entering coastal homes or religious sites when asked',
        'Bargain with a friendly smile at the Old Town spice markets and curio stalls',
      ],
      dosSw: [
        'Vaa nguo za heshima unapotembea Mji Mkongwe (Old Town) au vijijini (funika mabega na magoti)',
        'Onja vyakula halisi vya pwani: Biriani, Mishkaki, Viazi Karai, na Madafu safi',
        'Vua viatu kabla ya kuingia majumbani au sehemu za ibada unapoombwa',
        'Patana bei kwa tabasamu na heshima kwenye masoko ya viungo',
      ],
      dosFr: [
        'Adoptez une tenue décente dans la vieille ville et les marchés (épaules et genoux couverts)',
        'Dégustez la gastronomie côtière : Biryani, Mishkaki, Viazi Karai et eau de coco fraîche',
        'Retirez vos chaussures avant d’entrer dans une demeure ou lieu spirituel si demandé',
        'Négociez toujours avec le sourire dans les marchés d’épices',
      ],
      donts: [
        'Do not wear beachwear or swimwear outside the resort pool or sand beach area',
        'Never walk across living coral reefs with bare feet (protect reefs and avoid sea urchins)',
        'Do not purchase souvenirs made from protected coral, turtle shells, or sea conches',
      ],
      dontsSw: [
        'Usivae nguo za kuogelea nje ya maeneo ya ufukwe au hoteli',
        'Usikanyage matumbawe hai bila viatu maalum vya maji ili usiumie na kibawe',
        'Usinunue bidhaa zilizotengenezwa kwa matumbawe au kasa waliolindwa',
      ],
      dontsFr: [
        'Ne vous promenez pas en maillot de bain hors des plages et abords de piscine',
        'Ne marchez jamais pieds nus sur les coraux vivants (préservation et oursins)',
        'N’achetez aucun souvenir en corail ou carapace de tortue protégé',
      ],
      cultureTip: 'Life at the coast runs on "Pole Pole" (slowly, peacefully). Embody the unhurried Swahili hospitality and enjoy the coastal rhythm.',
      cultureTipSw: 'Maisha ya pwani yanaenda "Pole Pole". Kubali utulivu wa Kiswahili na ufurahie mapumziko bila haraka.',
      cultureTipFr: 'Le rythme côtier suit la philosophie "Pole Pole" (doucement, sereinement). Laissez-vous porter par la douceur de vivre swahilie.',
    },
    currencyAndTipping: {
      currencyCode: 'KES',
      currencyName: 'Kenyan Shilling (KES)',
      paymentAdvice: 'Safaricom M-Pesa is universally accepted across tuk-tuks, beach kiosks, and excursions. Lipa Na M-Pesa Till 6608497 is fully supported.',
      paymentAdviceSw: 'M-Pesa inakubalika kuanzia kwenye tuk-tuk hadi mikahawa ya pwani. Lipa kwa Till 6608497 kwa safari zote.',
      paymentAdviceFr: 'M-Pesa est omniprésent, même pour les tuk-tuks et gargotes de plage. Till 6608497 accepté sans frais.',
      tippingNorms: 'Dhow crew & boat captains: KES 1,000–1,500 per day. Waiters: 10%. Tuk-tuk drivers appreciate rounding up the fare.',
      tippingNormsSw: 'Wafanyakazi wa mashua/dau: KES 1,000–1,500 kwa siku. Wahudumu wa hoteli: 10%. Dereva wa tuk-tuk unaweza kumuachia chenji ndogo.',
      tippingNormsFr: 'Équipage du dhow / bateau : 1000–1500 KES par excursion. Serveur : 10%. Tuk-tuk : arrondir au montant supérieur.',
      acceptedMethods: ['Safaricom M-Pesa', 'Credit/Debit Cards at resorts', 'Cash KES'],
    },
    packingAndDress: {
      dressCode: 'Lightweight linen, breathable cotton dresses, and sun protection. Modest wrap or kanga for cultural visits.',
      dressCodeSw: 'Nguo nyepesi za pamba au kitani, kofia ya jua, na kanga au leso ya kujifunika unapozuru mji.',
      dressCodeFr: 'Vêtements amples en lin ou coton léger, chapeau de soleil et paréo/kanga pour les visites culturelles.',
      mustPackItems: [
        'Waterproof dry-bag for dhow cruises and snorkeling excursions',
        'Reef-safe biodegradable sunscreen (SPF 50+) & aloe vera',
        'Sturdy water shoes / reef booties to protect against corals and sea urchins',
        'UV-protective rash guard for long snorkeling sessions',
        'Insect repellent with DEET for coastal evenings',
      ],
      mustPackItemsSw: [
        'Mfuko usiopitisha maji (dry bag) kwa safari za mashua na baharini',
        'Mafuta ya jua yanayolinda ngozi na yasiyoharibu matumbawe',
        'Viatu vya majini (water shoes) vya kuzuia miiba ya baharini',
        'Nguo maalum ya kuogelea inayozuia miale mikali ya jua (rash guard)',
        'Dawa ya kuzuia mbu kwa ajili ya jioni za pwani',
      ],
      mustPackItemsFr: [
        'Sac étanche pour les excursions en dhow et plongée',
        'Crème solaire éco-responsable (respect des récifs) SPF 50+',
        'Chaussons de plage aquatiques contre les oursins et rochers',
        'T-shirt anti-UV pour le snorkeling prolongé',
        'Répulsif moustiques tropical pour les soirées en bord de mer',
      ],
      climateNote: 'High humidity is common; lightweight, loose-fitting natural fabrics will keep you most comfortable.',
      climateNoteSw: 'Unyevunyevu wa hewa ni mwingi; nguo nyepesi zilizofunguka hukupa starehe kamili.',
      climateNoteFr: 'L’humidité tropicale est élevée ; privilégiez les coupes amples et tissus naturels respirants.',
    },
    healthAndSafety: {
      healthAdvice: 'Coastal areas are malaria-endemic; take preventative medication and sleep under treated mosquito nets.',
      healthAdviceSw: 'Maeneo ya pwani yana mbu wa malaria; tumia dawa za kinga na lala ndani ya chandarua chenye dawa.',
      healthAdviceFr: 'La zone côtière est impaludée ; suivez un traitement antipaludéen et dormez sous moustiquaire imprégnée.',
      safetyAdvice: 'Swim within designated resort beach flags. Rely on SafariQuest vetted boat captains rather than unverified beach touts.',
      safetyAdviceSw: 'Ogelea sehemu zilizowekwa alama za usalama. Tumia manahodha wa boti walioidhinishwa na SafariQuest badala ya wachuuzi wasiojulikana.',
      safetyAdviceFr: 'Baignez-vous dans les zones balisées. Faites appel aux capitaines certifiés partenaires de SafariQuest plutôt qu’aux rabatteurs.',
      tapWaterSafe: false,
      emergencyNumber: 'Coast Tourist Police: 999 / 112 | SafariQuest Helpline: 0752632206',
    },
  },

  capetown: {
    cityId: 'capetown',
    cityName: 'Cape Town',
    country: 'South Africa',
    region: 'Western Cape',
    tagline: 'Majestic Table Mountain, Vineyards & Coastal Scenic Drives',
    taglineSw: 'Mlima wa Table Mountain, Mashamba ya Mvinyo na Barabara za Pwani',
    taglineFr: 'Table Mountain, Vignobles & Routes Côtières Mythiques',
    heroHeadline: 'First-Timer’s Guide to the Mother City',
    heroHeadlineSw: 'Mwongozo wa Mara ya Kwanza kwa Jiji la Cape Town',
    heroHeadlineFr: 'Le Guide Idéal pour Explorer la Ville du Cap',
    bestTimeToVisit: {
      idealMonths: 'November to April (Summer & early Autumn)',
      idealMonthsSw: 'Novemba hadi Aprili (Majira ya joto na mwanzo wa masika)',
      idealMonthsFr: 'De novembre à avril (Été austral et début d’automne)',
      weatherSummary: 'Mediterranean climate: Warm, dry, sunny summer days (24°C–29°C) with low rainfall. Atlantic ocean waters remain brisk and refreshing (14°C–18°C).',
      weatherSummarySw: 'Hali ya hewa ya Mediterania: Siku za joto na jua (24°C–29°C) zenye mvua kidogo. Maji ya bahari ya Atlantic huwa ya baridi kiasi.',
      weatherSummaryFr: 'Climat méditerranéen : journées estivales sèches et ensoleillées (24°C–29°C). Eau de l’Atlantique vivifiante (14°C–18°C).',
      wildlifeOrSeasonalPeak: 'February & March feature grape harvesting in Stellenbosch; southern right whales visit Hermanus coastal waters from June to November.',
      wildlifeOrSeasonalPeakSw: 'Februari na Machi ni msimu wa kuvuna zabibu; nyangumi huonekana pwani ya Hermanus kuanzia Juni hadi Novemba.',
      wildlifeOrSeasonalPeakFr: 'Février et mars correspondent aux vendanges dans les vignobles ; les baleines franches croisent le long de la côte de juin à novembre.',
      monthsList: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    },
    localEtiquette: {
      greeting: 'Friendly "Hello" or "How are you?". South Africa has 11 official languages; English is the universal lingua franca for tourism and business.',
      greetingSw: 'Salamu ya kirafiki ya "Hello" au "How are you?". Kiingereza kinazungumzwa na kueleweka kila mahali.',
      greetingFr: 'Salutation chaleureuse en anglais : "Hello" ou "How are you?". L’anglais est la langue usuelle dans tous les commerces et hôtels.',
      dos: [
        'Pre-book Table Mountain aerial cableway tickets online to skip lengthy queues',
        'Observe African penguins at Boulders Beach from designated boardwalks only',
        'Tip car guards (KES 50–100 / R5–R10) when parking on public streets',
        'Indulge in a traditional Cape Malay bobotie or freshly caught kingklip fish',
      ],
      dosSw: [
        'Kata tiketi ya gari la waya la Table Mountain mapema mtandaoni kuepuka foleni',
        'Tazama ndege penguin wa Boulders Beach kutoka kwenye daraja za mbao pekee',
        'Wape walinzi wa maegesho ya magari zawadi ndogo ya shukrani (R5–R10)',
        'Onja vyakula maarufu vya Cape Malay kama bobotie na samaki safi wa baharini',
      ],
      dosFr: [
        'Réservez vos billets pour le téléphérique de Table Mountain à l’avance en ligne',
        'Observez les manchots de Boulders Beach uniquement depuis les passerelles en bois',
        'Donnez une petite pièce (5–10 Rands) aux gardiens de parking dans la rue',
        'Savourez la cuisine Cape Malay traditionnelle et les poissons frais du jour',
      ],
      donts: [
        'Do not hike Table Mountain or Lion\'s Head alone or in deteriorating weather',
        'Never touch, chase, or attempt to pet the penguins at Boulders Beach',
        'Avoid leaving valuable bags or cameras visible inside parked rental vehicles',
      ],
      dontsSw: [
        'Usipande milima ya Table Mountain au Lion\'s Head peke yako au hali ya hewa ikiwa mbaya',
        'Usijaribu kuwagusa au kuwasumbua ndege penguin',
        'Usiache mikoba au kamera wazi ndani ya gari lililoegeshwa',
      ],
      dontsFr: [
        'Ne partez pas en randonnée seul sur Table Mountain ou par météo incertaine',
        'Ne touchez jamais et ne nourrissez pas les manchots de Boulders Beach',
        'Ne laissez aucun objet de valeur en vue dans votre véhicule en stationnement',
      ],
      cultureTip: 'Capetonians love the great outdoors and food culture. Ask your guide or barista for their favorite secret coastal bakery or tidal pool.',
      cultureTipSw: 'Wakazi wa Cape Town wanapenda maisha ya nje na vyakula bora. Waulize wenyeji maeneo mazuri ya siri ya kuona machweo.',
      cultureTipFr: 'Les habitants sont passionnés d’art de vivre, gastronomie et plein air. Demandez à votre guide ses criques et cafés secrets préférés.',
    },
    currencyAndTipping: {
      currencyCode: 'ZAR',
      currencyName: 'South African Rand (ZAR)',
      paymentAdvice: 'Cape Town is almost completely cashless. Visa, Mastercard, Apple Pay, and Google Pay are ubiquitous. Contactless tap is accepted even in food trucks.',
      paymentAdviceSw: 'Cape Town inatumia kadi na malipo ya kielektroniki karibu kila mahali. Visa, Mastercard na Apple Pay ziko kila duka na mkahawa.',
      paymentAdviceFr: 'Le paiement sans contact par carte bancaire (Visa, Mastercard, Apple Pay) est accepté dans la quasi-totalité des établissements.',
      tippingNorms: 'Restaurants: 10%–15% is standard for seated service. Tour guides: R150–R250 ($10–$15) per day. Hotel staff: R20–R50 per request.',
      tippingNormsSw: 'Mikahawa: 10%–15% ya bili. Waelekezi wa safari: R150–R250 kwa siku. Wahudumu wa hoteli: R20–R50.',
      tippingNormsFr: 'Restaurants : 10% à 15% de la note. Guide d’excursion : 150 à 250 Rands par jour. Personnel hôtelier : 20 à 50 Rands.',
      acceptedMethods: ['Visa & Mastercard', 'Contactless Tap & Mobile Pay', 'ZAR Cash for small tips'],
    },
    packingAndDress: {
      dressCode: 'Smart casual, outdoor layers. Bring a sturdy windproof jacket: weather can shift rapidly from sunshine to ocean gales ("Cape Doctor").',
      dressCodeSw: 'Nguo nadhifu za kawaida na koti la kuzuia upepo mkali wa bahari unaoweza kutokea ghafla.',
      dressCodeFr: 'Tenue décontractée soignée et superposition de couches. Prévoyez un bon coupe-vent pour les rafales du "Cape Doctor".',
      mustPackItems: [
        'Windbreaker jacket and light fleece for Table Mountain summit',
        'Sturdy grip hiking shoes for Lion\'s Head & Kirstenbosch trails',
        'Sunglasses and SPF 50 sunscreen for sunny coastal drives',
        'Smart evening attire for Franschhoek & Constantia wine estates',
        'South Africa Type M 3-round-pin plug adapter',
      ],
      mustPackItemsSw: [
        'Koti la kuzuia upepo na sweta jepesi kwa kilele cha Table Mountain',
        'Viatu vya mlimani vyenye mshiko imara kwa matembezi',
        'Miwani ya jua na mafuta ya ngozi ya SPF 50',
        'Nguo nadhifu za jioni kwa ziara za mashamba ya mvinyo',
        'Adapta ya umeme ya mtindo wa Afrika Kusini (Type M yenye pini 3 za mviringo)',
      ],
      mustPackItemsFr: [
        'Veste coupe-vent et polaire légère pour le sommet de Table Mountain',
        'Chaussures de randonnée avec bonne adhérence pour Lion’s Head',
        'Lunettes de soleil et crème solaire haute protection pour les routes côtières',
        'Tenue élégante pour les dégustations dans les domaines viticoles réputés',
        'Adaptateur de prise spécifique à l’Afrique du Sud (Type M à fiches rondes)',
      ],
      climateNote: 'Summer is breezy and dry; autumn offers gorgeous calm days with stunning vineyard colors.',
      climateNoteSw: 'Majira ya joto yana upepo mwanana; masika yana siku tulivu sana na mandhari ya kupendeza.',
      climateNoteFr: 'L’été est aéré et très agréable ; l’automne offre des journées douces idéales pour les vignobles.',
    },
    healthAndSafety: {
      healthAdvice: 'No malaria in the Western Cape. Tap water is among the cleanest and highest-quality in the world and 100% safe to drink directly from the tap.',
      healthAdviceSw: 'Hakuna malaria Cape Town. Maji ya bomba ni safi sana na salama kunywa moja kwa moja.',
      healthAdviceFr: 'Aucun risque de paludisme dans la province du Cap. L’eau du robinet est d’excellente qualité et potable partout.',
      safetyAdvice: 'Stick to well-lit tourist areas (V&A Waterfront, Camps Bay, Kloof St) at night; use Uber for evening transit between neighborhoods.',
      safetyAdviceSw: 'Tembea maeneo maarufu yenye mwanga (V&A Waterfront, Camps Bay) nyakati za usiku; tumia Uber kusafiri kati ya vitongoji.',
      safetyAdviceFr: 'Privilégiez les quartiers animés (V&A Waterfront, Camps Bay) en soirée et déplacez-vous en Uber la nuit.',
      tapWaterSafe: true,
      emergencyNumber: 'Tourist Safety Support: 107 or 021 480 7700 | Flying Squad Police: 10111',
    },
  },

  zanzibar: {
    cityId: 'zanzibar',
    cityName: 'Stone Town & Zanzibar',
    country: 'Tanzania',
    region: 'Swahili Archipelago',
    tagline: 'The Spice Island of Sultan Palaces & Powder-White Sands',
    taglineSw: 'Kisiwa cha Karafuu, Majumba ya Kisultani na Fukwe Nyeupe',
    taglineFr: 'L’Île aux Épices, Palais de Sultans & Plages de Rêve',
    heroHeadline: 'Navigating Stone Town & Island Beaches',
    heroHeadlineSw: 'Mwongozo wa Kutembelea Mji Mkongwe na Fukwe za Zanzibar',
    heroHeadlineFr: 'Conseils pour Explorer Stone Town et les Plages de Zanzibar',
    bestTimeToVisit: {
      idealMonths: 'June to October & December to February',
      idealMonthsSw: 'Juni hadi Oktoba & Desemba hadi Februari',
      idealMonthsFr: 'De juin à octobre & de décembre à février',
      weatherSummary: 'Warm tropical climate (27°C–31°C). The "kaskazi" northeast breeze blows Dec–Feb, while gentle "kusi" winds arrive from June to October.',
      weatherSummarySw: 'Hali ya hewa ya joto la kitropiki (27°C–31°C). Upepo wa kaskazi unavuma Desemba–Februari na kusi Juni–Oktoba.',
      weatherSummaryFr: 'Chaleur tropicale agréable (27°C–31°C). Climat idéal pour la voile en dhow et les sorties sur les bancs de sable.',
      wildlifeOrSeasonalPeak: 'July to September is best for Safari Blue sandbank excursions; spice harvests happen year-round across organic plantations.',
      wildlifeOrSeasonalPeakSw: 'Julai hadi Septemba ni msimu bora kwa safari za dau na fukwe za mchanga; mavuno ya viungo hufanyika mwaka mzima.',
      wildlifeOrSeasonalPeakFr: 'Juillet à septembre est la période rêvée pour l’excursion Safari Blue ; les récoltes d’épices se succèdent toute l’année.',
      monthsList: ['Jan', 'Feb', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'],
    },
    localEtiquette: {
      greeting: 'Greet warmly with "Habari" or "Asalaam Alaykum". A polite "Shikamoo" is appreciated for elders.',
      greetingSw: 'Salimia watu kwa "Habari" au "Asalaam Alaykum". Salamu ya "Shikamoo" inathaminiwa sana kwa wazee.',
      greetingFr: 'Saluez avec bienveillance par "Habari" ou "Asalaam Alaykum". Les aînés sont salués avec déférence par "Shikamoo".',
      dos: [
        'Dress modestly when walking the narrow alleys of Stone Town (cover shoulders and knees)',
        'Sample Zanzibari street pizza and freshly pressed sugarcane juice at Forodhani Gardens night market',
        'Ask permission before taking photos of carved Swahili wooden doors or residents',
        'Support local women sea-moss (seaweed) farming cooperatives in Paje',
      ],
      dosSw: [
        'Vaa nguo za heshima unapotembea vichochoroni mwa Mji Mkongwe (funika mabega na magoti)',
        'Onja pizza ya Kizanzibari na juisi ya miwa kwenye soko la usiku la Forodhani Gardens',
        'Omba ruhusa kabla ya kupiga picha milango ya kizamani au wenyeji',
        'Saidia vikundi vya wanawake wanaolima mwani ufukweni Paje',
      ],
      dosFr: [
        'Adoptez une tenue respectueuse dans les ruelles de Stone Town (épaules et genoux couverts)',
        'Goûtez à la fameuse Zanzibar pizza et au jus de canne frais au marché nocturne de Forodhani',
        'Demandez poliment l’autorisation avant de photographier les portes sculptées ou les habitants',
        'Soutenez les coopératives féminines de culture d’algues à Paje',
      ],
      donts: [
        'Do not wear bikinis or swimsuits away from private resort beaches and hotel pools',
        'Avoid public displays of affection in residential Stone Town quarters',
        'Do not drink alcohol in public street areas outside licensed hotel and rooftop venues',
      ],
      dontsSw: [
        'Usivae nguo za kuogelea nje ya maeneo ya hoteli au ufukwe wa watalii',
        'Epuka vitendo vya kimapenzi hadharani ndani ya makazi ya watu Stone Town',
        'Usinywe pombe hadharani mtaani nje ya baa au hoteli zilizoruhusiwa',
      ],
      dontsFr: [
        'Ne portez pas de maillot de bain dans les ruelles commerçantes et villages',
        'Évitez les démonstrations d’affection ostensibles en public',
        'Ne consommez pas d’alcool dans la rue en dehors des bars et toits-terrasses d’hôtels',
      ],
      cultureTip: 'Zanzibar is steeped in centuries of Omani, Persian, Indian, and African Swahili maritime history. Gentleness and courtesy open every door.',
      cultureTipSw: 'Zanzibar ina historia tajiri ya Kiarabu, Kiafrika, na Kihindi. Uungwana na upole utakufungulia milango yote ya kisiwa hiki.',
      cultureTipFr: 'L’île est le carrefour séculaire des cultures omanaise, indienne et bantoue. La politesse et la sérénité sont les maîtres-mots.',
    },
    currencyAndTipping: {
      currencyCode: 'TZS',
      currencyName: 'Tanzanian Shilling (TZS)',
      paymentAdvice: 'Cash is king in Stone Town markets. Carry TZS for street food and souvenirs. USD is accepted for hotels and tours (bills must be dated 2009 or newer).',
      paymentAdviceSw: 'Pesa taslimu ndiyo inayotumika zaidi masokoni. Tumia shilingi za Kitanzania (TZS) au dola za Marekani (zilizo chapishwa kuanzia 2009).',
      paymentAdviceFr: 'Le cash en shillings tanzaniens (TZS) est essentiel pour les souks. Les dollars américains récents (après 2009) sont acceptés en hôtels.',
      tippingNorms: 'Spice tour guides: TZS 10,000–20,000 ($5–$10). Dhow crews: TZS 20,000–30,000 per boat. Restaurant staff: 10%.',
      tippingNormsSw: 'Waelekezi wa ziara ya viungo: TZS 10,000–20,000. Wafanyakazi wa mashua: TZS 20,000–30,000 kwa boti. Mikahawa: 10%.',
      tippingNormsFr: 'Guide de la route des épices : 10 000 à 20 000 TZS. Équipage de dhow : 20 000 à 30 000 TZS. Restaurants : 10%.',
      acceptedMethods: ['Cash TZS / USD', 'Visa/Mastercard at major resorts (often 3-5% surcharge)', 'Mobile Money'],
    },
    packingAndDress: {
      dressCode: 'Lightweight breathable cotton, linen shirts, sarongs (kangas), and sun hats. Cover shoulders and knees in public areas.',
      dressCodeSw: 'Nguo nyepesi za pamba, mashati ya kitani, na kanga. Funika magoti na mabega maeneo ya umma.',
      dressCodeFr: 'Tissus légers en coton, chemises en lin, sarongs et chapeaux de paille. Tenue couvrante recommandée pour la ville.',
      mustPackItems: [
        'Water shoes with rubber soles for rocky tidal pools and coral sea-urchins',
        'Waterproof phone pouch and dry-bag for sandbank dhow sailing',
        'Reef-safe biodegradable high SPF sunscreen',
        'Mosquito repellent spray with DEET for dusk and evenings',
        'Modest scarf/shawl for visiting historic Mosques and Old Town',
      ],
      mustPackItemsSw: [
        'Viatu vya majini vyenye soli nene ya mpira kuzuia miiba na mawe',
        'Mfuko maalum wa simu unaozuia maji (waterproof pouch) kwa boti',
        'Mafuta salama ya jua ya SPF ya juu',
        'Dawa ya kuzuia mbu kwa ajili ya usiku',
        'Kitambaa au skafu ya kujitanda unapotembelea maeneo ya kihistoria',
      ],
      mustPackItemsFr: [
        'Chaussons aquatiques à semelle épaisse pour les rochers et marées basses',
        'Pochette étanche pour smartphone et sac marin pour les dhows',
        'Crème solaire biodégradable protectrice des coraux',
        'Répulsif moustiques tropical puissant pour le crépuscule',
        'Foulard ou châle léger pour couvrir les épaules lors des visites patrimoniales',
      ],
      climateNote: 'Evenings are warm and humid with balmy coastal sea breezes.',
      climateNoteSw: 'Jioni huwa na joto la wastani na unyevunyevu na upepo mzuri wa bahari.',
      climateNoteFr: 'Les nuits restent douces et tempérées avec une brise marine permanente.',
    },
    healthAndSafety: {
      healthAdvice: 'Zanzibar is a malaria zone; prophylaxis and repellent are strongly recommended. Drink exclusively bottled or purified water.',
      healthAdviceSw: 'Zanzibar ina mbu wa malaria; tumia dawa za kuzuia na jipake mafuta ya kufukuza mbu. Kunywa maji ya chupa pekee.',
      healthAdviceFr: 'Zone impaludée ; traitement préventif et lotions répulsives recommandés. Buvez exclusivement de l’eau minérale capsulée.',
      safetyAdvice: 'Stone Town is generally peaceful. Keep bags closed in narrow alleys; avoid unlit isolated beach stretches late at night.',
      safetyAdviceSw: 'Mji Mkongwe una amani tele. Funga mikoba yako vizuri vichochoroni; epuka maeneo ya ufukwe yasiyo na taa usiku sana.',
      safetyAdviceFr: 'Stone Town est une cité paisible. Évitez de vous promener seul sur les plages isolées et non éclairées tard dans la nuit.',
      tapWaterSafe: false,
      emergencyNumber: 'Zanzibar Police Emergency: 112 / 999 | SafariQuest 24/7 Helpline: 0752632206',
    },
  },

  dubai: {
    cityId: 'dubai',
    cityName: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    tagline: 'Futuristic Metropolises, Red Sand Safaris & Luxury Havens',
    taglineSw: 'Miji ya Kisasa, Safari za Jangwani na Anasa Isiyo na Kifani',
    taglineFr: 'Métropoles Futuristes, Safaris Dunes Rouges & Luxe Absolu',
    heroHeadline: 'Smart Traveler Insights for the City of Gold',
    heroHeadlineSw: 'Mwongozo Mahiri kwa Wasafiri Wanaoelekea Dubai',
    heroHeadlineFr: 'Conseils Pratiques pour un Séjour Inoubliable à Dubaï',
    bestTimeToVisit: {
      idealMonths: 'November to April (Pleasant sunny days & cool evenings)',
      idealMonthsSw: 'Novemba hadi Aprili (Siku za jua zuri na jioni zenye upepo mwanana)',
      idealMonthsFr: 'De novembre à avril (Climat hivernal doux et ensoleillé)',
      weatherSummary: 'Subtropical desert climate: Winter daytime temps hover around 24°C–28°C with clear blue skies and pleasant nights. Summer (June–Aug) surpasses 40°C.',
      weatherSummarySw: 'Hali ya hewa ya jangwani: Majira ya baridi halijoto ni 24°C–28°C kukiwa na jua zuri. Majira ya joto kali (Juni–Agosti) hufika zaidi ya 40°C.',
      weatherSummaryFr: 'Climat désertique : en hiver les températures oscillent entre 24°C et 28°C avec un ciel d’azur parfait. L’été dépasse les 40°C.',
      wildlifeOrSeasonalPeak: 'December through March features the Dubai Shopping Festival, outdoor beach clubs, and desert starry glamping.',
      wildlifeOrSeasonalPeakSw: 'Desemba hadi Machi kuna tamasha kubwa la ununuzi (Dubai Shopping Festival) na kambi za kifahari jangwani.',
      wildlifeOrSeasonalPeakFr: 'Décembre à mars accueille le Dubai Shopping Festival, les clubs de plage et les bivouacs étoilés dans les dunes.',
      monthsList: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    },
    localEtiquette: {
      greeting: 'Greet politely with "Hello" or "Marhaba". A traditional Arabic greeting is "As-salamu alaykum". Refrain from shaking hands with the opposite sex unless offered.',
      greetingSw: 'Salimia kwa "Hello" au "Marhaba". Salamu ya Kiarabu ni "As-salamu alaykum". Epuka kutoa mkono kwa jinsia tofauti isipokuwa wakikupa kwanza.',
      greetingFr: 'Saluez poliment par "Hello" ou "Marhaba". La formule arabe courante est "As-salamu alaykum". Attendez qu’on vous tende la main.',
      dos: [
        'Dress respectfully with covered shoulders and knees in shopping malls and government buildings',
        'Carry a government ID or passport copy with you at all times',
        'Bargain politely in the Deira Gold and Spice souks (aim for 20-30% discount)',
        'Use the immaculate Dubai Metro; it connects airports, malls, and Old Dubai flawlessly',
      ],
      dosSw: [
        'Vaa nguo za heshima (funika mabega na magoti) kwenye maduka makubwa na ofisi za serikali',
        'Tembea na kitambulisho au nakala ya pasipoti wakati wote',
        'Patana bei kwa heshima kwenye masoko ya dhahabu na viungo ya Deira',
        'Tumia treni ya kisasa ya Dubai Metro inayounganisha uwanja wa ndege na mji wote',
      ],
      dosFr: [
        'Portez une tenue décente (épaules et genoux couverts) dans les centres commerciaux et musées',
        'Ayez toujours sur vous une copie de votre passeport ou visa',
        'Négociez courtoisement dans les souks de l’or et des épices de Deira (20 à 30%)',
        'Profitez du métro ultramoderne et climatisé reliant l’aéroport aux grands quartiers',
      ],
      donts: [
        'Zero tolerance for public intoxication; alcohol is strictly confined to licensed hotel lounges and venues',
        'Do not engage in excessive public displays of affection (holding hands for married couples is acceptable)',
        'Never photograph military sites, government buildings, or local Emirati women without consent',
      ],
      dontsSw: [
        'Hakuna uvumilivu kwa ulevi hadharani barabarani; pombe inaruhusiwa hotelini pekee',
        'Epuka vitendo vya kimapenzi kupita kiasi hadharani',
        'Usipige picha maeneo ya kijeshi, ofisi za serikali au wanawake wa Kiarabu bila idhini',
      ],
      dontsFr: [
        'Tolérance zéro pour l’ébriété publique ; l’alcool est réservé aux hôtels et bars avec licence',
        'Évitez les manifestations d’affection intimes en public',
        'Ne photographiez jamais les bâtiments officiels ou les femmes émiraties sans permission',
      ],
      cultureTip: 'Dubai is a cosmopolitan global crossroads with over 200 nationalities living in harmony under strict laws. Mutual respect is deeply rewarded.',
      cultureTipSw: 'Dubai ni kitovu cha kimataifa chenye utulivu mkubwa na sheria dhabiti. Heshima na kufuata kanuni huleta uzoefu wa kifahari usio na usumbufu.',
      cultureTipFr: 'Dubaï est un carrefour cosmopolite fascinant régi par des lois précises garantissant une sécurité et une propreté exceptionnelles.',
    },
    currencyAndTipping: {
      currencyCode: 'AED',
      currencyName: 'UAE Dirham (AED)',
      paymentAdvice: 'Dubai is virtually cashless. Contactless cards, Apple Pay, Google Pay, and Samsung Pay are accepted across taxis, street cafes, and luxury boutiques.',
      paymentAdviceSw: 'Dubai inatumia malipo ya kielektroniki karibu kila mahali. Kadi za benki na simu zinakubalika kuanzia kwenye teksi hadi maduka ya kifahari.',
      paymentAdviceFr: 'Dubaï est ultra-connectée et presque sans espèces. Cartes sans contact, Apple Pay et Google Pay sont acceptés partout.',
      tippingNorms: 'Restaurants: 10%–15% is customary for attentive service. Taxi drivers: round up to nearest 5 or 10 AED. Hotel bellhops: 10–20 AED.',
      tippingNormsSw: 'Mikahawa: 10%–15% ya bili. Teksi: unaweza kuongeza 5 au 10 AED. Wahudumu wa hoteli: 10–20 AED.',
      tippingNormsFr: 'Restaurants : 10% à 15% pour un bon service. Taxis : arrondir au billet de 5 ou 10 AED supérieur. Bagagistes : 10 à 20 AED.',
      acceptedMethods: ['Credit & Debit Cards', 'Apple Pay / Google Pay', 'Cash AED'],
    },
    packingAndDress: {
      dressCode: 'Chic resort wear and stylish city attire. Bring a light pashmina or jacket for cold AC indoors. Conservative coverage required when visiting the Grand Mosque.',
      dressCodeSw: 'Nguo nadhifu za kisasa. Beba sweta jepesi kwa sababu majengo yana viyoyozi vya baridi kali. Vazi la heshima linahitajika kwenye misikiti.',
      dressCodeFr: 'Tenue de villégiature élégante. Prévoyez un gilet léger pour les intérieurs très climatisés. Tenue couvrante requise pour la Grande Mosquée.',
      mustPackItems: [
        'UV-blocking designer sunglasses and wide-brim hat',
        'High-SPF sunscreen & deep hydrating moisturizer (dry desert climate)',
        'Cardigan/pashmina wrap for chilly air-conditioned malls and restaurants',
        'Smart evening footwear for rooftop lounges and Michelin restaurants',
        'Universal power adapter (Type G standard, 230V)',
      ],
      mustPackItemsSw: [
        'Miwani ya kisasa ya jua na kofia ya kivuli',
        'Mafuta ya ngozi ya SPF ya juu kuzuia jua na ukavu wa hewa ya jangwani',
        'Skafu au sweta jepesi kwa ajili ya viyoyozi vya maduka makubwa',
        'Viatu nadhifu vya jioni kwa mikahawa ya kifahari',
        'Adapta ya umeme ya Type G yenye pini 3 za mraba',
      ],
      mustPackItemsFr: [
        'Lunettes de soleil haute protection et chapeau élégant',
        'Crème solaire indice 50 et soin hydratant (air sec du désert)',
        'Châle ou gilet pour la climatisation soutenue des centres commerciaux',
        'Chaussures habillées pour les restaurants gastronomiques et rooftops',
        'Adaptateur universel (prise anglaise Type G, 230V)',
      ],
      climateNote: 'Air conditioning is exceptionally powerful indoors; having an extra layer handy is always wise.',
      climateNoteSw: 'Viyoyozi vya ndani huwa na baridi kali; kuwa na nguo ya kuongeza kutakusaidia.',
      climateNoteFr: 'La climatisation est omniprésente et vigoureuse ; prévoyez toujours une étole ou petite veste.',
    },
    healthAndSafety: {
      healthAdvice: 'No vaccinations or malaria medications required. Tap water is desalinated (safe for brushing teeth, but high-grade bottled mineral water is preferred for drinking).',
      healthAdviceSw: 'Hakuna chanjo maalum wala malaria Dubai. Maji ya bomba ni salama kwa kusukutua mswaki, lakini maji ya chupa ndiyo yanayopendekezwa kwa kunywa.',
      healthAdviceFr: 'Aucun vaccin spécifique ni paludisme. L’eau du robinet est dessalée (potable, mais l’eau minérale en bouteille est préférée pour boire).',
      safetyAdvice: 'Rated among the world’s safest cities with near-zero violent crime. Women travelers enjoy high levels of independence and comfort at all hours.',
      safetyAdviceSw: 'Imeorodheshwa miongoni mwa miji salama zaidi duniani kukiwa hakuna uhalifu. Wasafiri wa kike wanajisikia huru na salama saa zote.',
      safetyAdviceFr: 'Classée parmi les métropoles les plus sûres de la planète. Les voyageuses solo s’y déplacent en totale sérénité de jour comme de nuit.',
      tapWaterSafe: true,
      emergencyNumber: 'Dubai Police: 999 | Ambulance: 998 | Tourist Helpline: 800 4438',
    },
  },

  miami: {
    cityId: 'miami',
    cityName: 'Miami, Florida',
    country: 'United States',
    region: 'North America',
    tagline: 'Art Deco Glamour, Turquoise Waters & Vibrant Tropical Nights',
    taglineSw: 'Majengo ya Art Deco, Bahari ya Turquoise na Maisha ya Pwani',
    taglineFr: 'Élégance Art Déco, Eaux Turquoises & Nuits Tropicales',
    heroHeadline: 'Sunshine State & Coastal Travel Insights',
    heroHeadlineSw: 'Mwongozo wa Pwani ya Florida na Jiji la Miami',
    heroHeadlineFr: 'Conseils Voyage pour Miami et les Plages de Floride',
    bestTimeToVisit: {
      idealMonths: 'November to May (Dry sunny winter & spring)',
      idealMonthsSw: 'Novemba hadi Mei (Majira ya joto na ukavu)',
      idealMonthsFr: 'De novembre à mai (Hiver doux et printemps ensoleillé)',
      weatherSummary: 'Tropical monsoon/savanna climate: 23°C–28°C during winter months with low humidity and warm coastal breezes. Summer (June–Oct) is humid with tropical showers.',
      weatherSummarySw: 'Hali ya hewa ya kitropiki: 23°C–28°C wakati wa majira ya baridi na unyevu mdogo. Majira ya joto (Juni–Oktoba) huwa na mvua za radi.',
      weatherSummaryFr: 'Climat tropical doux (23°C–28°C) en hiver avec brise atlantique idéale. L’été est plus chaud et humide.',
      wildlifeOrSeasonalPeak: 'December hosts Art Basel Miami Beach; winter is the premier season for Everglades wildlife airboat safaris when alligators congregate in deep water pools.',
      wildlifeOrSeasonalPeakSw: 'Desemba huwa na maonyesho ya sanaa ya Art Basel; majira ya baridi ndio wakati bora wa kutazama mamba kwenye mbuga ya Everglades.',
      wildlifeOrSeasonalPeakFr: 'Décembre accueille Art Basel Miami Beach ; l’hiver est idéal pour observer les alligators dans les Everglades.',
      monthsList: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    localEtiquette: {
      greeting: 'A casual "Hi" or "How\'s it going?". English and Spanish are equally prevalent throughout the city; speaking a few Spanish greetings is warmly received.',
      greetingSw: 'Salamu ya kirafiki ya "Hi" au "How are you?". Kiingereza na Kihispania vinazungumzwa kwa wingi kila sehemu.',
      greetingFr: 'Salutation décontractée en anglais ou espagnol : "Hi" ou "Hola". Miami est bilingue et vibrante.',
      dos: [
        'Order an authentic Cuban espresso ("cafecito") along Calle Ocho in Little Havana',
        'Explore the world-famous open-air graffiti museum at Wynwood Walls',
        'Book South Beach nightlife venues and celebrity cruises in advance',
        'Always check your restaurant bill: some establishments automatically include an 18% gratuity',
      ],
      dosSw: [
        'Onja kahawa halisi ya Kikuba (cafecito) mtaani Little Havana',
        'Tembelea michoro ya kisasa ya sanaa ya Wynwood Walls',
        'Agiza mapema maeneo ya starehe ya usiku na ziara za boti za kifahari',
        'Kagua risiti yako ya mgahawa; mikahawa mingi huweka asilimia 18 ya huduma moja kwa moja',
      ],
      dosFr: [
        'Dégustez un véritable café cubain serré ("cafecito") sur la Calle Ocho',
        'Arpentez les fresques de street art mondialement connues de Wynwood Walls',
        'Réservez vos tables et soirées à l’avance sur South Beach',
        'Vérifiez l’addition au restaurant : le service (gratuity de 18%) est souvent déjà inclus',
      ],
      donts: [
        'Do not bring glass bottles or alcohol directly onto public sands on South Beach (strictly prohibited)',
        'Do not approach, feed, or harass wild alligators during Everglades airboat tours',
        'Avoid hailing random street cabs; use rideshare apps (Uber/Lyft) for transparent fares and safety',
      ],
      dontsSw: [
        'Usibebe chupa za kioo au pombe kwenye mchanga wa ufukwe wa South Beach (hairuhusiwi)',
        'Usijaribu kuwalisha au kuwasogelea mamba wa porini kwenye mbuga ya Everglades',
        'Tumia huduma za Uber au Lyft badala ya teksi za mtaani zisizojulikana',
      ],
      dontsFr: [
        'Ne transportez pas de bouteilles en verre ni d’alcool sur les plages publiques de South Beach',
        'N’approchez et ne nourrissez jamais les alligators sauvages dans les Everglades',
        'Privilégiez les VTC (Uber/Lyft) pour vos déplacements nocturnes',
      ],
      cultureTip: 'Miami fuses Latin American soul, Caribbean rhythm, and American coastal glamour. Relax, dress with flare, and enjoy the tropical groove.',
      cultureTipSw: 'Miami inachanganya utamaduni wa Amerika ya Kusini na maisha ya kisasa ya Marekani. Furahia muziki na mandhari ya kuvutia.',
      cultureTipFr: 'Miami conjugue l’âme latino-américaine, les rythmes caribéens et le glamour côtier américain.',
    },
    currencyAndTipping: {
      currencyCode: 'USD',
      currencyName: 'US Dollar (USD)',
      paymentAdvice: 'Miami is practically 100% card and digital wallet based. Apple Pay, Google Pay, Visa, Mastercard, and Amex are accepted everywhere.',
      paymentAdviceSw: 'Miami inatumia kadi na pochi za kidijitali kila mahali. Apple Pay, Google Pay, na kadi za benki ndio njia kuu za malipo.',
      paymentAdviceFr: 'Paiements par cartes bancaires et sans contact (Apple Pay, Google Pay) acceptés absolument partout.',
      tippingNorms: 'Restaurants: 18%–22% is standard in the US for table service. Valet parking: $5. Bartenders: $1–$2 per drink. Bellhop: $2–$3 per bag.',
      tippingNormsSw: 'Mikahawa: 18%–22% ya bili. Maegesho ya Valet: $5. Wahudumu wa baa: $1–$2 kwa kinywaji. Mizigo hotelini: $2–$3.',
      tippingNormsFr: 'Restaurants : 18% à 22% de pourboire usuel. Voiturier : 5$. Barman : 1$ à 2$ par verre. Bagagiste : 2$ à 3$ par valise.',
      acceptedMethods: ['Credit & Debit Cards', 'Apple Pay / Google Pay', 'Cash USD'],
    },
    packingAndDress: {
      dressCode: 'Resort chic, stylish swimwear, and fashionable evening wear for clubs and lounges (collared shirts and dress shoes for gentlemen).',
      dressCodeSw: 'Nguo nadhifu za ufukweni na mavazi ya heshima ya jioni kwa klabu na mikahawa ya kifahari.',
      dressCodeFr: 'Style balnéaire chic en journée, tenue soignée le soir pour les clubs branchés de South Beach.',
      mustPackItems: [
        'Polarized sunglasses and broad-spectrum water-resistant sunscreen (SPF 50)',
        'Lightweight, breathable linen shirts and summer dresses',
        'Comfortable walking sneakers for gallery walks in Wynwood and Design District',
        'Light rain poncho or umbrella for sudden tropical afternoon showers',
        'US Type A/B 2-pin or 3-pin plug adapter (120V)',
      ],
      mustPackItemsSw: [
        'Miwani mizuri ya jua na mafuta ya ngozi ya kuzuia jua',
        'Mashati mepesi ya kitani na nguo za starehe za majira ya joto',
        'Viatu vya michezo vya kutembea mitaa ya sanaa',
        'Mwamvuli mdogo au koti jepesi la mvua ya ghafla ya kitropiki',
        'Adapta ya umeme ya Marekani (Type A/B)',
      ],
      mustPackItemsFr: [
        'Lunettes de soleil polarisées et crème solaire haute protection',
        'Chemises légères en lin et robes d’été respirantes',
        'Baskets confortables pour arpenter Wynwood et le Design District',
        'Veste de pluie légère pour les averses tropicales passagères',
        'Adaptateur pour prises américaines (Type A/B, 120V)',
      ],
      climateNote: 'Summer afternoons can bring intense, brief tropical downpours; mornings and evenings are typically clear and sunny.',
      climateNoteSw: 'Mchana wa majira ya joto unaweza kuleta mvua fupi za radi; asubuhi na jioni huwa na anga safi.',
      climateNoteFr: 'Les averses estivales sont souvent intenses mais brèves ; les matinées restent très ensoleillées.',
    },
    healthAndSafety: {
      healthAdvice: 'No tropical disease or malaria risks. Tap water is completely safe, treated, and drinkable from all municipal taps.',
      healthAdviceSw: 'Hakuna hatari ya magonjwa ya kitropiki wala malaria. Maji ya bomba ni salama na safi kabisa kunywa.',
      healthAdviceFr: 'Aucun risque sanitaire particulier. L’eau du robinet est parfaitement potable et contrôlée.',
      safetyAdvice: 'South Beach, Brickell, and Coconut Grove are safe and vibrant. Exercise common street sense late at night in unfamiliar neighborhoods.',
      safetyAdviceSw: 'Maeneo ya South Beach, Brickell na Coconut Grove ni salama sana. Zingatia usalama wa kawaida usiku mwingi.',
      safetyAdviceFr: 'Les quartiers touristiques (South Beach, Brickell) sont sûrs. Utilisez les applications de VTC la nuit.',
      tapWaterSafe: true,
      emergencyNumber: 'US National Emergency (Police, Fire, Ambulance): 911',
    },
  },

  tokyo: {
    cityId: 'tokyo',
    cityName: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    tagline: 'Neon Skylines, Ancient Shinto Shrines & Mount Fuji Vistas',
    taglineSw: 'Majumba ya Kisasa, Mahekalu ya Kale na Mandhari ya Mlima Fuji',
    taglineFr: 'Gratte-Ciels Néon, Sanctuaires Shinto & Vues sur le Mont Fuji',
    heroHeadline: 'Etiquette & Travel Guide for Tokyo & Mount Fuji',
    heroHeadlineSw: 'Mwongozo wa Adabu na Safari kwa Jiji la Tokyo na Mlima Fuji',
    heroHeadlineFr: 'Règles de Politesse & Conseils pour Tokyo et le Mont Fuji',
    bestTimeToVisit: {
      idealMonths: 'March to May & September to November',
      idealMonthsSw: 'Machi hadi Mei & Septemba hadi Novemba',
      idealMonthsFr: 'De mars à mai & de septembre à novembre',
      weatherSummary: 'Temperate four-season climate: Spring brings mild sunny days (15°C–21°C) and cherry blossoms (Sakura); Autumn is crisp, clear, and ablaze with red maple foliage.',
      weatherSummarySw: 'Hali ya hewa ya misimu minne: Masika huleta maua maridadi ya Sakura (15°C–21°C); Kipupwe huleta anga safi na majani ya dhahabu.',
      weatherSummaryFr: 'Climat tempéré quatre saisons : printemps doux (15°C–21°C) avec floraison des cerisiers (Sakura) ; automne limpide et feuillages pourpres flamboyants.',
      wildlifeOrSeasonalPeak: 'Late March to early April is the world-famous Cherry Blossom peak; November offers unobstructed crystal views of snowcapped Mount Fuji.',
      wildlifeOrSeasonalPeakSw: 'Mwishoni mwa Machi hadi Aprili mapema ni msimu wa maua ya Sakura; Novemba anga huwa safi sana kuona Mlima Fuji wenye theluji.',
      wildlifeOrSeasonalPeakFr: 'Fin mars à début avril correspond à la floraison des cerisiers ; novembre offre les vues les plus dégagées sur le Mont Fuji enneigé.',
      monthsList: ['Mar', 'Apr', 'May', 'Sep', 'Oct', 'Nov'],
    },
    localEtiquette: {
      greeting: 'Bow politely when greeting or thanking someone (slight bow from the waist). Say "Konnichiwa" (Hello) or "Arigatou gozaimasu" (Thank you very much).',
      greetingSw: 'Inama kidogo kiunoni kuonyesha heshima unaposalimia au kushukuru. Sema "Konnichiwa" (Habari) au "Arigatou gozaimasu" (Asante sana).',
      greetingFr: 'Inclinez-vous légèrement pour saluer ou remercier. Dites "Konnichiwa" (Bonjour) ou "Arigatou gozaimasu" (Merci beaucoup).',
      dos: [
        'Remove your shoes when entering homes, ryokan inns, temples, and tatami-mat restaurants',
        'Stand on the left side of escalators in Tokyo (walk on the right side)',
        'Keep voice quiet on subway trains and set phone to silent mode ("manner mode")',
        'Carry a small pocket bag for your rubbish (public trash cans are rare in Japan)',
      ],
      dosSw: [
        'Vua viatu kabla ya kuingia nyumbani, kwenye mahekalu au mikahawa ya kitamaduni ya tatami',
        'Simama upande wa kushoto wa ngazi zinazojiendesha (escalator) jijini Tokyo',
        'Zungumza kwa sauti ya chini ndani ya treni na uweke simu kwenye mtetemo (silent mode)',
        'Beba mfuko mdogo wa kuweka takataka zako (mapipa ya umma ni machache sana)',
      ],
      dosFr: [
        'Retirez vos chaussures avant d’entrer dans un ryokan, temple ou restaurant traditionnel sur tatami',
        'Tenez-vous à gauche sur les escaliers mécaniques à Tokyo (laissez la droite pour passer)',
        'Gardez le silence dans les rames de métro et basculez votre téléphone en mode silencieux',
        'Gardez un petit sac pour vos déchets (les poubelles publiques sont très rares au Japon)',
      ],
      donts: [
        'DO NOT TIP: Tipping is not customary in Japan and can cause confusion or awkwardness',
        'Never walk down the street while eating or drinking (consume food beside the shop/vending machine)',
        'Never stick chopsticks upright into a bowl of rice (associated with funeral rites)',
        'Do not talk on the mobile phone inside trains or buses',
      ],
      dontsSw: [
        'USITOE TIP (ZAWADI YA PESA): Hii si desturi nchini Japani na inaweza kuleta mkanganyiko',
        'Usitembee barabarani huku unakula au kunywa (kula karibu na duka au mashine ya vinywaji)',
        'Usisimamishe vijiti vya kulia (chopsticks) wima kwenye bakuli la wali',
        'Usipokee simu na kuongea kwa sauti ndani ya treni au mabasi',
      ],
      dontsFr: [
        'NE LAISSEZ PAS DE POURBOIRE : le pourboire n’existe pas au Japon et peut froisser votre hôte',
        'Ne mangez pas et ne buvez pas en marchant dans la rue (dégustez sur place devant le comptoir)',
        'Ne plantez jamais vos baguettes verticalement dans un bol de riz',
        'Ne téléphonez pas dans les wagons de métro ou autobus',
      ],
      cultureTip: 'Omotenashi (selfless hospitality) is the golden rule of Japanese service. Politeness, queuing in line, and respecting harmony (wa) makes you an honored guest.',
      cultureTipSw: 'Omotenashi (ukarimu usio na unafiki) ndio msingi wa huduma nchini Japani. Uungwana na kufuata foleni hukufanya uwe mgeni wa heshima daima.',
      cultureTipFr: 'L’Omotenashi (l’art de l’hospitalité bienveillante) est universel. Respecter le calme et l’harmonie collective vous vaudra un accueil d’exception.',
    },
    currencyAndTipping: {
      currencyCode: 'JPY',
      currencyName: 'Japanese Yen (¥ / JPY)',
      paymentAdvice: 'Carry cash: many small ramen eateries, shrines, ticket machines, and traditional shops accept cash only. Get a digital or physical Suica/Pasmo IC card for easy transport and convenience stores.',
      paymentAdviceSw: 'Beba pesa taslimu (Yen): maduka madogo na mahekalu mengi hupokea pesa taslimu tu. Pata kadi ya Suica/Pasmo kwa usafiri na ununuzi wa haraka.',
      paymentAdviceFr: 'Ayez toujours des espèces (Yen) sur vous pour les petits restaurants et sanctuaires. Utilisez une carte IC (Suica/Pasmo) pour les transports.',
      tippingNorms: 'Zero tipping policy. Excellent service is considered a matter of pride and included in the price. Leaving extra change will result in staff chasing you down to return it!',
      tippingNormsSw: 'Hakuna kutoa tip kabisa. Huduma bora ni wajibu wao na sehemu ya bei. Ukiacha chenji watakukimbiza wakurudishie!',
      tippingNormsFr: 'Aucun pourboire requis. Un service irréprochable est une question d’honneur. Laisser de la monnaie vous fera rattraper par le serveur !',
      acceptedMethods: ['Cash JPY (essential)', 'IC Cards (Suica / Pasmo)', 'Major Credit Cards (Hotels & Department Stores)'],
    },
    packingAndDress: {
      dressCode: 'Neat, conservative casual with comfortable slip-on footwear. You will take off your shoes multiple times a day.',
      dressCodeSw: 'Mavazi nadhifu na viatu vya kuvua na kuvaa kirahisi kwa sababu utavua viatu mara nyingi kwa siku.',
      dressCodeFr: 'Tenue soignée et chaussures faciles à enfiler/retirer. Vous vous déchausserez plusieurs fois par jour.',
      mustPackItems: [
        'Ultra-comfortable walking shoes (you will easily walk 15,000–20,000 steps daily)',
        'Clean, un-torn socks (visible when removing shoes at temples & dining rooms)',
        'Coin purse (Japanese currency heavily uses 1, 5, 10, 50, 100, and 500 Yen coins)',
        'Pocket WiFi unit or international eSIM for seamless navigation on Google Maps',
        'Small hand towel/handkerchief (many public restrooms do not provide paper towels)',
      ],
      mustPackItemsSw: [
        'Viatu vizuri vya kutembea umbali mrefu (utatembea hatua 15,000+ kila siku)',
        'Soksi safi zisizo na matundu kwa sababu unavua viatu mara kwa mara',
        'Pochi ndogo ya sarafu (Japan inatumia sarafu za Yen nyingi sana)',
        'Kifaa cha Pocket WiFi au eSIM kwa ajili ya ramani na mtandao',
        'Kitambaa kidogo cha kufutia mikono (vyoo vingi havina karatasi za kupangusa mikono)',
      ],
      mustPackItemsFr: [
        'Chaussures de marche ultra confortables (15 000 à 20 000 pas par jour)',
        'Chaussettes impeccables et sans accroc pour les visites de temples',
        'Porte-monnaie pour les nombreuses pièces de Yen (1, 5, 10, 50, 100, 500)',
        'Boîtier Pocket WiFi ou eSIM pour s’orienter aisément dans le métro',
        'Petite serviette de poche pour s’essuyer les mains (sèche-mains rares)',
      ],
      climateNote: 'Air is crisp in autumn and spring; layered clothing allows you to adapt from heated trains to cool outdoor streets.',
      climateNoteSw: 'Hewa ni safi na yenye ubaridi kiasi wakati wa masika; vaa nguo za tabaka ili kubadilika kirahisi.',
      climateNoteFr: 'L’air est frais et vivifiant au printemps et à l’automne ; prévoyez des couches superposables adaptées.',
    },
    healthAndSafety: {
      healthAdvice: 'No vaccination mandates. Tap water across Tokyo is among the purest in the world and 100% safe to drink directly from the tap.',
      healthAdviceSw: 'Hakuna chanjo maalum. Maji ya bomba jijini Tokyo ni safi na salama kabisa kunywa moja kwa moja bila hofu.',
      healthAdviceFr: 'Aucun risque sanitaire. L’eau du robinet à Tokyo est parmi les plus pures au monde et se boit sans hésiter.',
      safetyAdvice: 'Tokyo ranks among the safest capitals in the world. Lost items (including wallets and phones) are routinely returned to local police boxes (Koban).',
      safetyAdviceSw: 'Tokyo ni moja ya miji salama zaidi duniani. Vitu vilivyopotea vinarudishwa kwenye vituo vidogo vya polisi (Koban).',
      safetyAdviceFr: 'Tokyo est l’une des métropoles les plus sûres au monde. Les objets égarés sont presque toujours rapportés aux postes de police locaux (Koban).',
      tapWaterSafe: true,
      emergencyNumber: 'Police: 110 | Fire/Ambulance: 119 | Japan Helpline: 0570-000-911',
    },
  },
};
