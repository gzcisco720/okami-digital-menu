import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMenuStore } from '../../stores/menu.store';
import { DialogContentText } from '@mui/material';
import { IMenuItem } from '../../interfaces/menu.interface';
import { useParams } from 'react-router';

interface DeleteMenuItemDialogProps {
  menuItem: IMenuItem | null;
  handleClose: () => void;
}

export const DeleteMenuItemDialog = ({ menuItem, handleClose }: DeleteMenuItemDialogProps) => {
  const { deleteMenuItem } = useMenuStore()
  const { branch } = useParams();
  return (
    <Dialog
      open={menuItem !== null}
      onClose={handleClose}
    >
      <DialogTitle>Edit Menu Item</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Are you sure you want to delete this {menuItem?.name} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={() => {
          deleteMenuItem(branch!, menuItem!)
          handleClose()
        }}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
