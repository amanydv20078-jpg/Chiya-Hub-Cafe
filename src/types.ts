export interface MenuItem {
  id: string;
  name: string;
  nepaliName?: string;
  category: 'chiya' | 'coffee' | 'bakery' | 'savory' | 'cold-beverages';
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  isChefSpecial?: boolean;
  dietary?: ('Veg' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free')[];
  spiceLevel?: 0 | 1 | 2 | 3;
  calories?: number;
  prepTime?: string;
  ingredients?: string[];
  options?: {
    sizes?: { name: string; priceAdd: number }[];
    milks?: string[];
    sweetness?: string[];
    temperature?: ('Hot' | 'Iced')[];
  };
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  sizePriceAdd?: number;
  milkChoice?: string;
  sweetnessLevel?: string;
  temperature?: 'Hot' | 'Iced';
  specialNotes?: string;
  itemTotal: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  favoriteItem: string;
  verified: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'chiya' | 'food' | 'ambiance';
  image: string;
  description: string;
}

export interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Indoor Cozy' | 'Window Sunlit' | 'Outdoor Garden Terrace' | 'Quiet Workspace';
  occasion?: string;
  specialRequests?: string;
}

export interface OrderConfirmation {
  orderId: string;
  customerName: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  tip: number;
  total: number;
  status: 'Received' | 'Brewing & Baking' | 'Ready for Pickup' | 'Completed';
  estimatedTime: string;
  createdAt: string;
}
