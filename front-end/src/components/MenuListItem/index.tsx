import { FC } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { IMenuItem } from "../../interfaces/menu.interface";

interface IMenuListItemProps {
    menuItem: IMenuItem;
}

export const MenuListItem : FC<IMenuListItemProps> = ({ menuItem }) => {
  return (
    <>
      <ListItem key={menuItem.name}>
        <ListItemAvatar>
          <Avatar src={menuItem.image} sx={{ width: 80, height: 80 }}/>
        </ListItemAvatar>
        <ListItemText
          primary={menuItem.name}
          secondary={menuItem.description}
        />
      </ListItem>
    </>
  )
}