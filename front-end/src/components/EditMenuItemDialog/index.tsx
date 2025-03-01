import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent } from 'react';
import { DialogContentText, TextField } from '@mui/material';
import { IMenuItem } from '../../interfaces/menu.interface';
import { useMenuStore } from '../../stores/menu.store';
import { useParams } from 'react-router';

interface EditMenuItemDialogProps {
  menuItem: IMenuItem | null;
  handleClose: () => void;
}

export const EditMenuItemDialog = ({ menuItem, handleClose }: EditMenuItemDialogProps) => {
  const { updateMenuItem } = useMenuStore();
  const { branch } = useParams();
  return (
    <Dialog
      open={menuItem !== null}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await updateMenuItem(branch!, {
              name: menuItem!.name,
              description: formJson.menuItemDescription as string,
              image: formJson.menuItemImage as string,
              category: formJson.menuItemCategory as string,
            });
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Edit Menu Item</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Edit the menu item details below. If you want to change the name of the menu item, please delete the menu item and create a new one.
        </DialogContentText>
        <TextField
          margin="dense"
          id="menuItemName"
          name="menuItemName"
          label="Name"
          placeholder="Name"
          defaultValue={menuItem?.name}
          disabled
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="menuItemDescription"
          name="menuItemDescription"
          label="Menu Item Description"
          placeholder="Menu Item Description"
          defaultValue={menuItem?.description}
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
          defaultValue={menuItem?.image}
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
          defaultValue={menuItem?.category}
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
