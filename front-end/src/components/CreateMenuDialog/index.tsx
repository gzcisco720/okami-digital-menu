import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent } from 'react';
import { TextField } from '@mui/material';
import { useMenuListStore } from '../../stores/menuList.store';

interface CreateMenuDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateMenuDialog = ({ open, handleClose }: CreateMenuDialogProps) => {
  const { createMenu } = useMenuListStore();
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
            if (isNaN(Number(formJson.buffetPrice))) {
              alert("Buffet Price must be a number");
              return;
            }
            await createMenu(formJson.branchName as string, Number(formJson.buffetPrice));
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
          id="branchName"
          name="branchName"
          label="Name"
          placeholder="Name"
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="buffetPrice"
          name="buffetPrice"
          label="Branch Buffet Price"
          placeholder="Branch Buffet Price"
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
