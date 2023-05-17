import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { splitUpperCase } from '../../utils/utils';
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
} from '@mui/x-data-grid';
import { Alert, Backdrop, Button, Menu, MenuItem } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';
import moment from 'moment';
import { ApolloError, useMutation } from '@apollo/client';
import { ArchiveFisherfolkDocument, ArchiveFisherfolkQuery, QueryFisherfolksDocument, UpdateRestreFisherfolkDocument } from '../../graphql/generated';
import { showRestoreSuccess, showRestoreError } from '../ConfirmationDialog/Alerts';

interface Props {
  error: ApolloError | undefined;
  loading: boolean;
  data: ArchiveFisherfolkQuery | undefined;
}

const renderMoreActions = (id: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [restoreFisherfolk, restoreResult] = useMutation(
    UpdateRestreFisherfolkDocument,
    {
      refetchQueries: [
        {
          query: QueryFisherfolksDocument,
        },
        {
          query: ArchiveFisherfolkDocument,
        },
      ],
    }
  );

  const RestoreAFsiherfolk = () => {
    restoreFisherfolk({
      variables: {
        restreFisherfolkId: id,
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
        <MenuItem onClick={() => {
          RestoreAFsiherfolk();
          restoreHandler();
        }} disableRipple>
          <RestoreIcon sx={{ width: 20, marginRight: 1.5 }} /> Restore
        </MenuItem>
      </Menu>
    </div>
  );
};

export default function FisherfolkArchiveTable({ error, loading, data }: Props) {
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
      data.ArchiveFisherfolk.map((fisherfolk) => ({
        id: fisherfolk.id,
        dateRegistered: new Date(fisherfolk.registrationDate),
        name: `${fisherfolk.lastName}, ${fisherfolk.firstName} ${fisherfolk.appellation} ${fisherfolk.middleName}`,
        contactNumber: fisherfolk.contactNum,
        livelihood:
          fisherfolk.livelihoods == null
            ? ''
            : splitUpperCase(fisherfolk.livelihoods[0]?.type),
        barangay: fisherfolk.barangay,
        status: fisherfolk.status,
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
    minWidth: 130,
    disableColumnMenu: true,
    valueFormatter: (params) => moment(params?.value).format('MM/DD/YYYY'),
  },
  {
    field: 'name',
    headerName: 'Name',
    disableColumnMenu: true,
    minWidth: 200,
  },
  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    disableColumnMenu: true,
    sortable: false,
    minWidth: 150,
  },
  {
    field: 'livelihood',
    headerName: 'Livelihood',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'barangay',
    headerName: 'Barangay',
    disableColumnMenu: true,
    minWidth: 160,
  },
  {
    field: 'status',
    headerName: 'Status',
    disableColumnMenu: true,
    minWidth: 80,
    valueGetter(params) {
      return params.row.status;
    },
    renderCell(params) {
      return <FisherfolkStatusButton label={params.row.status} />;
    },
  },
  {
    field: 'actions',
    headerName: '',
    disableColumnMenu: true,
    sortable: false,
    valueGetter(params) {
      return params.row.id;
    },
    renderCell(params) {
      return renderMoreActions(params.row.id);
    },
  },
];
