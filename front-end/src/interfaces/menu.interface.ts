export interface IMenuItem {
  name: string;
  image: string;
  description: string;
}

export interface IMenu {
  _id: string;
  branch: string;
  menuItems: IMenuItem[];
}
