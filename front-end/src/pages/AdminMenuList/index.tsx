import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useMenuListStore } from '../../stores/menuList.store'
import { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router'
import { DeleteMenuDialog } from '../../components/DeleteMenuDialog'
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { QRCodeDialog } from '../../components/QRCodeDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CreateMenuDialog } from '../../components/CreateMenuDialog';

export const AdminMenuList = () => {
  const navigate = useNavigate();
  const {menuList, fetchMenuList} = useMenuListStore()
  const [branchToDelete, setBranchToDelete] = useState<string>('');
  const [ qrcodeValue, setQRCodeValue ] = useState<string>('');
  const [isCreateMenuDialogOpen, setIsCreateMenuDialogOpen] = useState<boolean>(false);  

  useEffect(() => {
    fetchMenuList()
  }, [fetchMenuList])

  return (
    <>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant='outlined' endIcon={<AddCircleIcon />} onClick={() => setIsCreateMenuDialogOpen(true)} >
          Create Menu
        </Button>
      </Box>
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
                    <IconButton color="primary" onClick={() => setQRCodeValue(`${window.location.origin}/menu/${menu.branch}`)}><QrCodeIcon /></IconButton>
                    <IconButton color="primary" onClick={() => setBranchToDelete(menu.branch)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <QRCodeDialog value={qrcodeValue} handleClose={() => setQRCodeValue('')}/> 
      <DeleteMenuDialog open={branchToDelete !== ''} branch={branchToDelete} handleClose={() => setBranchToDelete('')}/>
      <CreateMenuDialog open={isCreateMenuDialogOpen} handleClose={() => setIsCreateMenuDialogOpen(false)}/>
    </>
  )
}