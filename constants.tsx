
import React from 'react';
import { Product } from './types';

export const COLORS = {
  primary: '#2E7D32', // Ayurvedic Green
  secondary: '#FFC107', // Saffron Gold
  background: '#F5F5F5',
};

// Current App Version
export const APP_VERSION = '1.0.9';

// फक्त या नंबरने लॉगिन केल्यावरच Admin Panel दिसेल
export const ADMIN_PHONE = '9730593982';

export const CONTACT_INFO = {
  phone: '9730593982',
  whatsapp: '9730593982',
  upi: 'vinoddesale-1@koaxis', 
  email: 'radhekrishnaayurveda@gmail.com',
  address: 'Kasare, Taluka Sakri, District Dhule, Maharashtra, India',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Herbal Hair Oil',
    category: 'Hair Care',
    mrp: 499,
    price: 349,
    discount: 30,
    image: 'https://picsum.photos/seed/hair1/400/400',
    description: 'A traditional blend of 12 herbs to prevent hair fall and promote growth.',
    benefits: ['Reduces Hair Fall', 'Promotes Thickness', 'Fights Dandruff'],
    ingredients: ['Amla', 'Brahmi', 'Bhringraj', 'Coconut Oil'],
    usage: 'Apply gently on scalp and leave overnight.',
    stockStatus: 'In Stock',
    rating: 4.8,
    reviews: 124,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Saffron Glow Cream',
    category: 'Skin Care',
    mrp: 599,
    price: 499,
    discount: 16,
    image: 'https://picsum.photos/seed/skin1/400/400',
    description: 'Infused with real saffron for a natural radiance and skin repair.',
    benefits: ['Brightens Complexion', 'Reduces Blemishes', 'Deep Hydration'],
    ingredients: ['Saffron', 'Aloe Vera', 'Vitamin E'],
    usage: 'Apply twice daily after cleansing.',
    stockStatus: 'In Stock',
    rating: 4.5,
    reviews: 89,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Neem & Tulsi Soap',
    category: 'Soaps',
    mrp: 99,
    price: 75,
    discount: 24,
    image: 'https://picsum.photos/seed/soap1/400/400',
    description: 'Antibacterial soap for deep cleansing and protection.',
    benefits: ['Antibacterial', 'Refreshing Fragrance', 'Natural Moisturization'],
    ingredients: ['Neem', 'Tulsi', 'Glycerin'],
    usage: 'Use daily during bath.',
    stockStatus: 'In Stock',
    rating: 4.2,
    reviews: 210,
    isFeatured: false
  }
];
