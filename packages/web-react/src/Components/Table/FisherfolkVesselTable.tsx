import {
  Paper,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TablePagination,
} from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { VesselQueryDocument } from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';

interface VesselColumn {
  id:
    | 'id'
    | 'registrationDate'
    | 'mfvrNum'
    | 'name'
    | 'status'
    | 'operator'
    | 'type'
  label: string;
  align?: 'left';
}

const vesselColumns: readonly VesselColumn[] = [
  { id: 'id', label: 'Id',},
  { id: 'registrationDate', label: 'Date Registered'},
  { id: 'mfvrNum', label: 'MFVR Number'},
  { id: 'operator', label: 'Operator'},
  { id: 'name', label: 'Name'},
  { id: 'type', label: 'Type'},
  { id: 'status', label: 'Status'},
];

export default function FisherfolkVesselTable() {
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
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null);
  const handleDismissDropdown = () => setDropDown(null);
  const open = Boolean(drop);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDown(event.currentTarget);

  const { loading, error, data } = useQuery(VesselQueryDocument, {
    variables: {
      start: page * rowsPerPage,
      count: rowsPerPage,
    },
  });

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
  }

  if (loading) {
    <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small" aria-label="vessel-table" sx={{p: 2}}>
        <TableHead>
          <TableRow>
            {vesselColumns.map((vessel) => (
              <TableCell
                key={vessel.id}
                align={vessel.align}
              >
                <b>{vessel.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
          data.vessels.map((vessel) => {
            const { createdAt, id, mfvrNumber, name, type, fisherfolk } =
              vessel;
            const operator = `${fisherfolk.lastName}, ${fisherfolk.firstName} ${fisherfolk.middleName} ${fisherfolk.appellation}`;
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  {new Date(createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell >
                  {mfvrNumber}
                </TableCell>
                <TableCell>
                  {operator}
                </TableCell>
                <TableCell>
                  {name}
                </TableCell>
                <TableCell>
                  {type}
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                    style={{ color: '#808080' }}
                  >
                    <MoreVertIcon />
                  </Button>{' '}
                  <Menu
                    id="dropdwown-menu"
                    anchorEl={drop}
                    open={open}
                    onClose={handleDismissDropdown}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  > 
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Archive</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data === undefined ? 0 : data.totalVessels}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
