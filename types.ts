export enum Category {
  Food = "Makanan",
  Drink = "Minuman",
  Service = "Jasa",
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UMKM {
  id: number;
  name: string;
  category: Category;
  description: string;
  story: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  photos: string[];
  rating: number;
  operatingHours: string;
  contact: {
    phone: string;
    website?: string;
  };
  reviews: Review[];
  distance?: number; 
  priceRange: { 
    min: number;
    max: number;
  };
  tags: string[];
}