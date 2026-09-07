export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  mrp?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string; 
  rating?: number;
  reviewCount?: number;
  description: string;
  highlights: string[];
  variants: ProductVariant[];
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  processingFee: number;
  totalPayable: number;
  noCost: boolean;
  recommended?: boolean;
}