export type PageId = 'home' | 'menu' | 'games' | 'students' | 'book' | 'portal';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isVeg: boolean;
  isPopular?: boolean;
  image?: string;
  components?: string[]; // For combos
}

export interface BoardGame {
  id: string;
  name: string;
  players: string;
  playTime: string;
  description: string;
  category: string;
  image: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverColor: string; // Dynamic rich cover colors for custom render
  rating: number;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface TableReservation {
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingPreference: 'quiet' | 'games' | 'any';
}
