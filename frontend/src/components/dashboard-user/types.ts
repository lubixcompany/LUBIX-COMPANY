export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  avatarColor: string;
  avatarUrl: string | null;
}

export interface Order {
  id: string;
  product: string;
  image: string;
  price: number;
  status: string;
  date: string;
  seller: string;
  tracking?: string;
}

export interface SavedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export type Tab = "overview" | "orders" | "saved" | "profile";
export type Modal = "addAddress" | "editAddress" | "deleteAddress" | "avatar" | null;
