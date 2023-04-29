import { Button, Menu, MenuItem, Alert, Backdrop } from '@mui/material';
import React, { useState } from 'react';
import {
  ArchiveVesselDocument, FisherfolkVesselsDocument, UpdateToArchiveVesselDocument,
  VesselQueryDocument } from '../../graphql/generated';
import { useMutation, useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { showArchiveError, showArchiveSuccess } from '../ConfirmationDialog/Alerts';

const RenderMoreActions = (id: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [archiveVessel, archiveResult] = useMutation(
    UpdateToArchiveVesselDocument,
    {
      refetchQueries: [
        {
          query: ArchiveVesselDocument,
        },
        {
          query: VesselQueryDocument,
        }
      ],
    }
  );

  const ArchiveAVessel = () => {
    archiveVessel({
      variables: {
        archiveVesselId: id,
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
  


  return (
    <div>
      <Button
        id="vessel-action-btn"
        aria-controls={open ? 'vessel-action-btn' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="vessel-action-btn"
        disableElevation
        onClick={handleClick}
        style={{ color: '#808080' }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="vessel-action-menu"
        MenuListProps={{
          'aria-labelledby': 'vessel-action-menu-list',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <EditIcon sx={{ width: 20, marginRight: 1.5 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          ArchiveAVessel();
          archiveHandler();
        }} disableRipple>
          <ArchiveIcon sx={{ width: 20, marginRight: 1.5 }} /> Archive
        </MenuItem>
      </Menu>
    </div>
  );
};

// const  renderCell = () => <RenderMoreActions />;

export default function VesselTable() {
  const { id } = useParams();

  const { error, loading, data } = useQuery(FisherfolkVesselsDocument, {
    variables: {
      fisherfolkId: id,
    },
  });


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
      data.fisherfolkVessels.map((vessel) => ({
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
        aria-label="fisherfolk-vessel-table"
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
      return RenderMoreActions(params.row.id);
    },
  },
];
