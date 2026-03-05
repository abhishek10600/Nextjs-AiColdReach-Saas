import api from "@/lib/axios";

interface RegisterPayload {
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get("/api/auth/logout");
  return response.data;
};
