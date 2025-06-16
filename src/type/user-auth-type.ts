import { ShippingAddress } from "./shipping-addres-type";
import { Toko } from "./toko-product-type";

export type Role = {
  id: number;
  name: string;
  level: number;
  description: string | null;
};

export type User = {
  id: number;
  googleId?: string;
  picture?: string;
  username: string;
  email: string;
  password?: never;
  createdAt: Date;
  isActive: boolean;
  roleId: number;
  role?: Role;
  default_shipping_address_id?: string | null;
  default_shipping_address?: ShippingAddress;
};

export type UserInvitation = {
  token: Buffer;
  user_id: number;
  expiry: Date;
};

export type Follower = {
  user_id: number;
  follower_id: number;
  created_at: Date;
};

export type UserWithRelations = User & {
  role: Role;
  tokos: Toko[];
  shipping_addresses: ShippingAddress[];
  default_shipping_address: ShippingAddress | null;
};
