import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { splitUpperCase } from '../../utils/utils';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { Alert, Backdrop, Button, Menu, MenuItem } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import moment from 'moment';
import { ApolloError, useMutation } from '@apollo/client';
import {
  QueryFisherfolksDocument,
  ArchiveGearQuery,
  RestoreGearDocument,
  ArchiveGearDocument,
} from '../../graphql/generated';
import {
  showRestoreSuccess,
  showRestoreError,
} from '../ConfirmationDialog/Alerts';

interface Props {
  error: ApolloError | undefined;
  loading: boolean;
  data: ArchiveGearQuery | undefined;
}

const renderMoreActions = (id: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [restoreGear, restoreResult] = useMutation(RestoreGearDocument, {
    refetchQueries: [
      {
        query: QueryFisherfolksDocument,
      },
      {
        query: ArchiveGearDocument,
      },
    ],
  });

  const RestoreAFsiherfolk = () => {
    restoreGear({
      variables: {
        restoreGearId: id,
      },
      onCompleted: () => {
        showRestoreSuccess();
        handleClose();
      },
      onError: () => {
        showRestoreError();
      },
    });
  };

  const restoreHandler = () => {
    const { loading } = restoreResult;
    if (loading) {
      return (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        ></Backdrop>
      );
    }
  };

  return (
    <div>
      <Button
        id="fisherfolk-action-btn"
        aria-controls={open ? 'fisherfolk-action-btn' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="fisherfolk-action-btn"
        disableElevation
        onClick={handleClick}
        style={{ color: '#808080' }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="fisherfolk-action-menu"
        MenuListProps={{
          'aria-labelledby': 'fisherfolk-action-menu-list',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            RestoreAFsiherfolk();
            restoreHandler();
          }}
          disableRipple
        >
          <RestoreIcon sx={{ width: 20, marginRight: 1.5 }} /> Restore
        </MenuItem>
      </Menu>
    </div>
  );
};

export default function GearArchiveTable({ error, loading, data }: Props) {
  let rows: GridRowsProp = [];

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && data !== undefined) {
    rows =
      data &&
      data.ArchiveGear.map((gear) => ({
        id: gear.id,
        dateRegistered: new Date(gear.createdAt),
        classification: splitUpperCase(gear.classification),
        type: splitUpperCase(gear.type),
      }));
  }
  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableVirtualization={true}
        aria-label="archive-fisherfolk-table"
      />
    </div>
  );
}

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', disableColumnMenu: true },
  {
    field: 'dateRegistered',
    headerName: 'Date Registered',
    type: 'date',
    disableColumnMenu: true,
    minWidth: 150,
    valueFormatter: (params) => moment(params?.value).format('MM/DD/YYYY'),
  },
  {
    field: 'classification',
    headerName: 'Classification',
    disableColumnMenu: true,
    minWidth: 150,
  },
  {
    field: 'type',
    headerName: 'Type',
    disableColumnMenu: true,
    minWidth: 250,
  },
  {
    field: 'status',
    headerName: 'Status',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'actions',
    headerName: '',
    disableColumnMenu: true,
    sortable: false,
    renderCell(params) {
      return renderMoreActions(params.row.id);
    },
  },
];
