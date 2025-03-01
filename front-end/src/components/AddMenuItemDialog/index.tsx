import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent } from 'react';
import { TextField } from '@mui/material';
import { useMenuStore } from '../../stores/menu.store';
import { useParams } from 'react-router';

interface EditMenuItemDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const AddMenuItemDialog = ({ open, handleClose }: EditMenuItemDialogProps) => {
  const { addMenuItem } = useMenuStore();
  const { branch } = useParams();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const menuItem = {
              name: formJson.menuItemName as string,
              description: formJson.menuItemDescription as string,
              image: formJson.menuItemImage as string,
              category: formJson.menuItemCategory as string,
            };
            await addMenuItem(branch!, menuItem);
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Add Menu Item</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <TextField
          margin="dense"
          id="menuItemName"
          name="menuItemName"
          label="Name"
          placeholder="Name"
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="menuItemDescription"
          name="menuItemDescription"
          label="Menu Item Description"
          placeholder="Menu Item Description"
          multiline
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="menuItemImage"
          name="menuItemImage"
          label="Menu Item Image Link"
          placeholder="Menu Item Image Link"
          multiline
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="menuItemCategory"
          name="menuItemCategory"
          label="Menu Item Category"
          placeholder="Menu Item Category"
          multiline
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
