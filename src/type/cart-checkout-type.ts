import { PaymentMethod, ShippingMethod } from "./order-payment-type";
import { ShippingAddress } from "./shipping-addres-type";
import { Product, Toko } from "./toko-product-type";

export type CartItem = {
  id: string;
  cart_id: number;
  cart_store_id: string;
  product_id: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  product: Product;
};

export type CartStore = {
  id: string;
  cart_id: number;
  toko_id: number;
  created_at: Date;
  toko: Toko;
  items: CartItem[];
};

export type Cart = {
  id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  stores: CartStore[];
};

export type MetaCart = {
  cart: Cart | null;
  total_items: number;
  total_price: number;
};

export interface CheckoutSession {
  session_id: string;
  user_id: string;
  cart_store: CartStore[];
  total_price: number;
  shipping_address?: ShippingAddress;
  shipping_method?: ShippingMethod;
  payment_method?: PaymentMethod;
  created_at: string;
  expires_at: string;
}

export interface StartCheckoutPayload {
  cart_store_id: string[];
}

export interface CompleteCheckoutPayload {
  session_id: string;
  shipping_method_id: number;
  payment_method_id: number;
  shipping_address_id: string;
  notes?: string;
}
