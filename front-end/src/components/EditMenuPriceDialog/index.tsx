import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent } from 'react';
import { TextField } from '@mui/material';
import { useParams } from 'react-router';
import { useMenuStore } from '../../stores/menu.store';

interface EditMenuPriceDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const EditMenuPriceDialog = ({ open, handleClose }: EditMenuPriceDialogProps) => {
  const { updateMenuPrice, menu } = useMenuStore();
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
            if (isNaN(Number(formJson.buffetPrice))) {
              alert("Buffet Price must be a number");
              return;
            }
            if (!branch) {
              alert("Branch not found");
              return;
            }
            await updateMenuPrice(branch, Number(formJson.buffetPrice));
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Edit Price</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <TextField
          required
          margin="dense"
          id="buffetPrice"
          name="buffetPrice"
          label="Branch Buffet Price"
          placeholder="Branch Buffet Price"
          defaultValue={menu?.buffetPrice}
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
