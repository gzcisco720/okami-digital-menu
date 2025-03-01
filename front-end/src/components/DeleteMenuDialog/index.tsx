import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { useParams } from 'react-router';
import { useMenuListStore } from '../../stores/menuList.store';

interface DeleteMenuDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const DeleteMenuDialog = ({ open, handleClose }: DeleteMenuDialogProps) => {
  const { deleteMenu } = useMenuListStore()
  const { branch } = useParams();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Edit Menu Item</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Are you sure you want to delete this menu of {branch} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={() => {
          deleteMenu(branch!)
          handleClose()
        }}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
