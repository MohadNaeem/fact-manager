import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DialogComponentProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
