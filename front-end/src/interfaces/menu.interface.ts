export interface IMenuItem {
  name: string;
  image: string;
  description: string;
  category: string;
}

export interface IMenu {
  _id: string;
  branch: string;
  buffetPrice: number;
  menuItems: IMenuItem[];
  categories: string[];
}


export type ISortedMenuItem = { id: string, items: IMenuItem[]};
