import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GearsQueryDocument,
  UpdateToArchiveGearDocument,
  ArchiveGearDocument,
} from '../../graphql/generated';
import Loading from '../Loading/Loading';
import { splitUpperCase } from '../../utils/utils';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { Alert, Backdrop, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import {
  showArchiveError,
  showArchiveSuccess,
} from '../ConfirmationDialog/Alerts';

const RenderMoreActions = (id: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [archiveGear, archiveResult] = useMutation(
    UpdateToArchiveGearDocument,
    {
      refetchQueries: [
        {
          query: GearsQueryDocument,
        },
        {
          query: ArchiveGearDocument,
        },
      ],
    }
  );

  const ArchiveAGear = () => {
    archiveGear({
      variables: {
        archiveGearId: id,
      },
      onCompleted: () => {
        showArchiveSuccess();
        handleClose();
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

  return (
    <div>
      <Button
        id="action-btn"
        aria-controls={open ? 'gear-action-btn' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="gear-action-btn"
        disableElevation
        onClick={handleClick}
        style={{ color: '#808080' }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="gear-action-menu"
        MenuListProps={{
          'aria-labelledby': 'gear-action-menu-list',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <EditIcon sx={{ width: 20, marginRight: 1.5 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            ArchiveAGear();
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

// const renderCell = () => <RenderMoreActions  />;

export default function FisherfolkGearTable() {
  const { loading, error, data } = useQuery(GearsQueryDocument);
  let rows: GridRowsProp = [];

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && data != undefined) {
    rows =
      data &&
      data.gears.map((gear) => ({
        id: gear.id,
        dateRegistered: new Date(gear.createdAt),
        classification: splitUpperCase(gear.classification),
        type: splitUpperCase(gear.type),
        operator: `${gear.fisherfolk.lastName}, ${gear.fisherfolk.firstName} ${gear.fisherfolk.middleName} ${gear.fisherfolk.appellation}`,
        status: '',
      }));
  }

  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableVirtualization={true}
        aria-label="gear-table"
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
    minWidth: 200,
  },
  {
    field: 'operator',
    headerName: 'Operator',
    disableColumnMenu: true,
    minWidth: 240,
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
    valueGetter(params) {
      return params.row.id;
    },
    renderCell(params) {
      return RenderMoreActions(params.row.id);
    },
  },
];
