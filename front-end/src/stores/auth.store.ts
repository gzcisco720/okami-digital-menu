import { create } from "zustand";
import http from "../config/http";
import { IAuth } from "../interfaces/auth.interface";

export interface IAuthStore {
  authUser: IAuth | null;
  login: (username: string, password: string) => Promise<void>;
  verify: () => Promise<IAuth | null>;
  logout: () => void;
}

const login = async (email: string, password: string) => {
  try {
    const response = await http.post("/api/auth/login", { email, password });
    if (response.status === 200) {
      const {access_token, refresh_token} = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    } else {
      console.error("Failed to login");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const verify = async () => {
  try {
    const response = await http.get("/api/auth/verify");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to verify");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const logout = () => {
  http.post("/api/auth/logout").finally(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  });  
}

export const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  login: async (username: string, password: string) => {
    await login(username, password);
    set({ authUser: await verify() });
  },
  verify: async () => {
    const authUser = await verify();
    set({ authUser: authUser });
    return authUser;
  },
  logout: () => {
    logout();
    set({ authUser: null });
  }
}));