import Navigation from "../../components/MenuNavigation"
import { useMenuStore } from "../../stores/menu.store"
import { useEffect, useState } from "react"
import { MenuContainer } from "./styles";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { useParams } from "react-router";
import { HouseRuleDialog } from "../../components/HouseRuleDialog";
import { sortMenuItems } from "../../utils/menuItem.utils";
import { ISortedMenuItem } from "../../interfaces/menu.interface";
import { MenuListView } from "./MenuListView";
import { MenuCardView } from "./MenuCardView";

enum ViewType {
  LIST = 'list',
  GRID = 'grid'
}

export const Menu = () => {
  const {menu, fetchMenu} = useMenuStore()
  const { branch } = useParams();
  const [view, setView] = useState<ViewType>(ViewType.LIST);
  const [isHouseRuleDialogOpen, setIsHouseRuleDialogOpen] = useState<boolean>(true);
  const [sortedMenuItems, setSortedMenuItems] = useState<ISortedMenuItem[]>([])

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: ViewType,
  ) => {
    setView(newView);
  };

  useEffect(() => {
    fetchMenu(branch!)
  }, [branch, fetchMenu])
  
  useEffect(() => {
    if (menu) {
      setSortedMenuItems(sortMenuItems(menu))
    }
  }, [menu])

  
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
            menu && view === ViewType.LIST ? <MenuListView sortedMenuItems={sortedMenuItems} /> : <MenuCardView sortedMenuItems={sortedMenuItems} />
          }
        </Box>
      </MenuContainer>
      <HouseRuleDialog open={isHouseRuleDialogOpen} handleClose={() => setIsHouseRuleDialogOpen(false)}/>
    </>
  )
}