import { IMenuItem } from "../interfaces/menu.interface";

export const isMenuItemList = (value: unknown[]): value is IMenuItem[] => {
  return Array.isArray(value) && value.every((value) => {
    return value && typeof value === 'object' && 'name' in value && 'image' in value && 'description' in value;
  });
}
