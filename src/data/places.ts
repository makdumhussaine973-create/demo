import { Place, CategoryInfo, CategoryId } from '../types';

export const CATEGORIES_CONFIG: CategoryInfo[] = [
  {
    id: 'all',
    label: 'All Radar',
    iconName: 'Compass',
    color: '#6366f1',
    bgLight: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
    badgeBg: 'bg-indigo-600 text-white'
  },
  {
    id: 'food',
    label: 'Food & Cafes',
    iconName: 'Utensils',
    color: '#f97316',
    bgLight: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    badgeBg: 'bg-amber-500 text-white'
  },
  {
    id: 'theatres',
    label: 'Movie Theatres',
    iconName: 'Clapperboard',
    color: '#a855f7',
    bgLight: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
    badgeBg: 'bg-purple-600 text-white'
  },
  {
    id: 'bookstores',
    label: 'Stationery & Xerox',
    iconName: 'BookOpen',
    color: '#10b981',
    bgLight: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    badgeBg: 'bg-emerald-600 text-white'
  },
  {
    id: 'hangouts',
    label: 'Hangouts & Nature',
    iconName: 'Sparkles',
    color: '#ec4899',
    bgLight: 'bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300',
    badgeBg: 'bg-pink-600 text-white'
  },
  {
    id: 'sports',
    label: 'Sports & Turf',
    iconName: 'Dumbbell',
    color: '#3b82f6',
    bgLight: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    badgeBg: 'bg-blue-600 text-white'
  },
  {
    id: 'study',
    label: 'Study Hubs',
    iconName: 'Library',
    color: '#06b6d4',
    bgLight: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300',
    badgeBg: 'bg-cyan-600 text-white'
  },
  {
    id: 'hospitals',
    label: 'Hospitals & Meds',
    iconName: 'HeartPulse',
    color: '#ef4444',
    bgLight: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300',
    badgeBg: 'bg-red-600 text-white'
  }
];

