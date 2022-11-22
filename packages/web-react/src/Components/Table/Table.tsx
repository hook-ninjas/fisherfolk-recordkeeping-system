import { useQuery } from '@apollo/client';
import {
  Button,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';
// import { SampleFisherfolkQueryDocument } from '../../graphql/generated';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'id' | 'registrationDate' | 'name' |'contactNum' | 'mainSrcOfIncome' | 'barangay' | 'status';
  label: string;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id'},
  { id: 'registrationDate', label: 'Date Registered', align: 'right' },
  { id: 'name', label: 'Name', align: 'right' },
  { id: 'contactNum', label: 'Contact Number', align: 'right' },
  { id: 'mainSrcOfIncome', label: 'Livelihood', align: 'right' },
  { id: 'barangay', label: 'Barangay', align: 'right' },
  { id: 'status', label: 'Status', align: 'right' },
];

export function RecordsTable() {
  // const { loading, error, data } = useQuery(SampleFisherfolkQueryDocument);
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [drop, setDropDown] = React.useState<null | HTMLElement>(null);
  const handleDismissDropdown = () => setDropDown(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDown(event.currentTarget);
  const open = Boolean(drop);

  // if (error) {
  //   console.log(error);
  //   return <h1>Error Failed to Fetch!!!</h1>;
  // }

  // if (loading) {
  //   <Loading />;
  // }

  const handleViewProfile = (id: string) => () => {
    navigate(`/fisherfolk-profile/${id}`);
  };

  // for display purposes
  const data = {
    fisherfolks: [
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
      {
        id: '099',
        name: 'Jerome Ponce',
        registrationDate: '2022-06-28T00:00:00.00',
        contactNum: '09998018530',
        mainSrcOfIncome: 'Capture Fishing',
        barangay: 'Brgy. Baldoza',
        status: 'Active',
      },
    ],
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}>
                <b>{column.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.fisherfolks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((fisherfolk) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={fisherfolk.id}>
                    {columns.map((column) => {
                      const value = fisherfolk[column.id];
                      const formattedDate = new Date(fisherfolk[column.id]).toLocaleDateString();
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'registrationDate' ? formattedDate : value}
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
                        <MenuItem onClick={handleViewProfile(fisherfolk.id)}>View</MenuItem>
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
        count={data.fisherfolks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default RecordsTable;
