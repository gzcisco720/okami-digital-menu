import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { useMenuListStore } from '../../stores/menuList.store';

interface DeleteMenuDialogProps {
  open: boolean;
  branch: string;
  handleClose: () => void;
}

export const DeleteMenuDialog = ({ open, branch, handleClose }: DeleteMenuDialogProps) => {
  const { deleteMenu } = useMenuListStore()
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
          if (!branch) {
            alert('Branch is required')
            return
          }
          deleteMenu(branch)
          handleClose()
        }}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
