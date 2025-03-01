import { Divider, List, Typography } from "@mui/material"
import { MenuListItem } from "../../components/MenuListItem"
import { ISortedMenuItem } from "../../interfaces/menu.interface"

interface IMenuListViewProps {
  sortedMenuItems: ISortedMenuItem[]
}

export const MenuListView = ({ sortedMenuItems }: IMenuListViewProps) => {
  return (
    <>
      {
        sortedMenuItems.map(category => (
          <>
            <Typography variant="h5" component="h2" key={category.id} sx={{ marginTop: 2 }}>
              {category.id}
            </Typography>
            <Divider style={{margin: '15px 0 5px 0'}} />
            <List key={category.id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {
                category.items.map(item => (
                  <MenuListItem
                    key={item.name}
                    menuItem={item}
                  />
                ))
              }
            </List>
          </>
        ))
      }
    </>
  )
}