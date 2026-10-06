import { College } from '../types';

export const COLLEGES: College[] = [
  // KURNOOL REGION
  {
    id: 'gprec',
    name: 'G. Pulla Reddy Engineering College (GPREC)',
    shortName: 'GPREC',
    city: 'Kurnool',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    coordinates: [15.8282, 78.0267],
    tagline: 'Autonomous NBA Tier-1 Engineering Campus',
    established: 1984,
    address: 'Near Pasupula Village, Nandyal Road, Kurnool, AP 518007',
    popularActivities: ['Gate Chai Adda', 'Campus Cricket League', 'Workshop Project Printing', 'Konda Reddy Evening Treks']
  },
  {
    id: 'kmc',
    name: 'Kurnool Medical College (KMC)',
    shortName: 'KMC',
    city: 'Kurnool',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    coordinates: [15.8235, 78.0354],
    tagline: 'Premier Medical College & GGH Teaching Hospital',
    established: 1956,
    address: 'Budhawara Peta, Kurnool, AP 518002',
    popularActivities: ['Clinical Night Canteen', 'Medical Fest Euphoria', 'Library All-Nighter', 'GGH Emergency Rounds']
  },
  {
    id: 'ru',
    name: 'Rayalaseema University',
    shortName: 'RU',
    city: 'Kurnool',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    coordinates: [15.8038, 78.0772],
    tagline: 'State University Campus & Research Hub',
    established: 2008,
    address: 'Pasupula Village, Nandyal Road, Kurnool, AP 518007',
    popularActivities: ['Central Library Reading', 'Inter-College Athletics', 'Sunset Walk by Canal', 'University Canteen Tiffins']
  },

  // VISAKHAPATNAM REGION
  {
    id: 'au-vizag',
    name: 'Andhra University (AU)',
    shortName: 'Andhra Univ',
    city: 'Visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    coordinates: [17.7289, 83.3225],
    tagline: 'Historic NAAC A++ Coastal University',
    established: 1926,
    address: 'Waltair Junction, Visakhapatnam, AP 530003',
    popularActivities: ['RK Beach Sunrise Chilling', 'AU Golden Jubilee Ground Cricket', 'Siripuram Coffee Culture', 'Kailasagiri Night Drive']
  },
  {
    id: 'gitam-vizag',
    name: 'GITAM Deemed to be University',
    shortName: 'GITAM Vizag',
    city: 'Visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    coordinates: [17.7816, 83.3776],
    tagline: 'Premier Beachfront Technology & Management Campus',
    established: 1980,
    address: 'Rushikonda, Visakhapatnam, AP 530045',
    popularActivities: ['Rushikonda Surfing & Beach Volleyball', 'Subway & Nescafe Kiosk Breaks', 'Hostel Rooftop Jams', 'GITAM Fest Pramana']
  },
  {
    id: 'gvp-vizag',
    name: 'Gayatri Vidya Parishad College of Engg (GVP)',
    shortName: 'GVPCOE',
    city: 'Visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    coordinates: [17.8188, 83.3440],
    tagline: 'Top Autonomous Engineering Institution',
    established: 1996,
    address: 'Madhurawada, Visakhapatnam, AP 530048',
    popularActivities: ['Madhurawada Street Food', 'Indoor Badminton Tournaments', 'Hackathon Coding Nights', 'Kambalakonda Trekking']
  },

  // VIJAYAWADA & AMARAVATI REGION
  {
    id: 'klu-vijayawada',
    name: 'K L Deemed to be University (KLEF)',
    shortName: 'KL University',
    city: 'Vijayawada',
    district: 'Guntur / Vijayawada',
    state: 'Andhra Pradesh',
    coordinates: [16.4422, 80.6225],
    tagline: 'Green Campus NAAC A++ Deemed University',
    established: 1980,
    address: 'Green Fields, Vaddeswaram, AP 522502',
    popularActivities: ['Indoor Sports Arena & Gym', 'Central Canteen Dosa Corner', 'Samyak National Youth Fest', 'Kanaka Durga Temple Outing']
  },
  {
    id: 'vrsec-vijayawada',
    name: 'Velagapudi Ramakrishna Siddhartha Engg (VRSEC)',
    shortName: 'VR Siddhartha',
    city: 'Vijayawada',
    district: 'Krishna',
    state: 'Andhra Pradesh',
    coordinates: [16.4851, 80.6938],
    tagline: 'First Private Engineering College in AP',
    established: 1977,
    address: 'Kanuru, Vijayawada, AP 520007',
    popularActivities: ['Benz Circle Food Hangouts', 'Auto Nagar Dhabas', 'PVP Square Mall Movies', 'Bhavani Island Weekend Picnic']
  },
  {
    id: 'srm-amaravati',
    name: 'SRM University AP',
    shortName: 'SRM AP',
    city: 'Amaravati',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    coordinates: [16.5126, 80.4870],
    tagline: 'Next-Gen Research University of AP Capital',
    established: 2017,
    address: 'Neerukonda, Mangalagiri Mandal, Amaravati, AP 522240',
    popularActivities: ['Campus Food Court Hangouts', 'Robotics & AI Labs', 'Mangalagiri Cotton & Panakala Swamy Trip', 'Inter-Hostel Football Turf']
  },
  {
    id: 'vit-ap',
    name: 'VIT-AP University',
    shortName: 'VIT-AP',
    city: 'Amaravati',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    coordinates: [16.4965, 80.4998],
    tagline: 'World-Class Technical Campus at Inavolu',
    established: 2017,
    address: 'Beside AP Secretariat, Inavolu, Amaravati, AP 522237',
    popularActivities: ['Night Canteen Maggi & Parathas', 'VTAPP Cultural Fest', 'Gym & Table Tennis Matches', 'Vijayawada Weekend Bus Excursions']
  },

  // TIRUPATI REGION
  {
    id: 'svu-tirupati',
    name: 'Sri Venkateswara University (SVU)',
    shortName: 'SVU Tirupati',
    city: 'Tirupati',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    coordinates: [13.6288, 79.4005],
    tagline: 'Historic University under the Seven Hills',
    established: 1954,
    address: 'SVU Campus, Tirupati, AP 517502',
    popularActivities: ['Alipiri Footpath Hiking', 'Chandragiri Fort Sunset', 'SVU Stadium Evening Jog', 'Seshachalam Hills Photography']
  },
  {
    id: 'iit-tirupati',
    name: 'Indian Institute of Technology Tirupati (IIT-T)',
    shortName: 'IIT Tirupati',
    city: 'Tirupati',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    coordinates: [13.7088, 79.5960],
    tagline: 'Institute of National Importance',
    established: 2015,
    address: 'Yerpedu, Tirupati District, AP 517619',
    popularActivities: ['Tech Fest Tirutsava', 'Yerpedu Highway Dhabas', 'Night Astro Club Stargazing', 'Tirumala Darshan Outing']
  },

  // KAKINADA & GODAVARI REGION
  {
    id: 'jntuk-kakinada',
    name: 'JNTU College of Engineering Kakinada',
    shortName: 'JNTUK',
    city: 'Kakinada',
    district: 'Kakinada',
    state: 'Andhra Pradesh',
    coordinates: [16.9806, 82.2415],
    tagline: 'Flagship Technological University Campus',
    established: 1946,
    address: 'Nagarnamallavaram Road, Kakinada, AP 533003',
    popularActivities: ['Kakinada Beach Road Chai', 'Subbayya Gari Hotel Meals', 'Encore Cultural Fest', 'Coringa Mangrove Forest Boating']
  },

  // ANANTAPUR REGION
  {
    id: 'jntua-anantapur',
    name: 'JNTU College of Engineering Anantapur',
    shortName: 'JNTUA',
    city: 'Anantapur',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    coordinates: [14.6542, 77.6083],
    tagline: 'Historic Engineering Campus in Rayalaseema',
    established: 1946,
    address: 'Sir Mokshagundam Vishveshwariah Road, Anantapur, AP 515002',
    popularActivities: ['Clock Tower Street Food', 'ISKCON Temple Evening Calm', 'Campus Basketball Tournaments', 'Lepakshi Weekend Trip']
  },

  // GUNTUR REGION
  {
    id: 'rvrjc-guntur',
    name: 'RVR & JC College of Engineering',
    shortName: 'RVR & JC',
    city: 'Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    coordinates: [16.2570, 80.3235],
    tagline: 'Reputed Autonomous Technical Institute',
    established: 1985,
    address: 'Chandramoulipuram, Chowdavaram, Guntur, AP 522019',
    popularActivities: ['Brodipet Tiffins & Juice', 'Chowdavaram Highway Chai', 'College Fest Color Splash', 'Uppalapadu Bird Sanctuary Visit']
  }
];

