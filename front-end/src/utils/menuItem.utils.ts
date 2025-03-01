import { IMenu, IMenuItem, ISortedMenuItem } from "../interfaces/menu.interface";

export const isMenuItemList = (value: unknown[]): value is IMenuItem[] => {
  return Array.isArray(value) && value.every((value) => {
    return value && typeof value === 'object' && 'name' in value && 'image' in value && 'description' in value;
  });
}


// Sort menu items by category based on the categories array in the menu object
export const sortMenuItems = (menu: IMenu): ISortedMenuItem[] => {
  const sortedMenuItems = menu.categories.map((category) => {
    return {
      id: category,
      items: menu.menuItems.filter((item) => item.category === category)
    }
  });
  return sortedMenuItems;
}