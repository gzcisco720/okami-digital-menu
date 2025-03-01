import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useUploadFile } from './hooks/useUploadFile';
import { useParams } from 'react-router';
import { useMenuStore } from '../../stores/menu.store';

interface ImportMenuDialog {
  open: boolean;
  handleClose: () => void;
}

export const ImportMenuDialog = ({ open, handleClose }: ImportMenuDialog) => {
  const { branch } = useParams();
  const { importMenu } = useMenuStore();
  const { uploadItems, onFileChange } = useUploadFile();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Import Menu</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <TextField type='file' onChange={onFileChange}/>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={async () => {
          if (branch && uploadItems.length > 0) {
            await importMenu(branch, uploadItems);
          } else {
            alert('Invalid branch or file');
          }
          handleClose();
        }}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
