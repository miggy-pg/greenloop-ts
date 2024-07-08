import { UserProps } from "./user.type";

export type WasteProps = {
  description: string;
  category: string;
  image: string | ArrayBuffer | null | string[];
  user: UserProps;
  available?: boolean;
};

export interface WasteAvailable {
  wasteId: string;
  available: boolean;
}

export interface UserWaste {
  available: boolean;
  user: string;
  createdAt: Date;
  image: { public_id: string; url: string };
  post: string;
  category: string;
}
export interface WasteCardProps<T> {
  available: boolean;
  createdAt: Date;
  user: UserProps;
  id: string;
  description: string;
  category: string;
  image: T;
}
