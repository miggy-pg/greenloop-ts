import { UserWaste } from "./waste.type";

export type UserProps = {
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
  // image?: string | undefined;
  image?: string | string[] | undefined | ArrayBuffer;
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
