export interface MenuItem {
  name: string;
  arabicName: string;
  description: string;
  suitability?: string;
  platingStyle?: string;
}

export interface BeverageItem {
  name: string;
  description: string;
  garnish: string;
}

export interface CustomCateringMenu {
  introduction: string;
  themeColorPalette: string[];
  appetizers: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
  beverages: {
    signatureMocktail: BeverageItem;
    signatureCocktail: BeverageItem;
    pairingNote: string;
  };
  estimatedPricePerGuest: number;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  eventType: string;
  budgetProfile: 'Classic' | 'Premium' | 'Ultra-Luxury';
  dietaryRestrictions: string[];
  customVibe?: string;
  generatedMenu?: CustomCateringMenu;
  status: 'Submitted' | 'Reviewed' | 'Confirmed';
  createdAt: string;
}

export interface StandardMenuItem {
  id: string;
  category: string;
  name: string;
  arabicName: string;
  description: string;
  price?: string;
  isPopular?: boolean;
}

export interface LebaneseMilestone {
  year: string;
  title: string;
  location: string;
  description: string;
}