export const RAW_PLACES: Place[] = [
  // 1. KURNOOL - GPREC GATE CAFE
  {
    id: 'tea-time-gprec',
    name: 'Tea Time & GPREC Campus Adda',
    category: 'food',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8285, 78.0275],
    distance_km: 0.1,
    rating: 4.8,
    review_count: 820,
    senior_review: "The holy grail for break-hour chai. Best Irani and ginger tea. BUT watch out: it gets overwhelmingly packed at 4 PM when college leaves.",
    senior_author: 'Afzal Shaik',
    senior_branch: 'IT, 2nd Year',
    image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    tag: 'Direct Gate #1 Adda',
    address: 'Gate #1 Main Road, Opp. GPREC Campus, Pasupula, Kurnool',
    price_tier: '₹',
    opening_hours: '06:00 AM - 10:30 PM',
    timing_tip: 'Grab the Kulhad Ginger Chai at 1:15 PM before the massive 4 PM rush',
    activities: [
      'Quick break ginger chai & Osmania biscuits',
      'Team project sync & group assignment chat',
      'Hostel friend meetup before bus departure',
      'Late afternoon samosa snacking'
    ],
    pros: [
      'Just a 90-second walk from college main gate',
      'Extremely cheap (Chai ₹12 - ₹15)',
      'Fast UPI QR code payments',
      'Shaded benches under trees'
    ],
    cons: [
      'No indoor air conditioning, gets sweltering in Rayalaseema heat',
      'Aggressive crowd and cigarette smoke drifting from side stalls',
      'Limited vehicle parking on the narrow gate approach road',
      'Snacks run out quickly by 5:30 PM'
    ],
    reviews: [
      {
        id: 'rev-tt-1',
        author: 'Kishore V.',
        branch: 'ECE',
        year: '4th Year',
        rating: 5,
        type: 'positive',
        title: 'Lifeline during 8 AM morning labs',
        comment: 'If you survived the morning professor viva, this ginger tea resets your entire soul. Bun maska with hot tea is the greatest combo for under ₹30.',
        date: '2 days ago',
        verifiedStudent: true,
        likes: 42,
        tags: ['Budget Friendly', 'Must Try Chai']
      },
      {
        id: 'rev-tt-2',
        author: 'Sneha P.',
        branch: 'CSE',
        year: '2nd Year',
        rating: 2,
        type: 'critical',
        title: 'Horrible rush and zero seating for girls',
        comment: 'Too crowded between 4:00 PM and 5:00 PM. All the benches are occupied by large senior groups and people block the entire footpath. Better to buy takeaway.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 29,
        tags: ['Overcrowded', 'Limited Seating']
      },
      {
        id: 'rev-tt-3',
        author: 'Dinesh Reddy',
        branch: 'Mech',
        year: '3rd Year',
        rating: 4,
        type: 'mixed',
        title: 'Good chai, mediocre samosas',
        comment: 'Chai is consistently 5/5, but the samosas sometimes feel fried in morning oil. Ask for fresh batch or stick to sealed biscuits.',
        date: '3 weeks ago',
        verifiedStudent: true,
        likes: 18,
        tags: ['Honest Warning']
      }
    ],
    features: ['Chai & Coffee', 'Fast UPI', 'Snacks', 'Outdoor Seating']
  },

  // 2. KURNOOL - UNIVERSAL XEROX & GRAPHICS
  {
    id: 'universal-xerox',
    name: 'Universal Xerox & Engineering Graphics Depot',
    category: 'bookstores',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8275, 78.0290],
    distance_km: 0.2,
    rating: 4.4,
    review_count: 510,
    senior_review: "The official savior for engineering workshop records and drafter sheets. Cheap binding, but send files via WhatsApp in advance or you will be stuck in a 1-hour queue on submission days.",
    senior_author: 'Naveen Kumar',
    senior_branch: 'Mechanical, Final Year',
    image_url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
    tag: 'Record Binding & Large Plotters',
    address: 'Near GPREC Main Arch Road, Pasupula, Kurnool',
    price_tier: '₹',
    opening_hours: '08:00 AM - 10:00 PM',
    timing_tip: 'WhatsApp your PDF by 8:30 AM to collect bound copy during lunch break',
    activities: [
      'A0/A1 engineering drawing sheet plotting & trimming',
      'Spiral & hardbound final semester project binding',
      'Lab manual photocopy & formula handbook purchase',
      'Mini drafter, roller scale, and chart sheet shopping'
    ],
    pros: [
      'Has large-scale plotters specifically calibrated for JNTU/GPREC templates',
      'Offers bulk student discount on printouts (₹1 per duplex B&W)',
      'WhatsApp print queue saves physical waiting time',
      'Stocks approved mini-drafters and French curves'
    ],
    cons: [
      'Staff gets short-tempered and rude on deadline submission mornings',
      'Charges ₹15 extra for color front page without prior warning',
      'Extreme queue extending into the street during mid-terms',
      'Cash preferred; sometimes scanner fails due to spotty indoor network'
    ],
    reviews: [
      {
        id: 'rev-ux-1',
        author: 'Venkatesh M.',
        branch: 'Civil',
        year: 'Final Year',
        rating: 5,
        type: 'positive',
        title: 'Saved my CAD project from 0 marks',
        comment: 'Plotter machine printed my A1 structural plan in 3 minutes when campus central library machine broke down. Absolute lifesavers.',
        date: '5 days ago',
        verifiedStudent: true,
        likes: 35,
        tags: ['Lifesaver', 'Exam Sprint']
      },
      {
        id: 'rev-ux-2',
        author: 'Pooja R.',
        branch: 'ECE',
        year: '1st Year',
        rating: 2,
        type: 'critical',
        title: 'Check your change and bill carefully',
        comment: 'Charged me ₹90 for 25 pages because they added color print rates for simple blue heading lines! Specify "Black and white only" clearly when handing your pendrive.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 54,
        tags: ['Watch Your Bill', 'Critical Tip']
      }
    ],
    features: ['Large Plotter', 'Spiral Binding', 'WhatsApp Print', 'Stationery Kit']
  },

  // 3. KURNOOL - BOX CRICKET & SPORTS TURF
  {
    id: 'kurnool-strike-turf',
    name: 'Strike Zone Box Cricket Turf & Arena',
    category: 'sports',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8210, 78.0315],
    distance_km: 1.1,
    rating: 4.7,
    review_count: 380,
    senior_review: "Where inter-department cricket and football rivalries are settled under floodlights! Clean turf and good bats, but strictly split costs as hourly weekend rates can burn your pocket.",
    senior_author: 'Rohit Naidu',
    senior_branch: 'EEE, 3rd Year',
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    tag: 'Floodlight Box Cricket & Futsal',
    address: 'Near Old Toll Gate, Pasupula Bypass Road, Kurnool',
    price_tier: '₹₹',
    opening_hours: '05:00 AM - 12:00 Midnight',
    timing_tip: 'Book the 7:00 PM - 9:00 PM slot 2 days ahead via phone call',
    activities: [
      '6v6 & 8v8 floodlight night box cricket matches',
      'Inter-branch weekend football/futsal tournaments',
      'Hostel batch bonding & birthday midnight matches',
      'Cricket bat and leather ball practice nets'
    ],
    pros: [
      'High-grade FIFA-standard artificial grass with shock absorption',
      'Bright LED floodlights with zero blind spots for night games',
      'Provides good cricket bats, tennis balls, and stumps for free',
      'Chilled energy drinks and mineral water available on-site'
    ],
    cons: [
      'Weekend hourly rate jumps from ₹800 to ₹1200 per hour',
      'Changing rooms and washrooms are poorly maintained',
      'Strict 60-minute buzzer; they turn off floodlights immediately on time',
      'Gets muddy around netting edges during heavy monsoon showers'
    ],
    reviews: [
      {
        id: 'rev-st-1',
        author: 'Surya Teja',
        branch: 'Mechanical',
        year: '3rd Year',
        rating: 5,
        type: 'positive',
        title: 'Best stress buster after internal exams',
        comment: 'We booked 2 hours for our section. Cost divided among 14 guys came to just ₹110 each. Totally worth the fun and sweat.',
        date: '3 days ago',
        verifiedStudent: true,
        likes: 27,
        tags: ['Great For Groups', 'Night Cricket']
      },
      {
        id: 'rev-st-2',
        author: 'Akhil K.',
        branch: 'CSE',
        year: '2nd Year',
        rating: 3,
        type: 'critical',
        title: 'Management is very rigid on timing',
        comment: 'Even if your last over has 2 balls left, the manager shuts off the high-beam lights right at 9:00 PM. Book 15 mins extra if you want a complete match.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 19,
        tags: ['Strict Timing Warning']
      }
    ],
    features: ['Floodlights', 'Free Gear', 'Drinks Stalls', 'Bike Parking']
  },

  // 4. KURNOOL - STUDY HUB & CENTRAL READING ROOM
  {
    id: 'kurnool-study-hub',
    name: 'Achievers 24/7 Air-Conditioned Study Hub & Library',
    category: 'study',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8240, 78.0350],
    distance_km: 1.2,
    rating: 4.6,
    review_count: 290,
    senior_review: "The sanctuary when noisy hostel corridors make semester prep impossible. Ergonomic chairs, super fast WiFi, and pin-drop silence. Only catch: charging sockets at some corner desks are loose.",
    senior_author: 'Sushmitha T.',
    senior_branch: 'AIML, 3rd Year',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    tag: '24/7 AC Study Cabin & High Speed WiFi',
    address: 'Opp. Medical College Road, Budhawara Peta, Kurnool',
    price_tier: '₹',
    opening_hours: '24 Hours Open',
    timing_tip: 'Claim the middle row cabins; corner cabins have weaker WiFi signal',
    activities: [
      'GATE, CAT, GRE & campus placement coding preparation',
      'All-nighter semester cramming during mid-exam weeks',
      'Online technical certifications & video lecture watching',
      'Group study discussion room (sound-proofed)'
    ],
    pros: [
      'Ice-cold AC and individual cabin partitions with reading lights',
      '150 Mbps fiber WiFi with backup UPS generator',
      'Purified water dispenser and microwave for packed food',
      'Daily, weekly, and monthly student subscription options'
    ],
    cons: [
      'Corner desk power sockets are loose; bring a 3-pin adapter',
      'Can get extremely full 2 weeks before semester exams',
      'No tea/coffee machine inside; must walk out to the main road',
      'Manager strictly bans phone calls even in whisper mode'
    ],
    reviews: [
      {
        id: 'rev-sh-1',
        author: 'Praneeth R.',
        branch: 'ECE',
        year: 'Final Year',
        rating: 5,
        type: 'positive',
        title: 'Cleared GATE because of this quiet space',
        comment: 'Hostel was way too chaotic with PUBG and music. Spent 6 months here from 8 AM to 8 PM. Zero distractions and decent crowd.',
        date: '1 month ago',
        verifiedStudent: true,
        likes: 62,
        tags: ['GATE Prep', 'Peaceful']
      },
      {
        id: 'rev-sh-2',
        author: 'Mounika C.',
        branch: 'IT',
        year: '2nd Year',
        rating: 3,
        type: 'critical',
        title: 'Too cold and strict security',
        comment: 'The AC temperature is locked at 20°C and they refuse to increase it. Bring a jacket or hoodie even in peak summer.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 21,
        tags: ['Bring Hoodie', 'AC Warning']
      }
    ],
    features: ['24/7 Power', '150Mbps WiFi', 'Cabin Desks', 'Soundproof Rooms']
  },

  // 5. KURNOOL - KRITUNGA RESTAURANT
  {
    id: 'kritunga-restaurant',
    name: 'Kritunga Restaurant (Rayalaseema Spice Hub)',
    category: 'food',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8270, 78.0390],
    distance_km: 1.3,
    rating: 4.5,
    review_count: 980,
    senior_review: "Famed pot biryani and spicy Rayalaseema ragi mudda with naatu kodi. Very spicy for outstation freshers! Avoid peak 1:30 PM Sunday crowd unless you pre-book.",
    senior_author: 'Harshitha M.',
    senior_branch: 'CSE, 3rd Year',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    tag: 'Spicy Pot Biryani & Ragi Mudda',
    address: 'Near Collector Office Road, Kurnool',
    price_tier: '₹₹',
    opening_hours: '11:30 AM - 11:00 PM',
    timing_tip: 'Reach by 12:45 PM for lunch to skip the 40-minute Sunday line',
    activities: [
      'Batch birthday biryani parties & placement treats',
      'Authentic Rayalaseema spice challenge with friends',
      'Sunday special lunch with visiting parents',
      'Late dinner takeaway for hostel movie nights'
    ],
    pros: [
      'Massive portions; one pot biryani easily feeds 2 hungry students',
      'Authentic Rayalaseema spice levels (not diluted for tourists)',
      'Quick table service once seated',
      'Reliable AC dining hall'
    ],
    cons: [
      'Way too spicy for freshers from outside AP; order mild if sensitive',
      '40+ min waiting times on Saturday/Sunday afternoons',
      'Parking on Collector Office road is heavily ticketed by traffic police',
      'Water bottles billed at high hotel rates'
    ],
    reviews: [
      {
        id: 'rev-kr-1',
        author: 'Kalyan B.',
        branch: 'Civil',
        year: '4th Year',
        rating: 5,
        type: 'positive',
        title: 'The Rayalaseema Natu Kodi is pure fire',
        comment: 'If you want real Kurnool food, this is it. Pair the Pot Biryani with Gongura Chicken. Unmatched flavor in the whole district.',
        date: '4 days ago',
        verifiedStudent: true,
        likes: 38,
        tags: ['Authentic Spice', 'Huge Portions']
      },
      {
        id: 'rev-kr-2',
        author: 'Rahul Sharma',
        branch: 'CSE',
        year: '1st Year',
        rating: 2,
        type: 'critical',
        title: 'Brutally spicy - had stomach ache next day',
        comment: 'North Indian freshers beware! Even their "medium spicy" biryani has red chili overload. Waiters were also rushing us to vacate the table during lunch rush.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 47,
        tags: ['Too Spicy', 'Rushed Service']
      }
    ],
    features: ['Pot Biryani', 'AC Dining', 'Card/UPI', 'Takeaway']
  },

  // 6. KURNOOL - SVC CINEMAS
  {
    id: 'svc-cinemas',
    name: 'SVC Cinemas (Sravani & Vandana)',
    category: 'theatres',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8310, 78.0450],
    distance_km: 2.0,
    rating: 4.6,
    review_count: 1150,
    senior_review: "The king of first-day-first-show mass movie whistles! Massive screen and deafening Dolby Atmos sound. Cons: Popcorn & soda are ridiculously overpriced, and bike parking exit is chaos.",
    senior_author: 'Praneeth Reddy',
    senior_branch: 'ECE, 4th Year',
    image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    tag: '4K Dolby Atmos & Fan Craze',
    address: 'Station Road, Near Railway Junction, Kurnool',
    price_tier: '₹₹',
    opening_hours: '10:30 AM - 01:30 AM',
    timing_tip: 'Park in the secondary cellar to avoid the 25-minute exit jam post-movie',
    activities: [
      'First-day-first-show college mass whistling & paper confetti',
      'Friday night movie escapes with hostel wing mates',
      'Budget matinee show tickets on college holidays',
      'Interval samosa & cool drink munching'
    ],
    pros: [
      'Huge 4K projection screens with thunderous base Atmos audio',
      'Comfortable pushback and recliner seating in upper tiers',
      'Ticket prices are student reasonable (₹130 - ₹180)',
      'Located very close to Kurnool Railway Junction'
    ],
    cons: [
      'Snack counter charges ₹180 for basic popcorn and ₹90 for fountain coke',
      'Security strictly confiscates even personal water bottles at gate',
      'Exiting the bike parking cellar takes 20-30 mins after packed show',
      'Crowd gets rowdy with whistles during mass hero introduction scenes'
    ],
    reviews: [
      {
        id: 'rev-svc-1',
        author: 'Sai Charan',
        branch: 'Mechanical',
        year: '4th Year',
        rating: 5,
        type: 'positive',
        title: 'Unbeatable theatre vibe for big releases',
        comment: 'Watching Telugu biggies here on release day is a core college memory. The sound system shakes your seat. Go for upper balcony.',
        date: '6 days ago',
        verifiedStudent: true,
        likes: 51,
        tags: ['Mass Atmosphere', 'Great Audio']
      },
      {
        id: 'rev-svc-2',
        author: 'Ananya S.',
        branch: 'CSE',
        year: '2nd Year',
        rating: 2,
        type: 'critical',
        title: 'Ear-splitting volume and food extortion',
        comment: 'Decibel levels were painfully high during action scenes. Also, they took away my sealed water bottle and forced me to buy ₹40 mineral water inside. Not cool.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 43,
        tags: ['Loud Audio Warning', 'Food Overpriced']
      }
    ],
    features: ['4K Laser', 'Dolby Atmos', 'Recliners', 'Snack Bar']
  },

  // 7. KURNOOL - KONDA REDDY BURUJU
  {
    id: 'konda-reddy-fort',
    name: 'Konda Reddy Buruju (Historical Fort & Plaza)',
    category: 'hangouts',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8288, 78.0416],
    distance_km: 1.6,
    rating: 4.7,
    review_count: 1420,
    senior_review: "Iconic Kurnool symbol. Breezy terrace views and amazing roadside street food across the circle. Cons: High traffic fumes during afternoon hours and no shade on the fort top.",
    senior_author: 'Sai Teja K.',
    senior_branch: 'Mechanical, Final Year',
    image_url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    tag: 'Historical Monument & Evening Adda',
    address: 'Old City, Konda Reddy Fort Circle, Kurnool',
    price_tier: 'Free',
    opening_hours: '06:00 AM - 08:30 PM',
    timing_tip: 'Climb up between 5:30 PM and 6:45 PM for golden hour lighting',
    activities: [
      'Sunset photography and college gang reel shoots',
      'Roadside spicy mirchi bajji and uggani eating challenge',
      'Evening history walk along ancient ramparts',
      'Hostel batch photoshoot for farewell albums'
    ],
    pros: [
      'Zero entry ticket fee; open access heritage monument',
      'Spectacular 360-degree panoramic view of Kurnool old town',
      'Surrounded by famous roadside bajji stalls and sugarcane juice carts',
      'Gentle cool evening breeze even on hot days'
    ],
    cons: [
      'No shade or roof on the top floor; boiling hot before 4:30 PM',
      'Fort circle has heavy traffic noise and vehicular exhaust fumes',
      'Staircase is steep and narrow; watch your footing',
      'Occasional beggars and vendors pester students at the ground entrance'
    ],
    reviews: [
      {
        id: 'rev-krf-1',
        author: 'Dinesh V.',
        branch: 'Civil',
        year: 'Final Year',
        rating: 5,
        type: 'positive',
        title: 'Must visit with your fresher friends',
        comment: 'Every newcomer to Kurnool has to take a photo in front of the Buruju. Have the special uggani bajji right across the road for ₹40 total.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 39,
        tags: ['Iconic Landmark', 'Street Food']
      },
      {
        id: 'rev-krf-2',
        author: 'Keerthi P.',
        branch: 'ECE',
        year: '3rd Year',
        rating: 3,
        type: 'mixed',
        title: 'Lovely view, needs better municipal maintenance',
        comment: 'The view at sunset is gorgeous, but some visitors throw empty plastic bottles around the rampart edges. Go strictly after 5:30 PM.',
        date: '3 weeks ago',
        verifiedStudent: true,
        likes: 22,
        tags: ['Sunset Only', 'Cleanliness Warning']
      }
    ],
    features: ['Historical Site', 'Free Entry', 'Street Food', 'Sunset View']
  },

  // 8. KURNOOL - GGH EMERGENCY
  {
    id: 'kurnool-ggh',
    name: 'Kurnool Govt General Hospital (GGH)',
    category: 'hospitals',
    city: 'Kurnool',
    region: 'Rayalaseema',
    coordinates: [15.8245, 78.0360],
    distance_km: 1.1,
    rating: 4.2,
    review_count: 530,
    senior_review: "The primary 24/7 medical lifeline. Free emergency treatment and resident KMC doctors. Cons: High patient load in general OPD and long waiting queues during daytime.",
    senior_author: 'Dr. Keerthi (Intern)',
    senior_branch: 'KMC Kurnool',
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    tag: '24/7 Casualty & Teaching Hospital',
    address: 'Hospital Road, Budhawara Peta, Kurnool',
    price_tier: 'Free',
    opening_hours: '24 Hours Open',
    timing_tip: 'For emergencies, head directly to North Gate Casualty entry',
    activities: [
      '24/7 emergency casualty & accidental trauma care',
      'Free blood group testing & college donor drives',
      'Subsidized government pharmacy medicine pickup',
      'Dog bite & tetanus emergency injections'
    ],
    pros: [
      'Round-the-clock casualty wing with senior professors on call',
      '100% free emergency care and generic medication',
      'Fully equipped blood bank and ICU facility',
      'Direct tie-up with student welfare for college injuries'
    ],
    cons: [
      'Daytime outpatient department is overcrowded with district patients',
      'Sanitation in public wards is basic; private rooms rarely available',
      'Diagnostic test reports can take several hours due to government backlog',
      'Keep your college ID and Aadhaar card handy to speed up intake'
    ],
    reviews: [
      {
        id: 'rev-ggh-1',
        author: 'Manoj Kumar',
        branch: 'Mechanical',
        year: '2nd Year',
        rating: 5,
        type: 'positive',
        title: 'Treated my hostel buddy with instant care',
        comment: 'My roommate had high dengue fever at 2 AM. Casualty doctors admitted him immediately, ran IV drip, and charged ₹0. Very dedicated junior doctors.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 41,
        tags: ['24/7 Lifesaver', 'Free Care']
      },
      {
        id: 'rev-ggh-2',
        author: 'Suresh T.',
        branch: 'EEE',
        year: '3rd Year',
        rating: 3,
        type: 'critical',
        title: 'Avoid regular OPD if minor issue',
        comment: 'If it is just a mild cough or headache, visit a local private clinic. In GGH OPD you have to stand in line for 2 hours just for the token counter.',
        date: '1 month ago',
        verifiedStudent: true,
        likes: 25,
        tags: ['Long Queue Warning']
      }
    ],
    features: ['24/7 Casualty', 'Blood Bank', 'Free Treatment', 'Ambulance']
  },

  // 9. VIZAG - RK BEACH HANGOUT & WATERSPORTS
  {
    id: 'vizag-rk-beach',
    name: 'Ramakrishna (RK) Beach & Coastal Promenade',
    category: 'hangouts',
    city: 'Visakhapatnam',
    region: 'Coastal Andhra',
    coordinates: [17.7142, 83.3236],
    distance_km: 2.1,
    rating: 4.8,
    review_count: 2400,
    senior_review: "The soul of college life in Vizag. Sunrise jogs, midnight breezes, and Submarine museum visits. Warning: Never enter the water; rip currents are extremely dangerous here!",
    senior_author: 'Abhinav Rao',
    senior_branch: 'AU Mechanical, Final Year',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tag: 'Coastal Breeze & Midnight Promenade',
    address: 'Beach Road, RK Beach, Visakhapatnam, AP 530002',
    price_tier: 'Free',
    opening_hours: 'Open 24 Hours',
    timing_tip: 'Strictly visit Beach Road between 5 AM - 7:30 AM (Vehicle-free morning)',
    activities: [
      'Early morning coastal jogging on vehicle-free Beach Road',
      'Kursura Submarine & TU 142 Aircraft Museum exploration',
      'Midnight Maggi & roasted corn (bhutta) eating with friends',
      'Beachside acoustic guitar jam sessions on the sand'
    ],
    pros: [
      'Stretches for miles with paved promenades and streetlights',
      'Car-free morning hours for fitness and cycling enthusiasts',
      'Hundreds of cheap snack stalls (muri mixture, corn, ice cream)',
      'High police patrolling makes it relatively safe even at 11 PM'
    ],
    cons: [
      'STRICT DANGER: Swimming is prohibited due to treacherous rip currents',
      'Severe parking shortage on weekend evenings after 6 PM',
      'Humid sticky sea air can damage uncovered laptops/electronics',
      'Littering by weekend tourist crowds on Sundays'
    ],
    reviews: [
      {
        id: 'rev-rkb-1',
        author: 'Meghana K.',
        branch: 'AU CSE',
        year: '3rd Year',
        rating: 5,
        type: 'positive',
        title: 'Morning Beach Road walk is therapeutic',
        comment: 'Whenever semester stress piles up, sitting on the rocks with sea breeze fixes everything. Best place in Andhra Pradesh.',
        date: '3 days ago',
        verifiedStudent: true,
        likes: 67,
        tags: ['Iconic Vizag', 'Stress Buster']
      },
      {
        id: 'rev-rkb-2',
        author: 'Karthik V.',
        branch: 'GITAM ECE',
        year: '2nd Year',
        rating: 3,
        type: 'critical',
        title: 'Do not eat seafood from unhygienic roadside carts',
        comment: 'Beware of roadside prawn and fish fry stalls near the fishing harbor side; two of my hostel mates got food poisoning. Stick to roasted corn and branded kiosks.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 38,
        tags: ['Health Warning']
      }
    ],
    features: ['Sea View', 'Submarine Museum', 'Jogging Track', 'Street Food']
  },

  // 10. VIZAG - SIRIPURAM FOOD & CAFE STREET
  {
    id: 'vizag-siripuram-eateries',
    name: 'Siripuram Student Food Street & Cafes',
    category: 'food',
    city: 'Visakhapatnam',
    region: 'Coastal Andhra',
    coordinates: [17.7240, 83.3150],
    distance_km: 1.4,
    rating: 4.6,
    review_count: 890,
    senior_review: "The epicenter of AU student bites. Dosa carts, shawarma joints, and budget student coffee houses. Great vibes, but bike towing is aggressive on the main road.",
    senior_author: 'Priya N.',
    senior_branch: 'AU Law, 2nd Year',
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tag: 'Shawarma, Ghee Dosa & Chai Adda',
    address: 'Siripuram Junction, Near Dutt Island, Visakhapatnam',
    price_tier: '₹₹',
    opening_hours: '07:30 AM - 11:30 PM',
    timing_tip: 'Park inside Dutt Island cellar; traffic cops tow bikes parked on curb',
    activities: [
      'Late evening rumali roti chicken shawarma gorging',
      'Ghee karam dosa tasting at roadside tiffin bandis',
      'Group assignment discussions at student coffee bistros',
      'Ice cream & waffle treats after college seminars'
    ],
    pros: [
      'Diverse cuisines from Andhra tiffins to Arabian shawarmas',
      'Walking distance from AU campus gates',
      'Open late until 11:30 PM for hostel dinner runs',
      'Budget friendly options starting from ₹35'
    ],
    cons: [
      'Traffic police actively tow two-wheelers parked on yellow curb lines',
      'Noise and vehicle smoke during peak 7 PM - 9 PM dinner rush',
      'Some small stalls lack clean handwashing setups',
      'High seating crunch during weekend evenings'
    ],
    reviews: [
      {
        id: 'rev-siri-1',
        author: 'Tarun G.',
        branch: 'GVP Mech',
        year: '4th Year',
        rating: 5,
        type: 'positive',
        title: 'Best spicy chicken shawarma in town',
        comment: 'Al-Bake shawarma counter here gives thick mayo and authentic pickled veggies for ₹110. Great student dinner.',
        date: '5 days ago',
        verifiedStudent: true,
        likes: 31,
        tags: ['Student Favorite', 'Shawarma']
      },
      {
        id: 'rev-siri-2',
        author: 'Swathi M.',
        branch: 'AU Arts',
        year: '1st Year',
        rating: 2,
        type: 'critical',
        title: 'Bike got towed while having coffee!',
        comment: 'Paid ₹500 fine to traffic police because I parked beside the medical shop for 15 minutes. Always use the authorized parking lane.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 49,
        tags: ['Parking Scam/Warning']
      }
    ],
    features: ['Shawarma', 'Dosa Bandis', 'Cafes', 'Late Hours']
  },

  // 11. VIJAYAWADA - BENZ CIRCLE FOOD & MULTIPLEX
  {
    id: 'vijayawada-benz-circle',
    name: 'Benz Circle Hangout Hub & Trendset Mall',
    category: 'hangouts',
    city: 'Vijayawada',
    region: 'Coastal Andhra',
    coordinates: [16.5015, 80.6540],
    distance_km: 2.5,
    rating: 4.6,
    review_count: 1850,
    senior_review: "The buzzing heartbeat of Vijayawada. PVP Square, multiplexes, street tiffins, and gaming lounges. Warning: Summer afternoon heat here is legendary; stay in AC malls till 5 PM.",
    senior_author: 'Chaitanya V.',
    senior_branch: 'VRSEC IT, Final Year',
    image_url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    tag: 'Malls, Food Courts & Gaming Hub',
    address: 'Benz Circle, MG Road, Vijayawada, AP 520010',
    price_tier: '₹₹',
    opening_hours: '10:00 AM - 11:00 PM',
    timing_tip: 'Visit Trendset Mall gaming zone on Tuesdays for 50% discount on bowling',
    activities: [
      'Weekend movie marathons at INOX Trendset / Cinepolis',
      'Arcade gaming, bowling, and VR simulation matches',
      'Food court group lunches (Biryani, burgers, pasta)',
      'Fashion retail shopping for college fest outfits'
    ],
    pros: [
      'Central transit hub with buses to KL University, VRSEC, and Amaravati',
      'Air-conditioned refuge from Vijayawada scorching summer humidity',
      'Multiple cinema screens and gaming options under one roof',
      'Clean washrooms, ATMs, and reliable cellular coverage'
    ],
    cons: [
      'Traffic bottleneck during office hours 5:30 PM - 7:30 PM',
      'Mall food court prices are 3x higher than local street stalls',
      'Paid mall parking adds up if you stay multiple hours',
      'Weekend queues for lifts and theatre ticket collection'
    ],
    reviews: [
      {
        id: 'rev-benz-1',
        author: 'Hemanth K.',
        branch: 'KL Univ CSE',
        year: '3rd Year',
        rating: 5,
        type: 'positive',
        title: 'Our weekend hangout temple',
        comment: 'Take the college bus to Benz Circle on Saturday, watch a matinee, play bowling, and finish with Babai Hotel idlis. Perfection.',
        date: '4 days ago',
        verifiedStudent: true,
        likes: 45,
        tags: ['Weekend Escape', 'Bowling & Movies']
      },
      {
        id: 'rev-benz-2',
        author: 'Divya N.',
        branch: 'VRSEC ECE',
        year: '2nd Year',
        rating: 3,
        type: 'mixed',
        title: 'Expensive food courts, eat outside first',
        comment: 'Don’t buy meals inside the mall food court unless you want to blow ₹400 on a burger combo. Eat at local tiffin places outside and just come in for movies.',
        date: '3 weeks ago',
        verifiedStudent: true,
        likes: 33,
        tags: ['Budget Warning']
      }
    ],
    features: ['Multiplex', 'Bowling', 'Food Court', 'Metro Transit']
  },

  // 12. AMARAVATI / MANGALAGIRI - STUDENTS TURF & DHABA
  {
    id: 'amaravati-capital-turf',
    name: 'Amaravati Champions Turf & Sports Hub',
    category: 'sports',
    city: 'Amaravati',
    region: 'Capital Region',
    coordinates: [16.5050, 80.4920],
    distance_km: 1.8,
    rating: 4.7,
    review_count: 320,
    senior_review: "The primary sports outlet for SRM AP & VIT-AP freshers. Box cricket, badminton, and post-match highway dhaba food. Essential to book slots in advance as both campuses compete for timings.",
    senior_author: 'Shubham Tiwari',
    senior_branch: 'SRM AP AI & Data Science, 3rd Year',
    image_url: 'https://images.unsplash.com/photo-1529900241460-70f951e73792?auto=format&fit=crop&w=800&q=80',
    tag: 'SRM & VIT-AP Inter-College Matches',
    address: 'Neerukonda - Inavolu Road, Amaravati, AP 522240',
    price_tier: '₹₹',
    opening_hours: '05:30 AM - 11:30 PM',
    timing_tip: 'Evening 8 PM slot has the best cool breeze away from campus heat',
    activities: [
      'SRM vs VIT-AP weekend box cricket tournaments',
      'Hostel batch badminton doubles championships',
      'Highway dhaba dinner runs for chicken kolhapuri & tandoori naan',
      'Fitness sprint training on professional synthetic grass'
    ],
    pros: [
      'Strategic location midway between SRM AP and VIT-AP campuses',
      'Clean floodlit synthetic pitch with high netting boundary',
      'Adjacent highway dhabas stay open late with hot tandoor food',
      'Provides bats, balls, and bibs for team matches'
    ],
    cons: [
      'Both universities book out peak evening slots very quickly',
      'Cab/auto fare to the turf is high if you do not have your own bike',
      'Dusty surroundings during windy dry seasons',
      'No card machine; UPI payments only'
    ],
    reviews: [
      {
        id: 'rev-act-1',
        author: 'Arunav G.',
        branch: 'VIT-AP CSE',
        year: '2nd Year',
        rating: 5,
        type: 'positive',
        title: 'Best turf for campus hostel rivalries',
        comment: 'We play here every Sunday night. Turf quality is top tier and floodlights are super bright. The dhaba right next door has awesome butter chicken.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 39,
        tags: ['Great Turf', 'Inter-College Games']
      },
      {
        id: 'rev-act-2',
        author: 'Nikhil S.',
        branch: 'SRM AP ECE',
        year: '1st Year',
        rating: 3,
        type: 'critical',
        title: 'Auto drivers overcharge students',
        comment: 'If you take an auto from SRM hostel gate, they ask for ₹150 for just a 2km ride. Form a group of 4 or cycle down to avoid getting ripped off.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 28,
        tags: ['Auto Fare Warning']
      }
    ],
    features: ['Synthetic Grass', 'Floodlights', 'Highway Dhaba', 'Free Equipment']
  },

  // 13. TIRUPATI - CHANDRAGIRI FORT & SUNSET
  {
    id: 'tirupati-chandragiri-fort',
    name: 'Chandragiri Fort & Light Show Palace',
    category: 'hangouts',
    city: 'Tirupati',
    region: 'Rayalaseema',
    coordinates: [13.5835, 79.3175],
    distance_km: 11.2,
    rating: 4.6,
    review_count: 1650,
    senior_review: "The ultimate weekend bike ride spot from SVU and IIT Tirupati. Vijayanagara palace architecture, green manicured gardens, and peaceful breeze. Bring your student ID for 50% ASI ticket discount!",
    senior_author: 'Bhavani Shankar',
    senior_branch: 'SVU Physics, Final Year',
    image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tag: 'Historical Fort, Raja Mahal & Sound Show',
    address: 'Chandragiri, Tirupati District, AP 517101',
    price_tier: '₹',
    opening_hours: '08:00 AM - 07:30 PM',
    timing_tip: 'Show your college ID card at ticket counter for student concession',
    activities: [
      'Weekend Royal Palace exploration and heritage architecture study',
      'Picnic under shady trees with hostel friend group',
      'Sound & Light historical laser show in the evening',
      'Scenic motorcycle and scooter cruise on scenic Chandragiri highway'
    ],
    pros: [
      'Very clean lawns, peaceful ponds, and historic Rani Mahal architecture',
      'Student ticket is just ₹15 with valid college identity card',
      'Evening laser sound and light show narrates imperial Vijayanagar history',
      'Great photography backdrop for college camera clubs'
    ],
    cons: [
      'Monkeys on the upper hill path are bold; keep snacks hidden in bags',
      '11km ride from central Tirupati; public RTC buses are infrequent on Sundays',
      'No proper food court inside; only packaged chips and water kiosks',
      'Palace museum closes strictly at 5:00 PM before the light show'
    ],
    reviews: [
      {
        id: 'rev-cg-1',
        author: 'Srikant N.',
        branch: 'IIT Tirupati Civil',
        year: '3rd Year',
        rating: 5,
        type: 'positive',
        title: 'Best peaceful getaway from campus deadlines',
        comment: 'Campus gets monotonous. Rented bikes with batchmates and rode here. Sitting by the palace pond watching the sunset is 10/10.',
        date: '5 days ago',
        verifiedStudent: true,
        likes: 44,
        tags: ['Scenic Getaway', 'Must Visit']
      },
      {
        id: 'rev-cg-2',
        author: 'Varun Reddy',
        branch: 'SVU Mechanical',
        year: '2nd Year',
        rating: 3,
        type: 'critical',
        title: 'Watch out for aggressive monkeys!',
        comment: 'A monkey snatched my friend’s soft drink bottle right from his hand near the hill stairs. Keep food inside your backpack.',
        date: '3 weeks ago',
        verifiedStudent: true,
        likes: 37,
        tags: ['Monkey Warning']
      }
    ],
    features: ['Historic Palace', 'Laser Show', 'Lawns', 'Student Discount']
  },

  // 14. GUNTUR - BRODIPET TIFFIN & JUICE CORNER
  {
    id: 'guntur-brodipet-tiffins',
    name: 'Brodipet Famous Ghee Dosa & Fruit Juice Adda',
    category: 'food',
    city: 'Guntur',
    region: 'Coastal Andhra',
    coordinates: [16.3020, 80.4410],
    distance_km: 1.9,
    rating: 4.8,
    review_count: 1200,
    senior_review: "The tiffin capital of Guntur! Ghee karam 70mm dosa, upma pesara, and thick badam milk. Insanely crowded after 7 PM, but tastes heavenly.",
    senior_author: 'Sai Krishna',
    senior_branch: 'RVR & JC CSE, Final Year',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    tag: 'Ghee Karam 70mm Dosa & Badam Milk',
    address: '4th Lane, Brodipet, Guntur, AP 522002',
    price_tier: '₹',
    opening_hours: '06:30 AM - 11:00 PM',
    timing_tip: 'Order the Ghee Karam Upma Dosa; pay cash/UPI at counter first',
    activities: [
      'Early morning hot tiffin breakfast before campus bus',
      'Evening badam milk & fresh seasonal fruit juice recharges',
      'Late night hostel dinner runs for crispy ghee roasts',
      'Meeting college friends from other Guntur colleges'
    ],
    pros: [
      'Legendary Andhra breakfast quality with generous ghee and podi',
      'Very affordable prices (Dosaball for ₹45 - ₹60)',
      'Multiple juice and seasonal shake shops right next door',
      'Fresh hot chutney served continuously from steel dispensers'
    ],
    cons: [
      'Zero parking space; lanes are clogged with scooters and autos',
      'You have to eat standing on the pavement during rush hours',
      'Heavy ghee content can be rich if you have a sensitive stomach',
      'Chutneys can be very spicy for non-locals'
    ],
    reviews: [
      {
        id: 'rev-brod-1',
        author: 'Venkat Rao',
        branch: 'RVR & JC EEE',
        year: '4th Year',
        rating: 5,
        type: 'positive',
        title: 'Nothing compares to Brodipet Karam Dosa',
        comment: 'Crispy on the outside, soft upma inside, drenched in red chutney podi. One dosa keeps you full till 3 PM.',
        date: '1 week ago',
        verifiedStudent: true,
        likes: 58,
        tags: ['Iconic Taste', 'Super Value']
      },
      {
        id: 'rev-brod-2',
        author: 'Kavya S.',
        branch: 'Vignan Univ',
        year: '2nd Year',
        rating: 3,
        type: 'critical',
        title: 'Huge crowd and no hand wash facility',
        comment: 'Food is delicious, but eating standing in the crowd with scooters honking right behind your back is stressful. Carry your own hand sanitizer.',
        date: '2 weeks ago',
        verifiedStudent: true,
        likes: 31,
        tags: ['Crowd Warning', 'Standing Only']
      }
    ],
    features: ['Ghee Dosa', 'Badam Milk', 'Fast Service', 'Budget Tiffins']
  }
];
