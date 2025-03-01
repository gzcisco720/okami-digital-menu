import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useMenuListStore } from '../../stores/menuList.store'
import { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router'
import { DeleteMenuDialog } from '../../components/DeleteMenuDialog'
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { QRCodeDialog } from '../../components/QRCodeDialog';

export const AdminMenuList = () => {
  const navigate = useNavigate();
  const {menuList, fetchMenuList} = useMenuListStore()
  const [isDeleteMenuDialogOpen, setIsDeleteMenuDialogOpen] = useState<boolean>(false);
  const [ qrcodeValue, setQRCodeValue ] = useState<string>('');
  

  const handleQRCodeDialogOpen = (value: string) => {
    setQRCodeValue(value);
  }

  const handleQRCodeDialogClose = () => {
    setQRCodeValue('');
  }

  const handleDeleteMenuDialogOpen = () => {
    setIsDeleteMenuDialogOpen(true);
  }

  const handleDeleteMenuDialogClose = () => {
    setIsDeleteMenuDialogOpen(false);
  }

  useEffect(() => {
    fetchMenuList()
  }, [fetchMenuList])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 400 }}>Branch</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              menuList && menuList.map((menu) => (
                <TableRow 
                  key={menu._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {menu.branch}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton color="primary" onClick={() => navigate(`/admin/${menu.branch}`)}><VisibilityIcon /></IconButton>
                    <IconButton color="primary" onClick={() => handleQRCodeDialogOpen(`${window.location.origin}/menu/${menu.branch}`)}><QrCodeIcon /></IconButton>
                    <IconButton color="primary" onClick={handleDeleteMenuDialogOpen}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <QRCodeDialog value={qrcodeValue} handleClose={handleQRCodeDialogClose}/> 
      <DeleteMenuDialog open={isDeleteMenuDialogOpen} handleClose={handleDeleteMenuDialogClose}/>
    </>
  )
}