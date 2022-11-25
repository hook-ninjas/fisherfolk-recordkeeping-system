import React from 'react';
import { Box } from '@mui/material';
import { FisherfolkStatus } from '../../graphql/generated';

interface FisherfolkStatusProps {
  label: FisherfolkStatus | undefined;
}

const fisherfolkStatusColor = {
  [FisherfolkStatus.Active]: 'rgba(83, 247, 137, .20)',
  [FisherfolkStatus.Inactive]: 'rgba(228, 45, 45, .20)',
  [FisherfolkStatus.Deceased]: 'rgba(122, 116, 116, .20)',
};

const textColor = {
  [FisherfolkStatus.Active]: '#0EAC28',
  [FisherfolkStatus.Inactive]: '#E91818',
  [FisherfolkStatus.Deceased]: '#7D7777',
};

export const FisherfolkStatusButton = (status: FisherfolkStatusProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        width: '100%',
        p: 0.125,
        backgroundColor: fisherfolkStatusColor[status.label!],
        borderRadius: 2,
        fontSize: 12,
        fontWeight: 'medium',
        color: textColor[status.label!],
      }}
    >
      {status.label}
    </Box>
  );
};
