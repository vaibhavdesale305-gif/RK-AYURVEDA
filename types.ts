
export type Category = 'Hair Care' | 'Skin Care' | 'Soaps' | 'Dhoop & Agarbatti';
export type Language = 'en' | 'mr' | 'hi';

export interface AppContent {
  homeBanner: string;
  homeTitle: string;
  homeSubtitle: string;
  aboutHeritage: string;
  aboutQuote: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  mrp: number;
  price: number;
  discount: number;
  image: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  reviews: number;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Placed' | 'Shipped' | 'Delivered';
  date: string;
  address: string;
  paymentMethod: 'COD' | 'UPI';
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  addresses: string[];
}
