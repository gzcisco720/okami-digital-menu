import Navigation from "../../components/MenuNavigation"
import { useMenuStore } from "../../stores/menu.store"
import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid2';
import { MenuCard } from "../../components/MenuCard";
import { MenuContainer } from "./styles";
import { Box, List, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MenuListItem } from "../../components/MenuListItem";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { useParams } from "react-router";

enum ViewType {
  LIST = 'list',
  GRID = 'grid'
}

export const Menu = () => {
  const {menu, fetchMenu} = useMenuStore()
  const { branch } = useParams();
  const [view, setView] = useState<ViewType>(ViewType.LIST);
  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: ViewType,
  ) => {
    setView(newView);
  };

  useEffect(() => {
    fetchMenu(branch!)
  }, [branch, fetchMenu])

  return (
    <>
      <Navigation />
      <MenuContainer maxWidth="xl">
        <Box display="flex" justifyContent="flex-end">
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
          >
            <ToggleButton value="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box marginTop={2}>
          {
            view === ViewType.LIST ? (
              <List>
                {menu && menu?.menuItems.map((menuItem) => <MenuListItem key={menuItem.name} menuItem={menuItem}/>)}
              </List>
            ) : (
              <Grid container spacing={2}>
                {
                  menu && menu?.menuItems.map((menuItem) => (
                    <Grid 
                      size={{xs: 12, sm:6, md: 4}} 
                      key={menuItem.name}
                    >
                      <MenuCard menuItem={menuItem} />
                    </Grid>
                  ))
                }
              </Grid> 
            )
          }
        </Box>
      </MenuContainer>
    </>
  )
}