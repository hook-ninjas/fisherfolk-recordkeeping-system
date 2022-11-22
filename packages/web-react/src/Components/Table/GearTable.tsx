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
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface GearColumn {
  id: 'id' | 'registrationDate' | 'classification' | 'name' | 'status';
  label: string;
  align?: 'right';
}

const gearColumns: readonly GearColumn[] = [
  { id: 'id', label: 'Id' },
  { id: 'registrationDate', label: 'Date Registered', align: 'right' },
  { id: 'classification', label: 'Classification', align: 'right' },
  { id: 'name', label: 'Name', align: 'right' },
  { id: 'status', label: 'Status', align: 'right' },
];

const gears = {
  data: [
    {
      id: '10001',
      registrationDate: '2022-06-28T00:00:00.00',
      classification: 'Hook and Line',
      name: 'Simple',
      status: 'Active',
    },
    {
      id: '10001',
      registrationDate: '2022-06-28T00:00:00.00',
      classification: 'Hook and Line',
      name: 'Simple',
      status: 'Active',
    },
  ],
};

export default function GearTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small" aria-label="gear-table">
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
          {gears &&
            gears.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((gear) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={gear.id}>
                    {gearColumns.map((column) => {
                      const value = gear[column.id];
                      const formattedDate = new Date(
                        gear[column.id]
                      ).toLocaleDateString();
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'registrationDate'
                            ? formattedDate
                            : value}
                        </TableCell>
                      );
                    })}
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
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={gears.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
