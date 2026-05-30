import api from "./axiosInstance";
import type { LoginPayload, RegisterPayload, AuthResponse, UserProfile } from "../types/auth";

export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/api/auth/login", data);
  return res.data;
};

export const fetchCurrentUser = async (): Promise<UserProfile> => {
  const res = await api.get<UserProfile>("/api/user/me");
  return res.data;
};

export const fetchPublicContent = async (): Promise<string> => {
  const res = await api.get<string>("/api/public");
  return res.data;
};

export const fetchUserContent = async (): Promise<string> => {
  const res = await api.get<string>("/api/user/content");
  return res.data;
};

export const fetchAdminContent = async (): Promise<string> => {
  const res = await api.get<string>("/api/admin/content");
  return res.data;
};