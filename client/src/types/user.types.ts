export type UserProps = {
  companyName: string;
  username: string;
  email: string;
  organizationType: string;
  province: string;
  cityMunicipality: string;
  password: string;
  confirmPassword?: string;
  image?: string;
  isAdmin?: boolean;
  token?: string;
};

export interface User {
  data?: UserProps;
  isLoading: boolean;
  error: string;
}

export interface Users {
  data?: UserProps[];
  isLoading: boolean;
  error: string;
}
