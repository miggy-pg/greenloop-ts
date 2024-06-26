import { UserProps } from "./user.type";

export type WasteProps = {
  description: string;
  category: string;
  image: string | ArrayBuffer | null | string[];
  user: string;
  available?: boolean;
};

export interface Payload {
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
export interface WasteCardProps {
  available: boolean;
  createdAt: Date;
  user: UserProps;
  id: string;
  post: string;
  category: string;
  image: {
    public_id: string;
    url: string;
  };
}
