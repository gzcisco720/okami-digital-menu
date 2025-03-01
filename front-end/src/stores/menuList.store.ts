import { create } from "zustand";
import http from "../config/http";
import { IMenu } from "../interfaces/menu.interface";

export interface IMenuListStore {
  menuList: IMenu[];
  fetchMenuList: () => Promise<void>;
  deleteMenu: (branch:string) => Promise<void>;
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

export const useMenuListStore = create<IMenuListStore>((set) => ({
  menuList: [],
  fetchMenuList: async () => {
    set({ menuList: await fetchMenuList() });
  },
  deleteMenu: async (branch:string) => {
    await deleteMenu(branch);
  }
}))
