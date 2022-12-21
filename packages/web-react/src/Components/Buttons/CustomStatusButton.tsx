import React from 'react';
import { Box } from '@mui/material';
import { FisherfolkStatus } from '../../graphql/generated';

interface FisherfolkStatusProps {
  label: FisherfolkStatus | undefined;
}

const fisherfolkStatusColor = {
  [FisherfolkStatus.Active]: 'radial-gradient(circle, rgba(40,193,129,.8) 28%, rgba(85,221,105,.4) 100%)',
  [FisherfolkStatus.Inactive]: 'radial-gradient(circle, rgba(232,12,54,.65) 28%, rgba(233,173,109,.5) 100%)',
  [FisherfolkStatus.Deceased]: 'radial-gradient(circle, rgba(97,85,85,0.7) 0%, rgba(171,171,164,0.6) 85%)',
};

export const FisherfolkStatusButton = (status: FisherfolkStatusProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        width: '100%',
        p: 0.125,
        background: fisherfolkStatusColor[status.label!],
        borderRadius: 2,
        fontSize: 12,
        fontWeight: 'medium',
        color:'white',
      }}
    >
      {status.label}
    </Box>
  );
};
