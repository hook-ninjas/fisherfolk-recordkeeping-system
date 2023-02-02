import { Button, styled, Typography } from '@mui/material';

export const CustomAddButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  background: '#28c181',
  [theme.breakpoints.down('sm')]: {
    minWidth: 30,
    borderRadius: '50%',
    '& .MuiButton-endIcon': {
      margin: 4,
    },
  },
}));

export const CustomBtnText = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
