import { User } from "./user-auth-type";

export interface Toko {
  id?: number;
  slug: string;
  name: string;
  image_profile?: string;
  country: string;
  created_at: Date;
  products?: Product[];
  user_id?: number;
  user?: User;
}

export interface Category {
  id?: number;
  name?: string;
  slug: string;
  description?: string;
  products?: Product[];
}

export type Product = {
  id: number;
  category: Category;
  comments: Comment[];
  country: string;
  created_at: Date;
  description: string | null;
  discount: number;
  discount_price: number;
  estimation: string;
  image_urls: string[];
  is_approved: boolean;
  is_for_sale: boolean;
  name: string;
  price: number;
  rating: number;
  slug: string;
  sold: number;
  stock: number;
  toko: Toko;
  updated_at: Date;
  version: number;
};

export type DetailProduct = Product & {
  ulasan: Ulasan;
};

export type Ulasan = {
  total_ulasan: number;
  total_rating: number;
  rating_breakdown: Record<number, number>;
};

export type ProductWithRelations = Product & {
  category: Category;
  toko: Toko;
  comments: Comment[];
};

export type TokoWithRelations = Toko & {
  user: User;
  products: Product[];
};
