import React, { useState } from 'react';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { VesselQueryDocument } from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

const renderMoreActions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

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
    minWidth: 150,
    disableColumnMenu: true,
  },
  {
    field: 'mfvrNum',
    headerName: 'MFVR Number',
    editable: true,
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
    field: 'operator',
    headerName: 'Operator',
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
    renderCell: renderMoreActions,
  },
];

export default function FisherfolkVesselTable() {

  const { loading, error, data } = useQuery(VesselQueryDocument);
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
      data.vessels.map((vessel) => ({
        id: vessel.id,
        dateRegistered: new Date(vessel.createdAt),
        mfvrNum: vessel.mfvrNumber,
        name: vessel.name,
        operator: `${vessel.fisherfolk.lastName}, ${vessel.fisherfolk.firstName} ${vessel.fisherfolk.middleName} ${vessel.fisherfolk.appellation}`,
        status: '',
      }));
  }

  return (
    <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        disableVirtualization={true}
        aria-label="vessel-table"
      />
    </div>
  );
}
