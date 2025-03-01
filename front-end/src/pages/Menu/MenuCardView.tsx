import { Divider, Typography } from "@mui/material"
import { ISortedMenuItem } from "../../interfaces/menu.interface"
import Grid from '@mui/material/Grid2';
import { MenuCard } from "../../components/MenuCard";

interface IMenuCardViewProps {
  sortedMenuItems: ISortedMenuItem[]
}

export const MenuCardView = ({ sortedMenuItems }: IMenuCardViewProps) => {
  return (
    <>
      {
        sortedMenuItems.map(category => (
          <>
            <Typography variant="h5" component="h2" key={category.id} sx={{ marginTop: 2 }}>
              {category.id}
            </Typography>
            <Divider style={{margin: '15px 0 30px 0'}} />
            <Grid container key={category.id} spacing={2}>
              {
                category.items.map((menuItem) => (
                  <Grid 
                    size={{xs: 12, sm:6, md: 4}} 
                    key={menuItem.name}
                  >
                    <MenuCard menuItem={menuItem} />
                  </Grid>
                ))
              }
            </Grid> 
          </>
        ))
      }
    </>
  )
}