export const DEFAULT_COLLEGE = COLLEGES[0];

// Prominent AP Cities and Hubs for rapid search autocomplete
export const AP_MAJOR_HUBS = [
  { name: 'Kurnool', district: 'Kurnool', coordinates: [15.8281, 78.0373] as [number, number] },
  { name: 'Visakhapatnam (Vizag)', district: 'Visakhapatnam', coordinates: [17.6868, 83.2185] as [number, number] },
  { name: 'Vijayawada', district: 'NTR', coordinates: [16.5062, 80.6480] as [number, number] },
  { name: 'Amaravati (Capital)', district: 'Guntur', coordinates: [16.5131, 80.5165] as [number, number] },
  { name: 'Tirupati', district: 'Tirupati', coordinates: [13.6288, 79.4192] as [number, number] },
  { name: 'Guntur', district: 'Guntur', coordinates: [16.3067, 80.4365] as [number, number] },
  { name: 'Kakinada', district: 'Kakinada', coordinates: [16.9891, 82.2475] as [number, number] },
  { name: 'Rajahmundry', district: 'East Godavari', coordinates: [17.0005, 81.8040] as [number, number] },
  { name: 'Nellore', district: 'SPSR Nellore', coordinates: [14.4426, 79.9865] as [number, number] },
  { name: 'Anantapur', district: 'Anantapur', coordinates: [14.6819, 77.6006] as [number, number] },
  { name: 'Kadapa', district: 'YSR Kadapa', coordinates: [14.4673, 78.8242] as [number, number] },
  { name: 'Ongole', district: 'Prakasam', coordinates: [15.5057, 80.0499] as [number, number] },
  { name: 'Eluru', district: 'Eluru', coordinates: [16.7107, 81.0952] as [number, number] },
  { name: 'Vizianagaram', district: 'Vizianagaram', coordinates: [18.1067, 83.3956] as [number, number] },
  { name: 'Srikakulam', district: 'Srikakulam', coordinates: [18.2949, 83.8938] as [number, number] },
  { name: 'Chittoor', district: 'Chittoor', coordinates: [13.2172, 79.1003] as [number, number] },
  { name: 'Nandyal', district: 'Nandyal', coordinates: [15.4886, 78.4842] as [number, number] },
  { name: 'Machilipatnam', district: 'Krishna', coordinates: [16.1875, 81.1389] as [number, number] }
];
