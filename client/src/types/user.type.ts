import { UserWaste } from "./waste.type";

interface Image<T = string | string[] | undefined | null | ArrayBuffer> {
  image: T;
}

// UserProps interface with a generic type for the image property
export type UserProps<T = Image["image"]> = {
  fullName: string;
  username: string;
  email: string;
  organization: string;
  province: string;
  city: string;
  password: string;
  confirmPassword?: string;
  id?: string;
  _id?: string;
  image?: T;
  isAdmin?: boolean;
  token?: string;
  wastes?: UserWaste[];
  onAdminCreated: boolean;
};
export interface User {
  data?: UserProps[];
  isLoading: boolean;
  error: string;
}

export interface Users {
  data?: UserProps[];
  isLoading: boolean;
  error: string;
}
