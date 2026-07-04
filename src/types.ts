export interface Product {
  id: string;
  title: string;
  description: string;
  category: 'electronics' | 'fashion' | 'home-kitchen' | 'beauty' | 'sports';
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[]; // additional images for carousel
  isNew?: boolean;
  isTrending?: boolean;
  stock: number;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
