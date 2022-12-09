import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import {QueryFisherfolksDocument } from '../../graphql/generated';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';
import { splitUpperCase } from '../../utils/utils';
import { DataGrid, GridColumns, GridRowsProp} from '@mui/x-data-grid';
import { Button, Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
        id="gear-action-btn"
        aria-controls={open ? 'gear-action-btn' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
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
          <VisibilityIcon /> View
        </MenuItem>
        <MenuItem disableRipple>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem disableRipple>
          <ArchiveIcon /> Archive
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
    disableColumnMenu: true
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 190,
    disableColumnMenu: true
  },
  { field: 'contactNumber', headerName: 'Contact Number', minWidth: 150, disableColumnMenu: true, sortable: false },
  { field: 'livelihood', headerName: 'LiveliHood', minWidth: 130, disableColumnMenu: true },
  { field: 'barangay', headerName: 'Barangay', minWidth: 150, disableColumnMenu: true },
  {
    field: 'status', headerName: 'Status', disableColumnMenu: true, minWidth: 80,
    valueGetter(params) {
      return params.row.status
    }, renderCell(params) {
      return <FisherfolkStatusButton label={params.row.status} />
    },
  },
  { field: 'actions', headerName: '', disableColumnMenu: true, renderCell: renderMoreActions, sortable: false, },
];
export function FisherfolkTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [drop, setDropDown] = useState<null | HTMLElement>(null);
  const [dropFilter, setDropDownFilter] = useState<null | HTMLElement>(null);

  const open = Boolean(drop);
  const openFilter = Boolean(dropFilter);
  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDownFilter(event.currentTarget);
  const handleViewProfile = (id: string) => () => {
    navigate(`/fisherfolk-profile/${id}`);
  };





  const { loading, error, data } = useQuery(QueryFisherfolksDocument);

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
  }

  if (loading) {
    <Loading />;
  }
  let rows: GridRowsProp = [];

  if (data !== undefined) {
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
      />
    </div>
  );
}

export default FisherfolkTable;
