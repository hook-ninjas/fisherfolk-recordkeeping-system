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
import { Box, createTheme, Modal, ThemeProvider } from '@mui/material'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 3,
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(6),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        justifyContent: 'space-between',
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          width: 255,
        },
        variant: 'outlined',
        margin: 'normal',
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          width: 255,
        },
        margin: 'none',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: 13,
        },
      },
    },
  },
})
interface FormProps {
  children: any
  open: boolean
}
export default function CustomForm({ children, open }: FormProps) {
  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <ThemeProvider theme={theme}>
        <Modal open={open}>
          <Box sx={style}>{children}</Box>
        </Modal>
      </ThemeProvider>
    </BootstrapDialog>
  )
}
