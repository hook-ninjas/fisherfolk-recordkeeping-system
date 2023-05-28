import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { FisherfolkByIdDocument, FisherfolkCountDocument, FisherfolkStatus, QueryFisherfolksDocument, UpdateFisherfolkStatusDocument } from '../../graphql/generated';
import { fisherfolkStatus } from '../Forms/Enums';
import { useMutation } from '@apollo/client';
import { showUpdateStatusError, showUpdateStatusSuccess } from '../ConfirmationDialog/Alerts';

interface StatusProps {
  label: FisherfolkStatus | undefined;
}

interface FisherfolkStatusProps {
  label: FisherfolkStatus | undefined;
  id: number;
}

const fisherfolkStatusColor = {
  [FisherfolkStatus.Active]: 'radial-gradient(circle, rgba(40,193,129,.8) 28%, rgba(85,221,105,.4) 100%)',
  [FisherfolkStatus.Inactive]: 'radial-gradient(circle, rgba(232,12,54,.65) 28%, rgba(233,173,109,.5) 100%)',
  [FisherfolkStatus.Deceased]: 'radial-gradient(circle, rgba(97,85,85,0.7) 0%, rgba(171,171,164,0.6) 85%)',
};
export const StatusButton = (status: StatusProps) => {
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
        color: 'white',
      }}
    >
      {status.label}
    </Box>
  );
};

export const FisherfolkStatusButton = (status: FisherfolkStatusProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const [updateStatus] = useMutation(UpdateFisherfolkStatusDocument, {
    refetchQueries: [
      {
        query: FisherfolkByIdDocument,
        variables: {
          fisherfolkId: status.id
        }
      },
      {
        query: FisherfolkCountDocument,
      },
    ],
    onCompleted: () => {
      showUpdateStatusSuccess();
      handleClose();
    },
    onError: () => {
      showUpdateStatusError();
      handleClose();
    },
  });

  const handleUpdateStatus = async (fisherfolkStatus: FisherfolkStatus) => {
    await updateStatus({
      variables: {
        status: fisherfolkStatus,
        updateFisherfolkStatusId: status.id,
      },
    });
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          width: '100%',
          p: 0.125,
          background: fisherfolkStatusColor[status.label!],
          borderRadius: 2,
          fontSize: 12,
          fontWeight: 'medium',
          color: 'white',
        }}
      >
        {status.label}
      </Button>
      <Menu id="status-action-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {fisherfolkStatus
          .filter((stat) => stat != status.label)
          .map((stat) => (
            <MenuItem key={stat} onClick={() => handleUpdateStatus(stat)} disableRipple>
              {stat}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
