import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { QRCodeSVG }  from 'qrcode.react';

interface QRCodeDialogProps {
  value: string;
  handleClose: () => void;
}

export const QRCodeDialog = ({ value, handleClose }: QRCodeDialogProps) => {
  return (
    <Dialog
      open={value !== ''}
      onClose={handleClose}
    >
      <DialogTitle>QR Code</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Scan the QR code below to view the menu.
        </DialogContentText>
        <QRCodeSVG value={value} />
      </DialogContent> 
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
