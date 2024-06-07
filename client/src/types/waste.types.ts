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
