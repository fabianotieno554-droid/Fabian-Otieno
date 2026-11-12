export type Language = 'en' | 'sw' | 'fr';

export interface Translations {
  nav: {
    destinations: string;
    packages: string;
    tillPayment: string;
    facebook: string;
    faqs: string;
    bookTour: string;
    videos: string;
    scanQr: string;
    currency: string;
    language: string;
    darkMode: string;
    lightMode: string;
    theme: string;
  };
  hero: {
    kicker: string;
    officialTill: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
    tillLabel: string;
    copied: string;
    copyTill: string;
    selectCity: string;
    allDestinations: string;
    travelSeason: string;
    upcomingSeason: string;
    currentSeason: string;
    peakSeason: string;
    festiveSeason: string;
    partySize: string;
    soloExplorer: string;
    twoTravelers: string;
    groupTravelers: string;
    largeGroup: string;
    findAdventures: string;
    katoBadge: string;
    mpesaBadge: string;
    guaranteedBadge: string;
  };
  destinations: {
    kicker: string;
    curatedPhotos: string;
    title: string;
    subtitle: string;
    allCities: string;
    from: string;
    viewItinerary: string;
    bookTrip: string;
    durationDays: string;
  };
  packages: {
    kicker: string;
    inclusive: string;
    title: string;
    subtitle: string;
    all: string;
    cityHighlights: string;
    beachIsland: string;
    bigFiveSafari: string;
    internationalCity: string;
    perPerson: string;
    deposit30: string;
    reservePackage: string;
    inclusionsTitle: string;
    daysTour: string;
    reviews: string;
  };
  videos: {
    kicker: string;
    title: string;
    subtitle: string;
    categoryAll: string;
    categoryGameParks: string;
    categoryHotels: string;
    categoryCities: string;
    watchReel: string;
    playVideo: string;
    duration: string;
    quickBook: string;
    inquireWhatsApp: string;
    exploreLocation: string;
    views: string;
    modalTitle: string;
    modalSubtitle: string;
    highlightsTitle: string;
    relatedTour: string;
    closePlayer: string;
    previousVideo: string;
    nextVideo: string;
    previewBadge: string;
  };
  weather: {
    title: string;
    subtitle: string;
    liveOutlook: string;
    forecast3Day: string;
    today: string;
    tomorrow: string;
    dayAfter: string;
    precipitation: string;
    wind: string;
    packingTipTitle: string;
    loading: string;
    errorFailed: string;
    retry: string;
    bestSeason: string;
  };
  qrCode: {
    kicker: string;
    title: string;
    subtitle: string;
    scanPrompt: string;
    tabMpesa: string;
    tabWhatsapp: string;
    tabFacebook: string;
    tabWebsite: string;
    mpesaTitle: string;
    mpesaDesc: string;
    whatsappTitle: string;
    whatsappDesc: string;
    facebookTitle: string;
    facebookDesc: string;
    websiteTitle: string;
    websiteDesc: string;
    downloadQr: string;
    copyDetails: string;
    copied: string;
    openLink: string;
    scanInstructions: string;
  };
  tillSection: {
    kicker: string;
    verifiedBadge: string;
    title: string;
    subtitle: string;
    buyGoodsLabel: string;
    merchantTill: string;
    zeroFees: string;
    copyTill: string;
    copied: string;
    merchantNameTitle: string;
    merchantNameDesc: string;
    howToPayTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    inquiries: string;
    calculatorTitle: string;
    calculatorSubtitle: string;
    liveBadge: string;
    selectPkg: string;
    guestCount: string;
    paymentOption: string;
    depositOptionTitle: string;
    depositOptionDesc: string;
    fullOptionTitle: string;
    fullOptionDesc: string;
    travelerName: string;
    amountToSend: string;
    equivalent: string;
    requestStk: string;
    sendingStk: string;
    stkDispatched: string;
    alreadyPaid: string;
    verifyButton: string;
    verifyHelp: string;
  };
  facebook: {
    kicker: string;
    title: string;
    subtitle: string;
    verifiedPage: string;
    followers: string;
    responseRate: string;
    followPage: string;
    following: string;
    openFacebook: string;
    sendMessage: string;
    share: string;
    officialNotice: string;
    noticeDesc: string;
    latestPosts: string;
    viewAll: string;
    likes: string;
    comments: string;
    shares: string;
    liked: string;
    like: string;
    comment: string;
    bookTrip: string;
  };
  reviewsFaq: {
    kicker: string;
    title: string;
    subtitle: string;
    katoTitle: string;
    katoDesc: string;
    tillTitle: string;
    tillDesc: string;
    jeepTitle: string;
    jeepDesc: string;
    lovedBy: string;
    feedbackSubtitle: string;
    faqKicker: string;
    faqTitle: string;
  };
  footer: {
    bio: string;
    katoLicence: string;
    explore: string;
    directContact: string;
    officialPayment: string;
    merchant: string;
    zeroCharges: string;
    allRights: string;
    terms: string;
    privacy: string;
  };
  modals: {
    bookTitle: string;
    bookSubtitle: string;
    selectTour: string;
    fullName: string;
    phone: string;
    email: string;
    date: string;
    guests: string;
    paymentType: string;
    mpesaCode: string;
    confirmBooking: string;
    close: string;
    totalPrice: string;
    depositPayable: string;
    startingFrom: string;
    bookCityTour: string;
    overview: string;
    highlights: string;
    sampleItinerary: string;
    voucherTitle: string;
    voucherStatusPaid: string;
    voucherStatusPending: string;
    leadTraveler: string;
    travelDate: string;
    amountPaid: string;
    remainingBalance: string;
    printPdf: string;
    whatsAppSupport: string;
    chatWhatsapp: string;
    galleryTab: string;
    galleryKicker: string;
    galleryTitle: string;
    gallerySubtitle: string;
    filterAll: string;
    filterWildlife: string;
    filterSights: string;
    filterCulture: string;
    filterTravelers: string;
    sharePhotosTitle: string;
    sharePhotosDesc: string;
    shareOnWhatsApp: string;
    capturedBy: string;
    photosCount: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      destinations: 'Destinations',
      packages: 'Tour Packages',
      tillPayment: 'Till & Payment',
      facebook: 'Facebook',
      faqs: 'FAQs',
      bookTour: 'Book Tour',
      videos: 'Tour Videos',
      scanQr: 'Scan QR Code',
      currency: 'Currency',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      theme: 'Theme',
    },
    hero: {
      kicker: 'East Africa & Global Escapes',
      officialTill: 'Official Till',
      title: 'Handcrafted City Tours, Wild Safaris & Coastal Escapes',
      subtitle:
        'Experience Nairobi’s urban wildlife, Diani’s crystal beaches, Table Mountain sunrises, and Zanzibar’s spice islands. Secure your reservation instantly via Safaricom M-Pesa.',
      exploreBtn: 'Explore City Destinations',
      tillLabel: 'M-Pesa Till',
      copied: 'Copied!',
      copyTill: 'Copy Till',
      selectCity: 'Select City',
      allDestinations: 'All Destinations (7 Cities)',
      travelSeason: 'Travel Season',
      upcomingSeason: 'Upcoming Weekend / Flexible',
      currentSeason: 'This Month (Current Season)',
      peakSeason: 'Next Quarter (Safari Peak Season)',
      festiveSeason: 'Holiday & Festive Season',
      partySize: 'Party Size',
      soloExplorer: '1 Solo Explorer',
      twoTravelers: '2 Travelers (Couples / Friends)',
      groupTravelers: '3 to 5 Travelers (Family / Small Group)',
      largeGroup: '6+ Travelers (Custom Safari Van)',
      findAdventures: 'Find Adventures',
      katoBadge: 'KATO Certified Member Operator #482',
      mpesaBadge: 'Lipa Na M-Pesa Authorized Merchant',
      guaranteedBadge: '100% Guaranteed Departures',
    },
    destinations: {
      kicker: 'Signature City Destinations',
      curatedPhotos: 'Curated Photography',
      title: 'Explore Iconic African & Global Cities',
      subtitle:
        'From Nairobi’s urban national park to Diani and Malindi reefs, Cape Town cliffs, Zanzibar spice alleys, Miami South Beach, and Tokyo’s neon skyline.',
      allCities: 'All Cities',
      from: 'From',
      viewItinerary: 'View Itinerary',
      bookTrip: 'Book Trip',
      durationDays: 'Days',
    },
    packages: {
      kicker: 'Handcrafted Itineraries',
      inclusive: 'All-Inclusive Guidance',
      title: 'Popular Tour Packages & Guided Escapes',
      subtitle:
        'Transparent pricing with park tickets, certified safari guides, and luxury transport. Pay 30% deposit via Till 6608497 to lock in your dates.',
      all: 'All',
      cityHighlights: 'City Highlights',
      beachIsland: 'Beach & Island',
      bigFiveSafari: 'Big Five Safari',
      internationalCity: 'International City',
      perPerson: 'Per Person',
      deposit30: '30% Deposit',
      reservePackage: 'Reserve Package With M-Pesa',
      inclusionsTitle: 'Package Inclusions:',
      daysTour: 'Days Tour',
      reviews: 'reviews',
    },
    videos: {
      kicker: 'Visual Journeys & Short Reels',
      title: 'Explore Kenya & World Destinations in Motion',
      subtitle:
        'Watch cinematic short video clips of iconic game parks, award-winning safari lodges & beachfront hotels, and vibrant world cities.',
      categoryAll: 'All Video Reels',
      categoryGameParks: 'Game Parks & Safaris',
      categoryHotels: 'Hotels & Safari Lodges',
      categoryCities: 'Vibrant City Sights',
      watchReel: 'Watch Reel',
      playVideo: 'Play Video',
      duration: 'Duration',
      quickBook: 'Book This Adventure',
      inquireWhatsApp: 'Inquire on WhatsApp',
      exploreLocation: 'Explore Location',
      views: 'views',
      modalTitle: 'Destination Video Showcase',
      modalSubtitle: 'Official SafariQuest Handcrafted Tours',
      highlightsTitle: 'Key Experience Highlights:',
      relatedTour: 'Featured Tour Package:',
      closePlayer: 'Close Player',
      previousVideo: 'Previous Reel',
      nextVideo: 'Next Reel',
      previewBadge: 'Video Preview',
    },
    weather: {
      title: 'Current & 3-Day Destination Weather',
      subtitle: 'Real-time meteorological conditions to plan your safari gear and daily activities',
      liveOutlook: 'Live Weather',
      forecast3Day: '3-Day Forecast',
      today: 'Today',
      tomorrow: 'Tomorrow',
      dayAfter: 'Day 3',
      precipitation: 'Rain chance',
      wind: 'Wind',
      packingTipTitle: 'Safari & Packing Advice',
      loading: 'Fetching live meteorological data...',
      errorFailed: 'Live forecast temporarily unavailable. Showing local climate outlook.',
      retry: 'Retry',
      bestSeason: 'Optimal Season',
    },
    qrCode: {
      kicker: 'Quick Mobile Access',
      title: 'Scan QR Codes for Instant Payment & Support',
      subtitle:
        'Point your smartphone camera to pay via M-Pesa Till 6608497, connect directly on WhatsApp, or follow our official Facebook page.',
      scanPrompt: 'Point your camera or M-Pesa App to scan',
      tabMpesa: 'M-Pesa Till 6608497',
      tabWhatsapp: 'WhatsApp Concierge',
      tabFacebook: 'Facebook Community',
      tabWebsite: 'Mobile Web App',
      mpesaTitle: 'Scan to Pay via Safaricom M-Pesa',
      mpesaDesc: 'Instant Safaricom Buy Goods Merchant: SafariQuest Tours & Travel Ltd · Till: 6608497',
      whatsappTitle: 'Scan to Chat on WhatsApp',
      whatsappDesc: 'Direct 24/7 safari concierge & booking inquiries at 0752632206',
      facebookTitle: 'Scan for Official Facebook Page',
      facebookDesc: 'Join 24,000+ safari travelers and get daily wildlife updates',
      websiteTitle: 'Scan to Open on Mobile',
      websiteDesc: 'Transfer your safari booking session to your mobile device instantly',
      downloadQr: 'Download QR Image',
      copyDetails: 'Copy Details',
      copied: 'Copied!',
      openLink: 'Open Link',
      scanInstructions: 'Open your phone camera or Safaricom M-Pesa App and aim at the QR code below.',
    },
    tillSection: {
      kicker: 'Instant & Automated Booking',
      verifiedBadge: 'Safaricom Buy Goods Verified',
      title: 'Official Till Number: 6608497',
      subtitle:
        'Pay safely and reserve your city tour or safari directly to our Safaricom Buy Goods account: SafariQuest Tours & Travel Ltd.',
      buyGoodsLabel: 'Lipa Na M-Pesa · Buy Goods',
      merchantTill: 'Merchant Till Number',
      zeroFees: 'Zero Transaction Fees',
      copyTill: 'Copy Till',
      copied: 'Copied!',
      merchantNameTitle: 'Direct Merchant Name',
      merchantNameDesc:
        'Always verify recipient shows SafariQuest Tours & Travel Ltd when prompted for PIN.',
      howToPayTitle: 'How to Pay via Till:',
      step1: 'Open M-Pesa on your Safaricom SIM Toolkit or M-Pesa App',
      step2: 'Select Lipa Na M-Pesa → Buy Goods and Services',
      step3: 'Enter Till Number: 6608497',
      step4: 'Enter Amount (30% deposit or full amount) and your secret M-Pesa PIN',
      inquiries: 'Direct inquiries:',
      calculatorTitle: 'Instant Payment Calculator & Verification',
      calculatorSubtitle:
        'Calculate your required deposit or verify your M-Pesa SMS confirmation code',
      liveBadge: 'Live Calculator',
      selectPkg: 'Select Tour Package',
      guestCount: 'Number of Guests',
      paymentOption: 'Select Payment Option',
      depositOptionTitle: '30% Reservation Deposit',
      depositOptionDesc: 'Locks in hotels, jeeps & guide',
      fullOptionTitle: '100% Full Payment',
      fullOptionDesc: 'Complete package paid in full',
      travelerName: 'Lead Traveler Name',
      amountToSend: 'Amount to Send to Till 6608497',
      equivalent: 'Equivalent to',
      requestStk: 'Request M-Pesa STK',
      sendingStk: 'Sending STK Push...',
      stkDispatched: 'M-Pesa STK push prompt dispatched to phone. Received via Till 6608497.',
      alreadyPaid: 'Already Paid? Enter M-Pesa Transaction Code',
      verifyButton: 'Verify & Voucher',
      verifyHelp:
        'Verification generates your instant downloadable SafariQuest Tour Voucher & Tax Invoice.',
    },
    facebook: {
      kicker: 'Official Social Channel',
      title: 'Connect With Us On Facebook',
      subtitle:
        'Join 24,000+ safari lovers and travelers. Catch daily game-drive updates, guest photos, special promotions, and instant customer service via Facebook Messenger.',
      verifiedPage: 'Official Business Page',
      followers: 'followers',
      responseRate: '98% Response rate',
      followPage: 'Follow Page',
      following: 'Following',
      openFacebook: 'Open on Facebook',
      sendMessage: 'Send Message',
      share: 'Share',
      officialNotice: 'Official Facebook Page:',
      noticeDesc: 'Always confirm bookings with our verified Till: 6608497 or direct line 0752632206.',
      latestPosts: 'Latest Facebook Posts & Traveler Stories',
      viewAll: 'View All on Facebook',
      likes: 'likes',
      comments: 'comments',
      shares: 'shares',
      liked: 'Liked',
      like: 'Like',
      comment: 'Comment',
      bookTrip: 'Book Trip',
    },
    reviewsFaq: {
      kicker: 'Verified Standards',
      title: 'Why Discerning Travelers Choose SafariQuest',
      subtitle:
        'Backed by official KATO accreditation, certified wildlife guides, and frictionless M-Pesa payments.',
      katoTitle: 'Licensed KATO Operator',
      katoDesc:
        'Fully bonded and licensed member of the Kenya Association of Tour Operators (#482). Every trip operates under strict ethical tourism and safety standards.',
      tillTitle: 'Instant Till 6608497 Security',
      tillDesc:
        'Zero middlemen. Direct billing to registered Safaricom business account with instantaneous SMS payment verification and digital vouchers.',
      jeepTitle: 'Customized 4x4 Land Cruisers',
      jeepDesc:
        'Every safari is conducted in custom pop-up roof 4WD safari jeeps equipped with binoculars, charging ports, first-aid kits, and fridge coolers.',
      lovedBy: 'Loved by 1,840+ Travelers Worldwide',
      feedbackSubtitle: 'Real feedback from guests who booked through our Till.',
      faqKicker: 'Clear Answers',
      faqTitle: 'Frequently Asked Questions',
    },
    footer: {
      bio: 'Licensed East African tour operator providing bespoke city tours, luxury wildlife safaris, and beach getaways.',
      katoLicence: 'KATO Licensed Operator #482 · Registered in Kenya',
      explore: 'Explore',
      directContact: 'Direct Contact',
      officialPayment: 'Official Payment',
      merchant: 'Merchant:',
      zeroCharges: 'Zero transaction charges. Direct support helpline:',
      allRights: 'All rights reserved.',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
    },
    modals: {
      bookTitle: 'Reserve Your Tour',
      bookSubtitle: 'Official Tour Booking',
      selectTour: 'Select Tour Package',
      fullName: 'Full Name',
      phone: 'M-Pesa Phone Number',
      email: 'Email Address',
      date: 'Preferred Travel Date',
      guests: 'Number of Guests',
      paymentType: 'Payment Option',
      mpesaCode: 'M-Pesa Transaction Code (Optional)',
      confirmBooking: 'Confirm Booking',
      close: 'Close',
      totalPrice: 'Total Package Price',
      depositPayable: '30% Deposit Payable',
      startingFrom: 'Starting From',
      bookCityTour: 'Book Tour',
      overview: 'Destination Overview',
      highlights: 'Top City & Adventure Highlights',
      sampleItinerary: 'Sample Itinerary',
      voucherTitle: 'Booking Voucher & Receipt',
      voucherStatusPaid: 'Confirmed · M-Pesa Verified',
      voucherStatusPending: 'Slot Reserved · Pending Payment',
      leadTraveler: 'Lead Traveler',
      travelDate: 'Travel Date',
      amountPaid: 'Amount Paid / Payable',
      remainingBalance: 'Remaining Balance at Departure',
      printPdf: 'Print / Save PDF',
      whatsAppSupport: 'WhatsApp Support',
      chatWhatsapp: 'Chat on WhatsApp · 0752632206',
      galleryTab: 'Photo Gallery',
      galleryKicker: 'Traveler Moments & Perspectives',
      galleryTitle: 'High-Resolution Photography & Traveler Snaps',
      gallerySubtitle:
        'Authentic captures from our safari guests, certified naturalists, and local photographers.',
      filterAll: 'All Photos',
      filterWildlife: 'Wildlife',
      filterSights: 'Landmarks & Sights',
      filterCulture: 'Culture & Food',
      filterTravelers: 'Guest Moments',
      sharePhotosTitle: 'Traveled with SafariQuest? Share Your Best Captures!',
      sharePhotosDesc:
        'Tag @SafariQuestToursKe on Facebook or send your top photos with Till receipt #6608497 to be featured in our official gallery.',
      shareOnWhatsApp: 'Send Photo via WhatsApp',
      capturedBy: 'Captured by',
      photosCount: 'Photos',
    },
  },
  sw: {
    nav: {
      destinations: 'Vivutio & Miji',
      packages: 'Vifurushi vya Ziara',
      tillPayment: 'Lipa Na Till 6608497',
      facebook: 'Facebook',
      faqs: 'Maswali ya Mara kwa Mara',
      bookTour: 'Weka Nafasi',
      videos: 'Video za Ziara',
      scanQr: 'Msimbo wa QR',
      currency: 'Sarafu',
      language: 'Lugha',
      darkMode: 'Mandhari Meusi',
      lightMode: 'Mandhari Meupe',
      theme: 'Mandhari',
    },
    hero: {
      kicker: 'Safari za Afrika Mashariki na Duniani',
      officialTill: 'Till Rasmi',
      title: 'Ziara za Miji, Safari za Wanyamapori na Fukwe za Bahari',
      subtitle:
        'Furahia wanyamapori jijini Nairobi, fukwe maridadi za Diani na Malindi, Mnara wa Table Mountain, na viungo vya Zanzibar. Lipa na thibitisha papo hapo kupitia Safaricom M-Pesa Till 6608497.',
      exploreBtn: 'Tazama Vivutio vya Miji',
      tillLabel: 'M-Pesa Till',
      copied: 'Imenakiliwa!',
      copyTill: 'Nakili Till',
      selectCity: 'Chagua Mji',
      allDestinations: 'Miji Yote (Miji 7)',
      travelSeason: 'Msimu wa Kusafiri',
      upcomingSeason: 'Mwisho wa Wiki / Wakati Wowote',
      currentSeason: 'Mwezi Huu (Msimu Huu)',
      peakSeason: 'Msimu Ujao wa Safari (Peak)',
      festiveSeason: 'Msimu wa Sikukuu na Likizo',
      partySize: 'Idadi ya Wasafiri',
      soloExplorer: 'Msafiri 1 Peke Yake',
      twoTravelers: 'Wasafiri 2 (Wanandoa / Marafiki)',
      groupTravelers: 'Wasafiri 3 hadi 5 (Familia / Kikundi)',
      largeGroup: 'Wasafiri 6+ (Gari Maalum ya Safari)',
      findAdventures: 'Tafuta Safari',
      katoBadge: 'Mwanachama Aliyeidhinishwa wa KATO #482',
      mpesaBadge: 'Mfanyabiashara Rasmi wa Lipa Na M-Pesa',
      guaranteedBadge: 'Safari Zilizohakikishwa 100%',
    },
    destinations: {
      kicker: 'Vivutio Maarufu vya Miji',
      curatedPhotos: 'Picha Halisi',
      title: 'Gundua Miji Mashuhuri ya Afrika na Ulimwenguni',
      subtitle:
        'Kuanzia mbuga ya wanyama ndani ya jiji la Nairobi hadi fukwe za Diani na Malindi, milima ya Cape Town, mitaa ya Zanzibar, Miami South Beach na mianga ya Tokyo.',
      allCities: 'Miji Yote',
      from: 'Kuanzia',
      viewItinerary: 'Tazama Ratiba',
      bookTrip: 'Weka Nafasi',
      durationDays: 'Siku',
    },
    packages: {
      kicker: 'Ratiba Zilizosanifiwa kwa Ustadi',
      inclusive: 'Huduma Kamili Bila Malipo ya Ziada',
      title: 'Vifurushi Maarufu vya Safari na Ziara Zenye Mwelekezi',
      subtitle:
        'Gharama wazi zikiwemo tiketi za mbuga, waelekezi wenye leseni, na magari ya kisasa. Lipa amana ya 30% kupitia Till 6608497 kufunga nafasi yako.',
      all: 'Zote',
      cityHighlights: 'Vivutio vya Jiji',
      beachIsland: 'Fukwe & Visiwani',
      bigFiveSafari: 'Safari ya Big Five',
      internationalCity: 'Miji ya Kimataifa',
      perPerson: 'Kwa Kila Mtu',
      deposit30: 'Amana ya 30%',
      reservePackage: 'Weka Nafasi kwa M-Pesa',
      inclusionsTitle: 'Vilivyojumuishwa kwenye Kifurushi:',
      daysTour: 'Siku za Ziara',
      reviews: 'maoni',
    },
    videos: {
      kicker: 'Safari za Picha na Video Fupi',
      title: 'Gundua Kenya na Maeneo ya Duniani kwa Video',
      subtitle:
        'Tazama vipande vifupi vya video vya mbuga maarufu za wanyama, hoteli na kambi za kifahari za safari, na miji ya kisasa yenye kuvutia.',
      categoryAll: 'Video Zote',
      categoryGameParks: 'Mbuga za Wanyama & Safari',
      categoryHotels: 'Hoteli & Kambi za Safari',
      categoryCities: 'Vivutio vya Miji',
      watchReel: 'Tazama Video',
      playVideo: 'Cheza Video',
      duration: 'Muda',
      quickBook: 'Weka Nafasi ya Safari Hii',
      inquireWhatsApp: 'Uliza Kupitia WhatsApp',
      exploreLocation: 'Gundua Eneo',
      views: 'watazamaji',
      modalTitle: 'Onyesho la Video za Safari',
      modalSubtitle: 'Ziara Halisi Zilizosanifiwa na SafariQuest',
      highlightsTitle: 'Mambo Muhimu Utakayopata:',
      relatedTour: 'Kifurushi Kinachohusiana:',
      closePlayer: 'Funga Kichezaji',
      previousVideo: 'Video Iliyotangulia',
      nextVideo: 'Video Inayofuata',
      previewBadge: 'Muhtasari wa Video',
    },
    weather: {
      title: 'Hali ya Hewa ya Sasa na Utabiri wa Siku 3',
      subtitle: 'Hali ya hewa halisi kukusaidia kupanga mavazi na safari yako',
      liveOutlook: 'Hali Halisi ya Hewa',
      forecast3Day: 'Utabiri wa Siku 3',
      today: 'Leo',
      tomorrow: 'Kesho',
      dayAfter: 'Siku ya 3',
      precipitation: 'Nafasi ya Mvua',
      wind: 'Upepo',
      packingTipTitle: 'Ushauri wa Mavazi na Safari',
      loading: 'Inapakia taarifa za hali ya hewa...',
      errorFailed: 'Taarifa za moja kwa moja zimechelewa. Inaonyesha makadirio ya hali ya hewa.',
      retry: 'Jaribu Tena',
      bestSeason: 'Msimu Bora',
    },
    qrCode: {
      kicker: 'Upatikanaji wa Haraka wa Simu',
      title: 'Changanua Msimbo wa QR kwa Malipo na Usaidizi',
      subtitle:
        'Elekeza kamera ya simu yako kulipa kupitia M-Pesa Till 6608497, kuwasiliana WhatsApp, au kufuata ukurasa wetu wa Facebook.',
      scanPrompt: 'Elekeza kamera au M-Pesa App kuchanganua',
      tabMpesa: 'M-Pesa Till 6608497',
      tabWhatsapp: 'Huduma ya WhatsApp',
      tabFacebook: 'Ukurasa wa Facebook',
      tabWebsite: 'Tovuti ya Simu',
      mpesaTitle: 'Changanua Kulipa kupitia M-Pesa',
      mpesaDesc: 'Mfanyabiashara wa Safaricom Buy Goods: SafariQuest Tours & Travel Ltd · Till: 6608497',
      whatsappTitle: 'Changanua Kuongea Nasi WhatsApp',
      whatsappDesc: 'Mawasiliano ya moja kwa moja masaa 24/7 kwa simu 0752632206',
      facebookTitle: 'Changanua Ukurasa wa Facebook',
      facebookDesc: 'Jiunge na wasafiri zaidi ya 24,000 kupata taarifa za kila siku',
      websiteTitle: 'Changanua Kufungua Kwenye Simu',
      websiteDesc: 'Endelea na uhifadhi wa safari kwenye simu yako ya mkononi papo hapo',
      downloadQr: 'Pakua Picha ya QR',
      copyDetails: 'Nakili Taarifa',
      copied: 'Imenakiliwa!',
      openLink: 'Fungua Kiungo',
      scanInstructions: 'Fungua kamera ya simu yako au Safaricom M-Pesa App kuelekeza kwenye msimbo wa QR.',
    },
    tillSection: {
      kicker: 'Uhifadhi wa Papo Hapo na wa Kuaminika',
      verifiedBadge: 'Imethibitishwa na Safaricom Buy Goods',
      title: 'Nambari Rasmi ya Till: 6608497',
      subtitle:
        'Lipa kwa usalama na uweke nafasi ya safari yako moja kwa moja kwenye akaunti ya Safaricom Buy Goods: SafariQuest Tours & Travel Ltd.',
      buyGoodsLabel: 'Lipa Na M-Pesa · Nunua Bidhaa (Buy Goods)',
      merchantTill: 'Nambari ya Till ya Biashara',
      zeroFees: 'Hakuna Makato ya Ziada ya Muamala',
      copyTill: 'Nakili Till',
      copied: 'Imenakiliwa!',
      merchantNameTitle: 'Jina Rasmi la Mfanyabiashara',
      merchantNameDesc:
        'Hakikisha jina linalotokea kabla ya kuweka PIN ni SafariQuest Tours & Travel Ltd.',
      howToPayTitle: 'Jinsi ya Kulipa kupitia Till:',
      step1: 'Fungua M-Pesa kwenye SIM Toolkit au M-Pesa App',
      step2: 'Chagua Lipa Na M-Pesa → Nunua Bidhaa na Huduma (Buy Goods)',
      step3: 'Weka Namba ya Till: 6608497',
      step4: 'Weka Kiasi (Amana ya 30% au malipo yote) na PIN yako ya siri',
      inquiries: 'Mawasiliano ya moja kwa moja:',
      calculatorTitle: 'Kikokotoo cha Malipo na Uthibitishaji wa Papo Hapo',
      calculatorSubtitle:
        'Kokotoa amana yako inayohitajika au thibitisha ujumbe wako wa SMS wa M-Pesa',
      liveBadge: 'Kikokotoo cha Papo Hapo',
      selectPkg: 'Chagua Kifurushi cha Safari',
      guestCount: 'Idadi ya Wasafiri',
      paymentOption: 'Chaguo la Malipo',
      depositOptionTitle: 'Amana ya 30% ya Kufunga Nafasi',
      depositOptionDesc: 'Inafunga hoteli, gari la safari na mwongozo',
      fullOptionTitle: '100% Malipo Yote Kamili',
      fullOptionDesc: 'Kifurushi kote kimelipwa kikamilifu',
      travelerName: 'Jina la Msafiri Kiongozi',
      amountToSend: 'Kiasi cha Kutuma kwa Till 6608497',
      equivalent: 'Sawa na',
      requestStk: 'Omba STK Push ya M-Pesa',
      sendingStk: 'Inatuma ombi kwa simu...',
      stkDispatched: 'Ombi la M-Pesa limetumwa kwenye simu yako. Malipo yamepokelewa kupitia Till 6608497.',
      alreadyPaid: 'Umelipa Tayari? Weka Nambari ya Muamala ya M-Pesa',
      verifyButton: 'Thibitisha & Risiti',
      verifyHelp:
        'Uthibitishaji unakupa vocha rasmi ya safari ya SafariQuest na ankara ya kupakua mara moja.',
    },
    facebook: {
      kicker: 'Ukurasa Rasmi wa Kijamii',
      title: 'Ungana Nasi Kwenye Facebook',
      subtitle:
        'Jiunge na maelfu ya wasafiri zaidi ya 24,000. Pata taarifa za kila siku za mbugani, picha za wageni, ofa maalum na usaidizi wa haraka kupitia Facebook Messenger.',
      verifiedPage: 'Ukurasa Rasmi Uliothibitishwa',
      followers: 'wafuasi',
      responseRate: 'Majibu ya haraka 98%',
      followPage: 'Fuata Ukurasa',
      following: 'Umeshauata',
      openFacebook: 'Fungua Facebook',
      sendMessage: 'Tuma Ujumbe',
      share: 'Gawa',
      officialNotice: 'Ukurasa Rasmi wa Facebook:',
      noticeDesc: 'Kila mara thibitisha malipo kupitia Till yetu iliyothibitishwa: 6608497 au piga simu 0752632206.',
      latestPosts: 'Machapisho ya Hivi Karibuni na Hadithi za Wasafiri',
      viewAll: 'Tazama Yote Kwenye Facebook',
      likes: 'wamependa',
      comments: 'maoni',
      shares: 'wameshiriki',
      liked: 'Umependa',
      like: 'Penda',
      comment: 'Maoni',
      bookTrip: 'Weka Nafasi',
    },
    reviewsFaq: {
      kicker: 'Viwango Vilivyoidhinishwa',
      title: 'Kwa Nini Wasafiri Wanamini SafariQuest',
      subtitle:
        'Tumepewa leseni kamili ya KATO, waelekezi waliobobea wanyamapori, na malipo salama ya M-Pesa.',
      katoTitle: 'Opereta Mwenye Leseni ya KATO',
      katoDesc:
        'Mwanachama aliyeidhinishwa na Shirikisho la Waendeshaji Ziara Kenya (KATO #482). Kila safari inazingatia usalama na maadili ya utalii.',
      tillTitle: 'Usalama wa Papo Hapo wa Till 6608497',
      tillDesc:
        'Bila madalali. Malipo ya moja kwa moja kwenye akaunti ya biashara ya Safaricom yenye risiti na uthibitisho wa SMS mara moja.',
      jeepTitle: 'Magari Maalum ya 4x4 Land Cruiser',
      jeepDesc:
        'Kila safari hufanywa kwa gari la 4WD lenye paa linalofunguka, darubini, chaji za simu, huduma ya kwanza, na jokofu la vinywaji.',
      lovedBy: 'Inapendwa na Wasafiri 1,840+ Duniani',
      feedbackSubtitle: 'Maoni halisi kutoka kwa wageni waliolipa kupitia Till yetu.',
      faqKicker: 'Majibu ya Wazi',
      faqTitle: 'Maswali Yanayoulizwa Sana',
    },
    footer: {
      bio: 'Waendeshaji wenye leseni ya utalii Afrika Mashariki wakitoa safari za miji, wanyamapori na fukwe za starehe.',
      katoLicence: 'Leseni ya KATO #482 · Imesajiliwa Kenya',
      explore: 'Gundua',
      directContact: 'Mawasiliano ya Moja kwa Moja',
      officialPayment: 'Malipo Rasmi',
      merchant: 'Mfanyabiashara:',
      zeroCharges: 'Hakuna gharama za ziada. Nambari ya usaidizi:',
      allRights: 'Haki zote zimehifadhiwa.',
      terms: 'Vigezo na Masharti',
      privacy: 'Sera ya Faragha',
    },
    modals: {
      bookTitle: 'Weka Nafasi ya Safari Yako',
      bookSubtitle: 'Uhifadhi Rasmi wa Ziara',
      selectTour: 'Chagua Kifurushi cha Safari',
      fullName: 'Jina Kamili',
      phone: 'Nambari ya Simu ya M-Pesa',
      email: 'Barua Pepe',
      date: 'Tarehe Unayotaka Kusafiri',
      guests: 'Idadi ya Wasafiri',
      paymentType: 'Aina ya Malipo',
      mpesaCode: 'Msimbo wa Muamala wa M-Pesa (Hiari)',
      confirmBooking: 'Thibitisha Uhifadhi',
      close: 'Funga',
      totalPrice: 'Jumla ya Bei ya Kifurushi',
      depositPayable: 'Amana ya 30% Inayolipwa',
      startingFrom: 'Kuanzia',
      bookCityTour: 'Weka Nafasi ya Ziara',
      overview: 'Muhtasari wa Eneo',
      highlights: 'Mambo Muhimu ya Kipekee',
      sampleItinerary: 'Sampuli ya Ratiba',
      voucherTitle: 'Vocha ya Safari na Risiti',
      voucherStatusPaid: 'Imethibitishwa · M-Pesa Imekaguliwa',
      voucherStatusPending: 'Nafasi Imehifadhiwa · Inasubiri Malipo',
      leadTraveler: 'Msafiri Kiongozi',
      travelDate: 'Tarehe ya Safari',
      amountPaid: 'Kiasi Kilicholipwa / Kinacholipwa',
      remainingBalance: 'Salio Lililobaki Wakati wa Kuanza',
      printPdf: 'Chapa / Hifadhi PDF',
      whatsAppSupport: 'Msaada wa WhatsApp',
      chatWhatsapp: 'Ongea nasi WhatsApp · 0752632206',
      galleryTab: 'Picha za Safari',
      galleryKicker: 'Matukio na Picha za Wasafiri',
      galleryTitle: 'Picha Zenye Ubora wa Juu na Matukio Halisi',
      gallerySubtitle:
        'Picha halisi zilizopigwa na wageni wetu, waelekezi wa porini, na wapiga picha mahiri.',
      filterAll: 'Picha Zote',
      filterWildlife: 'Wanyamapori',
      filterSights: 'Vivutio & Mandhari',
      filterCulture: 'Utamaduni & Vyakula',
      filterTravelers: 'Matukio ya Wageni',
      sharePhotosTitle: 'Umesafiri na SafariQuest? Shiriki Picha Zako!',
      sharePhotosDesc:
        'Tuma picha zako nzuri pamoja na namba ya muamala wa Till 6608497 zionekane kwenye ukurasa wetu rasmi na Facebook.',
      shareOnWhatsApp: 'Tuma Picha kwa WhatsApp',
      capturedBy: 'Picha na',
      photosCount: 'Picha',
    },
  },
  fr: {
    nav: {
      destinations: 'Destinations',
      packages: 'Circuits & Forfaits',
      tillPayment: 'Paiement Till 6608497',
      facebook: 'Facebook',
      faqs: 'FAQ',
      bookTour: 'Réserver',
      videos: 'Vidéos & Reels',
      scanQr: 'Code QR',
      currency: 'Devise',
      language: 'Langue',
      darkMode: 'Mode sombre',
      lightMode: 'Mode clair',
      theme: 'Thème',
    },
    hero: {
      kicker: 'Évasions en Afrique de l’Est et dans le Monde',
      officialTill: 'Numéro Till Officiel',
      title: 'Circuits Urbains Sur-Mesure, Safaris Sauvages et Escapades Côtières',
      subtitle:
        'Découvrez la faune sauvage de Nairobi, les plages turquoise de Diani et Malindi, la montagne de la Table et l’île aux épices de Zanzibar. Réservation sécurisée et instantanée via Safaricom M-Pesa Till 6608497.',
      exploreBtn: 'Explorer les Villes',
      tillLabel: 'Till M-Pesa',
      copied: 'Copié !',
      copyTill: 'Copier Till',
      selectCity: 'Sélectionner une Ville',
      allDestinations: 'Toutes les Destinations (7 Villes)',
      travelSeason: 'Saison de Voyage',
      upcomingSeason: 'Prochain Week-end / Flexible',
      currentSeason: 'Ce Mois-ci (Saison Actuelle)',
      peakSeason: 'Prochain Trimestre (Haute Saison Safari)',
      festiveSeason: 'Vacances et Fêtes de Fin d’Année',
      partySize: 'Nombre de Voyageurs',
      soloExplorer: '1 Voyageur Solo',
      twoTravelers: '2 Voyageurs (Couples / Amis)',
      groupTravelers: '3 à 5 Voyageurs (Famille / Petit Groupe)',
      largeGroup: '6+ Voyageurs (Van Safari Privatisé)',
      findAdventures: 'Trouver une Aventure',
      katoBadge: 'Membre Certifié KATO #482',
      mpesaBadge: 'Commerçant Agréé Lipa Na M-Pesa',
      guaranteedBadge: 'Départs Garantis à 100%',
    },
    destinations: {
      kicker: 'Destinations Urbaines Emblématiques',
      curatedPhotos: 'Photographie d’Auteur',
      title: 'Explorez les Villes Célèbres d’Afrique et du Monde',
      subtitle:
        'Du parc national urbain de Nairobi aux récifs coralliens de Diani et Malindi, des falaises du Cap aux ruelles de Zanzibar, de Miami South Beach à la skyline de Tokyo.',
      allCities: 'Toutes les Villes',
      from: 'À partir de',
      viewItinerary: 'Voir l’Itinéraire',
      bookTrip: 'Réserver le Séjour',
      durationDays: 'Jours',
    },
    packages: {
      kicker: 'Itinéraires Méticuleusement Conçus',
      inclusive: 'Accompagnement Tout-Inclus',
      title: 'Forfaits Touristiques Populaires et Circuits Guidés',
      subtitle:
        'Tarification transparente incluant entrées aux parcs, guides certifiés et 4x4 tout-confort. Versez un acompte de 30% via le Till 6608497 pour verrouiller vos dates.',
      all: 'Tous',
      cityHighlights: 'Découvertes Urbaines',
      beachIsland: 'Plages & Îles',
      bigFiveSafari: 'Safari Big Five',
      internationalCity: 'Métropoles Internationales',
      perPerson: 'Par Personne',
      deposit30: 'Acompte 30%',
      reservePackage: 'Réserver avec M-Pesa',
      inclusionsTitle: 'Inclusions du Forfait :',
      daysTour: 'Jours de Circuit',
      reviews: 'avis',
    },
    videos: {
      kicker: 'Voyages Visuels & Courts Extraits',
      title: 'Explorez le Kenya et le Monde en Vidéo',
      subtitle:
        'Visionnez de courts clips cinématographiques de réserves animalières emblématiques, d’hôtels et lodges d’exception, et de métropoles vibrantes.',
      categoryAll: 'Toutes les Vidéos',
      categoryGameParks: 'Parcs Animaliers & Safaris',
      categoryHotels: 'Hôtels & Lodges de Safari',
      categoryCities: 'Escapades & Villes',
      watchReel: 'Regarder le Clip',
      playVideo: 'Lire la Vidéo',
      duration: 'Durée',
      quickBook: 'Réserver cette Aventure',
      inquireWhatsApp: 'Demande via WhatsApp',
      exploreLocation: 'Explorer le Lieu',
      views: 'vues',
      modalTitle: 'Aperçu Vidéo de la Destination',
      modalSubtitle: 'Circuits Officiels d’Exception SafariQuest',
      highlightsTitle: 'Points Forts de l’Expérience :',
      relatedTour: 'Forfait Touristique Associé :',
      closePlayer: 'Fermer le Lecteur',
      previousVideo: 'Vidéo Précédente',
      nextVideo: 'Vidéo Suivante',
      previewBadge: 'Aperçu Vidéo',
    },
    weather: {
      title: 'Météo Actuelle et Prévisions sur 3 Jours',
      subtitle: 'Conditions météorologiques en temps réel pour préparer vos tenues et activités',
      liveOutlook: 'Météo en Direct',
      forecast3Day: 'Prévisions 3 Jours',
      today: 'Aujourd’hui',
      tomorrow: 'Demain',
      dayAfter: 'Jour 3',
      precipitation: 'Risque de pluie',
      wind: 'Vent',
      packingTipTitle: 'Conseil Valise & Safari',
      loading: 'Chargement des données météo en direct...',
      errorFailed: 'Données météo temporairement indisponibles. Affichage du climat saisonnier.',
      retry: 'Réessayer',
      bestSeason: 'Saison Idéale',
    },
    qrCode: {
      kicker: 'Accès Mobile Rapide',
      title: 'Scannez le Code QR pour Paiement & Assistance',
      subtitle:
        'Pointez votre smartphone pour payer via le Till M-Pesa 6608497, échanger sur WhatsApp ou rejoindre notre communauté Facebook.',
      scanPrompt: 'Pointez votre appareil photo ou l’application M-Pesa pour scanner',
      tabMpesa: 'Till M-Pesa 6608497',
      tabWhatsapp: 'Conciergerie WhatsApp',
      tabFacebook: 'Page Facebook',
      tabWebsite: 'Application Mobile',
      mpesaTitle: 'Scannez pour Régler via M-Pesa',
      mpesaDesc: 'Commerçant Agréé Safaricom Buy Goods : SafariQuest Tours & Travel Ltd · Till : 6608497',
      whatsappTitle: 'Scannez pour Discuter sur WhatsApp',
      whatsappDesc: 'Assistance safari directe 24h/24 et 7j/7 au 0752632206',
      facebookTitle: 'Scannez pour la Page Facebook',
      facebookDesc: 'Rejoignez plus de 24 000 passionnés de safari pour suivre nos actualités',
      websiteTitle: 'Scannez pour Ouvrir sur Mobile',
      websiteDesc: 'Transférez votre session de réservation directement sur votre téléphone',
      downloadQr: 'Télécharger l’Image QR',
      copyDetails: 'Copier les Détails',
      copied: 'Copié !',
      openLink: 'Ouvrir le Lien',
      scanInstructions: 'Ouvrez votre appareil photo ou l’app M-Pesa et visez le code QR ci-dessous.',
    },
    tillSection: {
      kicker: 'Réservation Instantanée et Automatisée',
      verifiedBadge: 'Vérifié Safaricom Buy Goods',
      title: 'Numéro Till Officiel : 6608497',
      subtitle:
        'Réglez en toute sécurité et réservez votre voyage directement sur notre compte Safaricom Buy Goods : SafariQuest Tours & Travel Ltd.',
      buyGoodsLabel: 'Lipa Na M-Pesa · Buy Goods',
      merchantTill: 'Numéro Till Marchand',
      zeroFees: 'Zéro Frais de Transaction',
      copyTill: 'Copier le Till',
      copied: 'Copié !',
      merchantNameTitle: 'Nom Officiel du Marchand',
      merchantNameDesc:
        'Vérifiez toujours que le destinataire indique SafariQuest Tours & Travel Ltd avant de taper votre code PIN.',
      howToPayTitle: 'Comment Payer via le Till :',
      step1: 'Ouvrez M-Pesa sur votre boîte à outils SIM ou votre application M-Pesa',
      step2: 'Sélectionnez Lipa Na M-Pesa → Buy Goods and Services',
      step3: 'Entrez le Numéro Till : 6608497',
      step4: 'Entrez le Montant (Acompte de 30% ou paiement intégral) et votre code PIN secret',
      inquiries: 'Assistance directe :',
      calculatorTitle: 'Calculateur de Paiement et Vérification Instantanée',
      calculatorSubtitle:
        'Calculez votre acompte requis ou vérifiez votre code de confirmation SMS M-Pesa',
      liveBadge: 'Calculateur en Direct',
      selectPkg: 'Sélectionner un Forfait',
      guestCount: 'Nombre de Voyageurs',
      paymentOption: 'Option de Paiement',
      depositOptionTitle: 'Acompte de Réservation 30%',
      depositOptionDesc: 'Garantit les hôtels, 4x4 et guide privé',
      fullOptionTitle: 'Paiement Intégral 100%',
      fullOptionDesc: 'Séjour complet réglé en totalité',
      travelerName: 'Nom du Voyageur Principal',
      amountToSend: 'Montant à Envoyer au Till 6608497',
      equivalent: 'Équivalent à',
      requestStk: 'Demander le Push STK M-Pesa',
      sendingStk: 'Envoi du prompt sur votre téléphone...',
      stkDispatched: 'Invite M-Pesa envoyée sur votre téléphone. Paiement reçu via Till 6608497.',
      alreadyPaid: 'Déjà Payé ? Entrez le Code de Transaction M-Pesa',
      verifyButton: 'Vérifier & Bon de Voyage',
      verifyHelp:
        'La vérification génère immédiatement votre bon de voyage SafariQuest téléchargeable et votre facture.',
    },
    facebook: {
      kicker: 'Canal Social Officiel',
      title: 'Rejoignez-Nous Sur Facebook',
      subtitle:
        'Rejoignez plus de 24 000 passionnés de safari. Suivez nos actualités en direct des réserves, photos de voyageurs, offres spéciales et assistance rapide via Facebook Messenger.',
      verifiedPage: 'Page Professionnelle Vérifiée',
      followers: 'abonnés',
      responseRate: 'Taux de réponse de 98%',
      followPage: 'Suivre la Page',
      following: 'Abonné',
      openFacebook: 'Ouvrir Facebook',
      sendMessage: 'Envoyer un Message',
      share: 'Partager',
      officialNotice: 'Page Facebook Officielle :',
      noticeDesc:
        'Confirmez toujours vos réservations avec notre Till vérifié : 6608497 ou notre ligne directe 0752632206.',
      latestPosts: 'Dernières Publications et Récits de Voyageurs',
      viewAll: 'Voir Tout sur Facebook',
      likes: 'mentions J’aime',
      comments: 'commentaires',
      shares: 'partages',
      liked: 'Aimé',
      like: 'J’aime',
      comment: 'Commenter',
      bookTrip: 'Réserver',
    },
    reviewsFaq: {
      kicker: 'Normes et Accréditations',
      title: 'Pourquoi les Voyageurs Exigeants Choisissent SafariQuest',
      subtitle:
        'Adossé à la certification KATO, des guides animaliers chevronnés et des règlements M-Pesa sans accroc.',
      katoTitle: 'Opérateur Agréé KATO',
      katoDesc:
        'Membre dûment agréé de l’Association des Opérateurs Touristiques du Kenya (KATO #482). Chaque voyage respecte scrupuleusement les normes de sécurité et d’éthique.',
      tillTitle: 'Sécurité Immédiate Till 6608497',
      tillDesc:
        'Aucun intermédiaire. Facturation directe sur notre compte marchand Safaricom avec vérification instantanée par SMS et bons numériques.',
      jeepTitle: '4x4 Land Cruiser Tout-Confort',
      jeepDesc:
        'Chaque safari est réalisé à bord de 4x4 personnalisés avec toit ouvrant panoramique, jumelles, ports de recharge, trousse de secours et glacière.',
      lovedBy: 'Approuvé par Plus de 1 840 Voyageurs',
      feedbackSubtitle: 'Avis vérifiés de clients ayant réservé via notre Till.',
      faqKicker: 'Réponses Claires',
      faqTitle: 'Foire Aux Questions',
    },
    footer: {
      bio: 'Agence de voyages agréée en Afrique de l’Est, spécialisée dans les circuits urbains, safaris animaliers de luxe et séjours balnéaires.',
      katoLicence: 'Opérateur Agréé KATO #482 · Enregistré au Kenya',
      explore: 'Explorer',
      directContact: 'Contact Direct',
      officialPayment: 'Paiement Officiel',
      merchant: 'Marchand :',
      zeroCharges: 'Aucuns frais de transaction. Ligne d’assistance directe :',
      allRights: 'Tous droits réservés.',
      terms: 'Conditions Générales',
      privacy: 'Politique de Confidentialité',
    },
    modals: {
      bookTitle: 'Réservez Votre Séjour',
      bookSubtitle: 'Réservation Officielle de Circuit',
      selectTour: 'Sélectionner le Forfait',
      fullName: 'Nom Complet',
      phone: 'Numéro de Téléphone M-Pesa',
      email: 'Adresse E-mail',
      date: 'Date de Voyage Souhaitée',
      guests: 'Nombre de Voyageurs',
      paymentType: 'Option de Paiement',
      mpesaCode: 'Code de Transaction M-Pesa (Facultatif)',
      confirmBooking: 'Confirmer la Réservation',
      close: 'Fermer',
      totalPrice: 'Prix Total du Forfait',
      depositPayable: 'Acompte de 30% Dû',
      startingFrom: 'À partir de',
      bookCityTour: 'Réserver le Circuit',
      overview: 'Présentation de la Destination',
      highlights: 'Points Forts et Attractions',
      sampleItinerary: 'Exemple d’Itinéraire',
      voucherTitle: 'Bon de Réservation et Reçu',
      voucherStatusPaid: 'Confirmé · M-Pesa Vérifié',
      voucherStatusPending: 'Place Réservée · En Attente de Paiement',
      leadTraveler: 'Voyageur Principal',
      travelDate: 'Date de Voyage',
      amountPaid: 'Montant Réglé / Dû',
      remainingBalance: 'Solde Restant au Départ',
      printPdf: 'Imprimer / Enregistrer PDF',
      whatsAppSupport: 'Support WhatsApp',
      chatWhatsapp: 'Discuter sur WhatsApp · 0752632206',
      galleryTab: 'Galerie Photos',
      galleryKicker: 'Instants Voyageurs & Perspectives',
      galleryTitle: 'Photographies Haute Définition & Récits Visuels',
      gallerySubtitle:
        'Clichés authentiques capturés par nos voyageurs, guides naturalistes et photographes locaux.',
      filterAll: 'Toutes les Photos',
      filterWildlife: 'Vie Sauvage',
      filterSights: 'Sites & Panoramas',
      filterCulture: 'Culture & Gastronomie',
      filterTravelers: 'Instants Partagés',
      sharePhotosTitle: 'Vous avez voyagé avec SafariQuest ? Partagez vos Clichés !',
      sharePhotosDesc:
        'Taguez @SafariQuestToursKe sur Facebook ou envoyez vos photos avec votre reçu Till 6608497 pour figurer dans notre galerie.',
      shareOnWhatsApp: 'Envoyer une Photo via WhatsApp',
      capturedBy: 'Pris par',
      photosCount: 'Photos',
    },
  },
};
