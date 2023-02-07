import React, { useState } from 'react';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface FormContainerTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function FormContainerTitle(props: FormContainerTitleProps) {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ ml: 2, p: 2 }}>
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

const FormContainer = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

export { FormContainer, FormContainerTitle };
