import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { splitUpperCase } from '../../utils/utils';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { Alert, Button, Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';
import moment from 'moment';
import { ApolloError, useMutation } from '@apollo/client';
import {
  ArchiveFisherfolkDocument,
  QueryFisherfolksDocument,
  QueryFisherfolksQuery,
  UpdateToArchiveFisherfolkDocument,
} from '../../graphql/generated';
import UpdateFisherfolkForm from '../Forms/UpdateMemberForm';
import Backdrop from '@mui/material/Backdrop';
import {
  showArchiveSuccess,
  showArchiveError,
} from '../ConfirmationDialog/Alerts';

interface Props {
  error: ApolloError | undefined;
  loading: boolean;
  data: QueryFisherfolksQuery | undefined;
}

const renderMoreActions = (id: number) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateFisherfolk, setUpdateFisherfolk] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [archiveFisherfolk, archiveResult] = useMutation(
    UpdateToArchiveFisherfolkDocument,
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

  const ArchiveAFisherfolk = () => {
    archiveFisherfolk({
      variables: {
        archiveFisherfolkId: id,
      },
      onCompleted: () => {
        showArchiveSuccess();
      },
      onError: () => {
        showArchiveError();
      },
    });
  };

  const archiveHandler = () => {
    const { loading } = archiveResult;
    if (loading) {
      return (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        ></Backdrop>
      );
    }
  };

  const handleProfileView = () => {
    navigate(`/fisherfolk-profile/${id}`);
  };

  const handleUpdateFormOpen = () => {
    setUpdateFisherfolk(true);
  };

  const handleUpdateFormClose = () => setUpdateFisherfolk(false);

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
        <MenuItem onClick={handleProfileView} disableRipple>
          <VisibilityIcon sx={{ width: 20, marginRight: 1.5 }} /> View
        </MenuItem>
        <MenuItem onClick={handleUpdateFormOpen} disableRipple>
          <EditIcon sx={{ width: 20, marginRight: 1.5 }} /> Edit
        </MenuItem>
        {updateFisherfolk && (
          <UpdateFisherfolkForm
            id={id}
            handleClose={handleUpdateFormClose}
            open={updateFisherfolk}
          />
        )}
        <MenuItem
          onClick={() => {
            ArchiveAFisherfolk();
            archiveHandler();
          }}
          disableRipple
        >
          <ArchiveIcon sx={{ width: 20, marginRight: 1.5 }} /> Archive
        </MenuItem>
      </Menu>
    </div>
  );
};

export default function FisherfolkTable({ error, loading, data }: Props) {
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
      data.fisherfolks.map((fisherfolk) => ({
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
        aria-label="fisherfolk-table"
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
