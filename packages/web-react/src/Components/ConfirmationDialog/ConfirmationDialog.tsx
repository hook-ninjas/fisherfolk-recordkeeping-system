import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

const rightButtonSx = {
  bgcolor: '#336CFB',
  '&:hover': {
    bgcolor: '#336CFB',
  },
  display: 'block',
  margin: 2,
  marginLeft: 'auto',
};

const lefButtonSx = {
  bgcolor: '#336CFB',
  '&:hover': {
    bgcolor: '#336CFB',
  },
  display: 'block',
  margin: 2,
  marginRight: 'auto',
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(6),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface ConfirmationDiaglogProps {
  title: string;
  message: string;
  leftBtnMsg: string;
  rightBtnMsg: string;
  open: boolean;
  handleClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs(props: ConfirmationDiaglogProps) {
  const { title, message, leftBtnMsg, rightBtnMsg, open, handleClose } = props;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{message}</Typography>
      </DialogContent>
      <Grid container mt={1}>
        <Button
          variant="contained"
          aria-label={leftBtnMsg}
          sx={lefButtonSx}
          onClick={handleClose}
        >
          {leftBtnMsg}
        </Button>
        <Button
          variant="contained"
          aria-label={rightBtnMsg}
          sx={rightButtonSx}
          onClick={handleClose}
        >
          {rightBtnMsg}
        </Button>
      </Grid>
    </BootstrapDialog>
  );
}
