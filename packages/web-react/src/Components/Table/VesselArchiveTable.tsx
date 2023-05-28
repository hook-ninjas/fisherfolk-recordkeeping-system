import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { Alert, Backdrop, Button, Menu, MenuItem, Stack } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import moment from 'moment';
import { ApolloError, useMutation } from '@apollo/client';
import {
  QueryFisherfolksDocument,
  ArchiveVesselQuery,
  RestoreVesselDocument,
  ArchiveVesselDocument,
} from '../../graphql/generated';
import {
  showRestoreSuccess,
  showRestoreError,
} from '../ConfirmationDialog/Alerts';

interface Props {
  error: ApolloError | undefined;
  loading: boolean;
  data: ArchiveVesselQuery | undefined;
}

const renderMoreActions = (id: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [restoreVessel, restoreResult] = useMutation(RestoreVesselDocument, {
    refetchQueries: [
      {
        query: QueryFisherfolksDocument,
      },
      {
        query: ArchiveVesselDocument,
      },
    ],
  });

  const RestoreAFsiherfolk = () => {
    restoreVessel({
      variables: {
        restoreVesselId: id,
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

export default function VesselArchiveTable({ error, loading, data }: Props) {
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
      data.ArchiveVessel.map((vessel) => ({
        id: vessel.id,
        dateRegistered: new Date(vessel.createdAt),
        mfvrNum: vessel.mfvrNumber,
        homeport: vessel.homeport,
        name: vessel.name,
        status: '',
        type: vessel.type,
        placeBuilt: vessel.placeBuilt,
        yearBuilt: vessel.yearBuilt,
        material: vessel.material,
        length: vessel.registeredLength,
        breadth: vessel.registeredBreadth,
        depth: vessel.registeredDepth,
        tonLength: vessel.tonnageLength,
        tonBreadth: vessel.tonnageBreadth,
        tonDepth: vessel.tonnageDepth,
        grossTon: vessel.grossTonnage,
        netTon: vessel.netTonnage,
        engineMake: vessel.engineMake,
        serialNum: vessel.serialNumber,
        horsePower: vessel.horsepower,
      }));
  }
  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableVirtualization={true}
        aria-label="archive-fisherfolk-table"
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No results found.
            </Stack>
          ),
        }}
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
    minWidth: 150,
    disableColumnMenu: true,
    valueFormatter: (params) => moment(params?.value).format('MM/DD/YYYY'),
  },
  {
    field: 'mfvrNum',
    headerName: 'MFVR Number',
    editable: true,
    disableColumnMenu: true,
    minWidth: 170,
  },
  {
    field: 'homeport',
    headerName: 'Homeport',
    disableColumnMenu: true,
    minWidth: 170,
  },
  {
    field: 'name',
    headerName: 'Name',
    disableColumnMenu: true,
    minWidth: 170,
  },
  {
    field: 'status',
    headerName: 'Status',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'type',
    headerName: 'Type',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'placeBuilt',
    headerName: 'Place Built',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'yearBuilt',
    headerName: 'Year Built',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'material',
    headerName: 'Material',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'length',
    headerName: 'Length',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'breadth',
    headerName: 'Breadth',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'depth',
    headerName: 'Depth',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'tonLength',
    headerName: 'Ton Length',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'tonBreadth',
    headerName: 'Ton Breadth',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'tonDepth',
    headerName: 'Ton Depth',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'grossTon',
    headerName: 'Gross Ton',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'netTon',
    headerName: 'Net Ton',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'engineMake',
    headerName: 'Engine Make',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'serialNum',
    headerName: 'Serial Num',
    disableColumnMenu: true,
    minWidth: 130,
  },
  {
    field: 'horsePower',
    headerName: 'Horse Power',
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
