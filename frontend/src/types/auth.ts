export type Role = "USER" | "ADMIN";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface AuthUser {
  token: string;
  role: Role;
  name: string;
}