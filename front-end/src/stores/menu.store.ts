import { create } from "zustand";
import http from "../config/http";
import { IMenu, IMenuItem } from "../interfaces/menu.interface";

export interface IMenuStore {
  menu: IMenu | null;
  fetchMenu: (branch: string) => Promise<void>;
  deleteMenuItem: (branch: string, menuItem: IMenuItem) => Promise<void>;
  updateMenuItem: (branch: string, menuItem: IMenuItem) => Promise<void>;
}

const fetchMenu = async (branch:string) => {
  try {
    const response = await http.get(`/api/menu/${branch}`);
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

const deleteMenuItem = async (branch:string, menuItem: IMenuItem) => {
  try {
    const response = await http.delete(`/api/menu/${branch}?itemName=${menuItem.name}`);
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

const updateMenuItem = async (branch:string, menuItem: IMenuItem) => {
  try {
    const response = await http.put(`/api/menu/${branch}`, menuItem);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useMenuStore = create<IMenuStore>((set) => ({
  menu: null,
  fetchMenu: async (branch: string) => {
    set({ menu: await fetchMenu(branch) });
  },
  deleteMenuItem: async (branch: string, menuItem: IMenuItem) => {
    await deleteMenuItem(branch, menuItem);
    set({ menu: await fetchMenu(branch) });
  },
  updateMenuItem: async (branch: string, menuItem: IMenuItem) => {
    await updateMenuItem(branch, menuItem);
    set({ menu: await fetchMenu(branch) });
  }
}))
