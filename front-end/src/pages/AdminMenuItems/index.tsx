import { useEffect, useState } from 'react'
import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { EditMenuItemDialog } from '../../components/EditMenuItemDialog'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMenuItemDialog } from '../../components/DeleteMenuItemDialog'
import { IMenuItem } from '../../interfaces/menu.interface'
import { useMenuStore } from '../../stores/menu.store'

export const AdminMenuItems = () => {
  const {menu, fetchMenu} = useMenuStore()
  const [selectedEditMenuItem, setSelectedEditMenuItem] = useState<IMenuItem | null>(null);
  const [selectedDeleteMenuItem, setSelectedDeleteMenuItem] = useState<IMenuItem | null>(null);

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

  useEffect(() => {
    fetchMenu("head-office")
  }, [fetchMenu])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
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
    </>
  )
}