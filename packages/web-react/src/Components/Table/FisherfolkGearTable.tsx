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
import { useQuery } from '@apollo/client';
import { GearsQueryDocument } from '../../graphql/generated';
import Loading from '../Loading/Loading';
import { splitUpperCase } from '../../utils/utils';

interface GearColumn {
  id:
    | 'id'
    | 'registrationDate'
    | 'classification'
    | 'operator'
    | 'name'
    | 'status';
  label: string;
  align?: 'left';
}

const gearColumns: readonly GearColumn[] = [
  { id: 'id', label: 'Id' },
  { id: 'registrationDate', label: 'Date Registered' },
  { id: 'operator', label: 'Operator' },
  { id: 'classification', label: 'Classification' },
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
];

export default function FisherfolkGearTable() {
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

  const { loading, error, data } = useQuery(GearsQueryDocument, {
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
      <Table stickyHeader size="small" aria-label="gear-table" sx={{ p: 2 }}>
        <TableHead>
          <TableRow>
            {gearColumns.map((gear) => (
              <TableCell key={gear.id} align={gear.align}>
                <b>{gear.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.gears.map((gear) => {
              const { classification, createdAt, id, type, fisherfolk } = gear;
              const operator = `${fisherfolk.firstName} ${fisherfolk.middleName} ${fisherfolk.lastName} ${fisherfolk.appellation}`;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    {new Date(createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{operator}</TableCell>
                  <TableCell>{splitUpperCase(classification)}</TableCell>
                  <TableCell>{type}</TableCell>
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
        count={data === undefined ? 0 : data.totalGears}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
