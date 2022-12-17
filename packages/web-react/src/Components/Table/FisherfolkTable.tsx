import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {QueryFisherfolksDocument } from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { splitUpperCase } from '../../utils/utils';
import { DataGrid, GridColumns, GridRowsProp} from '@mui/x-data-grid';
import { Button, Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';

const renderMoreActions = (id: number) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleProfileView = () => {
    navigate(`/fisherfolk-profile/${id}`);
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
        <MenuItem onClick={handleProfileView} disableRipple>
          <VisibilityIcon sx={{ width: 20, marginRight: 1.5 }} /> View
        </MenuItem>
        <MenuItem disableRipple>
          <EditIcon sx={{ width: 20, marginRight: 1.5 }} /> Edit
        </MenuItem>
        <MenuItem disableRipple>
          <ArchiveIcon sx={{ width: 20, marginRight: 1.5 }} /> Archive
        </MenuItem>
      </Menu>
    </div>
  );
};

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', disableColumnMenu: true },
  {
    field: 'dateRegistered',
    headerName: 'Date Registered',
    type: 'date',
    minWidth: 130,
    disableColumnMenu: true,
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

export default function FisherfolkVesselTable() {
  const { loading, error, data } = useQuery(QueryFisherfolksDocument);
  let rows: GridRowsProp = [];

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
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
        livelihood: fisherfolk.livelihoods == null ? '' : splitUpperCase(fisherfolk.livelihoods[0]?.type),
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
        aria-label='fisherfolk-table'
      />
    </div>
  );
}
