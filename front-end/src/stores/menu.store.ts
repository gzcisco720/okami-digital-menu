import { create } from "zustand";
import http from "../config/http";
import { IMenu, IMenuItem } from "../interfaces/menu.interface";

export interface IMenuStore {
  menu: IMenu | null;
  fetchMenu: (branch: string) => Promise<void>;
  addMenuItem: (branch: string, menuItem: IMenuItem) => Promise<void>;
  deleteMenuItem: (branch: string, menuItem: IMenuItem) => Promise<void>;
  updateMenuItem: (branch: string, menuItem: IMenuItem) => Promise<void>;
  updateMenuPrice: (branch: string, price: number) => Promise<void>;
  updateMenuCategories: (branch: string, categories: string[]) => Promise<void>;
  importMenu: (branch: string, menuItems: IMenuItem[]) => Promise<void>;
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

const addMenuItem = async (branch:string, menuItem: IMenuItem) => {
  try {
    const response = await http.post(`/api/menu/${branch}`, menuItem);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to add menu item");
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
    } else {
      console.error("Failed to update menu item");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const importMenu = async (branch:string, menuItems: IMenuItem[]) => {
  try {
    const response = await http.post(`/api/menu/${branch}/batch`, menuItems);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to import menu");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const updateMenuPrice = async (branch:string, price: number) => {
  try {
    const response = await http.put(`/api/menu/${branch}/price`, {
      buffetPrice: price
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

const updateMenuCategories = async (branch:string, categories: string[]) => {
  try {
    const response = await http.put(`/api/menu/${branch}/categories`, categories);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update menu categories");
      return null;
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
  addMenuItem: async (branch: string, menuItem: IMenuItem) => {
    await addMenuItem(branch, menuItem);
    set({ menu: await fetchMenu(branch) });
  },
  deleteMenuItem: async (branch: string, menuItem: IMenuItem) => {
    await deleteMenuItem(branch, menuItem);
    set({ menu: await fetchMenu(branch) });
  },
  updateMenuItem: async (branch: string, menuItem: IMenuItem) => {
    await updateMenuItem(branch, menuItem);
    set({ menu: await fetchMenu(branch) });
  },
  updateMenuPrice: async (branch: string, price: number) => {
    await updateMenuPrice(branch, price);
    set({ menu: await fetchMenu(branch) });
  },
  updateMenuCategories: async (branch: string, categories: string[]) => {
    await updateMenuCategories(branch, categories);
    set({ menu: await fetchMenu(branch) });
  },
  importMenu: async (branch: string, menuItems: IMenuItem[]) => {
    const items = menuItems.map((item) => {
      return {
        ...item,
        image: encodeURI(item.image),
      }
    });
    await importMenu(branch, items);
    set({ menu: await fetchMenu(branch) });
  }
}))
