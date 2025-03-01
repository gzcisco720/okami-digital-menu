import { create } from "zustand";
import http from "../config/http";
import { IMenu } from "../interfaces/menu.interface";

export interface IMenuListStore {
  menuList: IMenu[];
  fetchMenuList: () => Promise<void>;
  deleteMenu: (branch:string) => Promise<void>;
  createMenu: (branch: string, price: number) => Promise<void>;
}

const fetchMenuList = async () => {
  try {
    const response = await http.get(`/api/menu`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch menu list");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const deleteMenu= async (branch:string) => {
  try {
    const response = await http.delete(`/api/menu/${branch}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch menu list");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const createMenu = async (branch:string, price: number) => {
  try {
    const response = await http.post(`/api/menu`, {
      branch,
      buffetPrice: price,
      menuItems: []
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to create menu");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useMenuListStore = create<IMenuListStore>((set) => ({
  menuList: [],
  fetchMenuList: async () => {
    set({ menuList: await fetchMenuList() });
  },
  createMenu: async (branch: string, price: number) => {
    await createMenu(branch, price);
    set({ menuList: await fetchMenuList() });
  },
  deleteMenu: async (branch:string) => {
    await deleteMenu(branch);
    set({ menuList: await fetchMenuList() });
  },
}))
