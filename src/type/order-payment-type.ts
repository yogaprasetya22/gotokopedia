import { Product, Toko } from "./toko-product-type";

export type Order = {
  id: number;
  user_id: number;
  items: OrderItem[];
  order_number: string;
  status_id: number;
  shipping_method_id: number;
  shipping_addresses_id: string;
  shipping_cost: number;
  total_price: number;
  final_price: number;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  payment_method_id: number;
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  product: Product
  toko_id: number;
  toko: Toko
  quantity: number;
  price: number;
  discount_price: number;
  discount: number;
  subtotal: number;
  created_at: Date;
};

export type OrderTracking = {
  id: number;
  order_id: number;
  status_id: number;
  notes: string | null;
  created_at: Date;
};

export type OrderStatus = {
  id: number;
  name: string;
  description: string | null;
};

export type Payment = {
  id: number;
  order_id: number;
  amount: number;
  payment_method_id: number;
  transaction_id: string | null;
  status: string;
  payment_date: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type PaymentMethod = {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
};

export type ShippingMethod = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_active: boolean;
};

export type CreateOrderRequest = {
  cart_id: string;
  payment_method_id: number;
  shipping_method_id: number;
  shipping_addresses_id: string;
  notes?: string;
};

export type UpdateOrderStatusRequest = {
  status_id: number;
  notes?: string;
};

export type PaginatedOrderQuery = {
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
  search?: string;
};
