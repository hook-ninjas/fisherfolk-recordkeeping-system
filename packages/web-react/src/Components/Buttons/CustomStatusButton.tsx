import React from 'react';
import { Box } from '@mui/material';
import { FisherfolkStatus } from '../../graphql/generated';

interface FisherfolkStatusProps {
  label: FisherfolkStatus;
}

const fisherfolkStatusToColor = {
  [FisherfolkStatus.Active]: 'rgba(83, 247, 137, .70)',
  [FisherfolkStatus.Inactive]: 'rgba(228, 45, 45, .70)',
  [FisherfolkStatus.Deceased]: 'rgba(122, 116, 116, .70)',
};

export const FisherfolkStatusButton = (status: FisherfolkStatusProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        width: '100%',
        p: .05,
        backgroundColor: fisherfolkStatusToColor[status.label],
        borderRadius: 2,
        fontSize: 12,
        color: 'white'
      }}
    >
      {status.label}
    </Box>
  );
};
