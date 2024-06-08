export type WasteProps = {
  description: string;
  category: string;
  image: string;
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
