export type CreateAddressData = {
  address_line1: string;
  label: string;
  note_for_courier: string;
  recipient_name: string;
  recipient_phone: string;
};

export type ShippingAddress = {
  id: string;
  user_id: number;
  is_default: boolean;
  label: string;
  recipient_name: string;
  recipient_phone: string;
  address_line1: string;
  note_for_courier: string | null;
  created_at: Date;
  updated_at: Date;
};
