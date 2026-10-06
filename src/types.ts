export type CategoryId = 
  | 'all' 
  | 'food' 
  | 'theatres' 
  | 'bookstores' 
  | 'hangouts' 
  | 'sports' 
  | 'study' 
  | 'hospitals';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  iconName: string;
  color: string;
  bgLight: string;
  badgeBg: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  branch: string;
  year: string;
  rating: number;
  type: 'positive' | 'critical' | 'mixed';
  title: string;
  comment: string;
  date: string;
  verifiedStudent: boolean;
  likes: number;
  tags: string[];
}

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  city: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  distance_km: number; // approximate computed distance from active college / location
  rating: number;
  review_count: number;
  senior_review: string; // Featured senior headline review
  senior_author: string;
  senior_branch: string;
  image_url: string;
  tag: string;
  address: string;
  price_tier: '₹' | '₹₹' | '₹₹₹' | 'Free';
  opening_hours: string;
  timing_tip?: string;
  activities: string[]; // Specific campus & fresher activities available here
  pros: string[]; // Good aspects
  cons: string[]; // Bad / Critical warnings & honesty
  reviews: ReviewItem[]; // Comprehensive list of good & bad reviews
  features: string[];
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  district: string;
  coordinates: [number, number]; // [lat, lng]
  tagline: string;
  established: number;
  address: string;
  popularActivities: string[];
}

export interface APSearchResult {
  title: string;
  subtitle: string;
  type: 'college' | 'city' | 'landmark';
  coordinates: [number, number];
  collegeRef?: College;
}
