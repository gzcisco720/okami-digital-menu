import { useEffect, useState } from 'react'
import { Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { EditMenuItemDialog } from '../../components/EditMenuItemDialog'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMenuItemDialog } from '../../components/DeleteMenuItemDialog'
import { IMenuItem } from '../../interfaces/menu.interface'
import { useMenuStore } from '../../stores/menu.store'
import { ImportMenuDialog } from '../../components/ImportMenuDialog';
import BackupIcon from '@mui/icons-material/Backup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddMenuItemDialog } from '../../components/AddMenuItemDialog';

export const AdminMenuItems = () => {
  const {menu, fetchMenu} = useMenuStore()
  const [selectedEditMenuItem, setSelectedEditMenuItem] = useState<IMenuItem | null>(null);
  const [selectedDeleteMenuItem, setSelectedDeleteMenuItem] = useState<IMenuItem | null>(null);
  const [isImportMenuDialogOpen, setIsImportMenuDialogOpen] = useState<boolean>(false);
  const [isAddMenuItemDialogOpen, setIsAddMenuItemDialogOpen] = useState<boolean>(false);

  const handleEditMenuItemOpen = (menuItem: IMenuItem) => {
    setSelectedEditMenuItem(menuItem);
  };

  const handleEditMenuItemClose = () => {
    setSelectedEditMenuItem(null);
  };

  const handleDeleteMenuItemOpen = (menuItem: IMenuItem) => {
    setSelectedDeleteMenuItem(menuItem);
  };

  const handleDeleteMenuItemClose = () => {
    setSelectedDeleteMenuItem(null);
  };

  const handleImportMenuDialogOpen = () => {
    setIsImportMenuDialogOpen(true);
  }

  const handleImportMenuDialogClose = () => {
    setIsImportMenuDialogOpen(false)
  }

  const handleAddMenuItemDialogOpen = () => {
    setIsAddMenuItemDialogOpen(true);
  }

  const handleAddMenuItemDialogClose = () => {
    setIsAddMenuItemDialogOpen(false);
  }

  useEffect(() => {
    fetchMenu("head-office")
  }, [fetchMenu])

  return (
    <>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant='outlined' endIcon={<BackupIcon />} onClick={handleImportMenuDialogOpen} style={{marginRight: 10}}>
          Upload Menu
        </Button>
        <Button variant='outlined' endIcon={<AddCircleIcon />} onClick={handleAddMenuItemDialogOpen}>
          Add Menu Item
        </Button>
      </Box>
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
            {menu && menu?.menuItems.map((row) => (
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
                  <IconButton color="primary" onClick={() => handleEditMenuItemOpen(row)}><EditIcon /></IconButton>
                  <IconButton color="primary" onClick={() => handleDeleteMenuItemOpen(row)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditMenuItemDialog handleClose={handleEditMenuItemClose} menuItem={selectedEditMenuItem}/>
      <DeleteMenuItemDialog handleClose={handleDeleteMenuItemClose} menuItem={selectedDeleteMenuItem}/>
      <ImportMenuDialog open={isImportMenuDialogOpen} handleClose={handleImportMenuDialogClose} />
      <AddMenuItemDialog open={isAddMenuItemDialogOpen} handleClose={handleAddMenuItemDialogClose} />
    </>
  )
}