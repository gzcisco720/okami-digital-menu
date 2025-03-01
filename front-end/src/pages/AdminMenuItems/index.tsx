import { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { EditMenuItemDialog } from '../../components/EditMenuItemDialog'
import EditIcon from '@mui/icons-material/Edit';
import { DeleteMenuItemDialog } from '../../components/DeleteMenuItemDialog'
import { IMenuItem, ISortedMenuItem } from '../../interfaces/menu.interface'
import { useMenuStore } from '../../stores/menu.store'
import { ImportMenuDialog } from '../../components/ImportMenuDialog';
import { AddMenuItemDialog } from '../../components/AddMenuItemDialog';
import { EditMenuPriceDialog } from '../../components/EditMenuPriceDialog';
import { useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import BackupIcon from '@mui/icons-material/Backup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import { SortCategoryDialog } from '../../components/SortCategoryDialog';
import { sortMenuItems } from '../../utils/menuItem.utils';

export const AdminMenuItems = () => {
  const { menu ,fetchMenu } = useMenuStore()
  const { branch } = useParams()
  const [selectedEditMenuItem, setSelectedEditMenuItem] = useState<IMenuItem | null>(null);
  const [selectedDeleteMenuItem, setSelectedDeleteMenuItem] = useState<IMenuItem | null>(null);
  const [isImportMenuDialogOpen, setIsImportMenuDialogOpen] = useState<boolean>(false);
  const [isAddMenuItemDialogOpen, setIsAddMenuItemDialogOpen] = useState<boolean>(false);
  const [isEditMenuPriceDialogOpen, setIsEditMenuPriceDialogOpen] = useState<boolean>(false);
  const [isSortCategoryDialogOpen, setIsSortCategoryDialogOpen] = useState<boolean>(false);
  const [sortedMenuItems, setSortedMenuItems] = useState<ISortedMenuItem[]>([])

  useEffect(() => {
    if (branch) {
      fetchMenu(branch)
    }
  }, [branch, fetchMenu])

  useEffect(() => {
    if (menu) {
      setSortedMenuItems(sortMenuItems(menu))
    }
  }, [menu])

  return (
    <>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant='outlined' endIcon={<BackupIcon />} onClick={() => setIsImportMenuDialogOpen(true)} style={{marginRight: 10}}>
          Upload Menu
        </Button>
        <Button variant='outlined' endIcon={<AddCircleIcon />} onClick={() => setIsAddMenuItemDialogOpen(true)} style={{marginRight: 10}}>
          Add Menu Item
        </Button>
        <Button variant='outlined' endIcon={<EditIcon />} onClick={() => setIsEditMenuPriceDialogOpen(true)} style={{marginRight: 10}}>
          Edit Menu Price
        </Button>
        <Button variant='outlined' endIcon={<SortIcon />} onClick={() => setIsSortCategoryDialogOpen(true)}>
          Sort Categories
        </Button>
      </Box>
      {
        sortedMenuItems.map(category => (
          <Accordion key={category.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography component="span">{category.id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell width={120}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {category.items.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Avatar src={row.image} sx={{ width: 80, height: 80 }}/>
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => setSelectedEditMenuItem(row)}><EditIcon /></IconButton>
                          <IconButton color="primary" onClick={() => setSelectedDeleteMenuItem(row)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))
      }
      <EditMenuItemDialog handleClose={() => setSelectedEditMenuItem(null)} menuItem={selectedEditMenuItem}/>
      <DeleteMenuItemDialog handleClose={() => setSelectedDeleteMenuItem(null)} menuItem={selectedDeleteMenuItem}/>
      <ImportMenuDialog open={isImportMenuDialogOpen} handleClose={() => setIsImportMenuDialogOpen(false)} />
      <AddMenuItemDialog open={isAddMenuItemDialogOpen} handleClose={() => setIsAddMenuItemDialogOpen(false)} />
      <EditMenuPriceDialog open={isEditMenuPriceDialogOpen} handleClose={() => setIsEditMenuPriceDialogOpen(false)} />
      {
        menu?.categories && <SortCategoryDialog categories={menu?.categories} open={isSortCategoryDialogOpen} handleClose={() => setIsSortCategoryDialogOpen(false)} />
      }
    </>
  )
}