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

interface VesselColumn {
    id:
      | 'id'
      | 'registrationDate'
      | 'homeport'
      | 'name'
      | 'status'
      | 'type'
      | 'placeBuilt'
      | 'yearBuilt'
      | 'material'
      | 'length'
      | 'breadth'
      | 'depth'
      | 'tonLength'
      | 'tonBreadth'
      | 'tonDepth'
      | 'grossTon'
      | 'netTon'
      | 'engineMake'
      | 'serialNum'
      | 'horsepower';
    label: string;
    align?: 'right';
  }

const vesselColumns: readonly VesselColumn[] = [
  { id: 'id', label: 'Id' },
  { id: 'registrationDate', label: 'Date Registered', align: 'right' },
  { id: 'homeport', label: 'Homeport', align: 'right' },
  { id: 'name', label: 'Name', align: 'right' },
  { id: 'status', label: 'Status', align: 'right' },
  { id: 'type', label: 'Type', align: 'right' },
  { id: 'placeBuilt', label: 'Place Built', align: 'right' },
  { id: 'yearBuilt', label: 'Year Built', align: 'right' },
  { id: 'material', label: 'Material', align: 'right' },
  { id: 'length', label: 'Length', align: 'right' },
  { id: 'breadth', label: 'Breadth', align: 'right' },
  { id: 'depth', label: 'Depth', align: 'right' },
  { id: 'tonLength', label: 'Ton Length', align: 'right' },
  { id: 'tonBreadth', label: 'Ton Breadth', align: 'right' },
  { id: 'tonDepth', label: 'Ton Depth', align: 'right' },
  { id: 'grossTon', label: 'Gross Ton', align: 'right' },
  { id: 'netTon', label: 'Net Ton', align: 'right' },
  { id: 'engineMake', label: 'Engine Make', align: 'right' },
  { id: 'serialNum', label: 'Serial Number', align: 'right' },
  { id: 'horsepower', label: 'Horsepower', align: 'right' },
];
  
const vessels = {
  data: [
    {
      id: '10001',
      registrationDate: '2022-06-28T00:00:00.00',
      homeport: 'Iloilo',
      name: 'J&J',
      status: 'Active',
      type: 'Motorized',
      placeBuilt: 'Iloilo',
      yearBuilt: 2019,
      material: 'Wood',
      length: 3.4,
      breadth: 2.3,
      depth: 1.2,
      tonLength: 3.4,
      tonBreadth: 2.3,
      tonDepth: 1.2,
      grossTon: 4,
      netTon: 2,
      engineMake: 'SDGDSGD',
      serialNum: 'JXSAJXNAJ09',
      horsepower: 2000,
    },
  ],
};

export default function VesselTable() {
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
      <Table stickyHeader size="small" aria-label="vessel-table">
        <TableHead>
          <TableRow>
            {vesselColumns.map((vessel) => (
              <TableCell
                key={vessel.id}
                align={vessel.align}
                sx={{ minWidth: 100 }}
              >
                <b>{vessel.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <TableBody>
        {vessels &&
            vessels.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vessel) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={vessel.id}>
                    {vesselColumns.map((column) => {
                      const value = vessel[column.id];
                      const formattedDate = new Date(
                        vessel[column.id]
                      ).toLocaleDateString();
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ minWidth: 100 }}
                        >
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={vessels.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}