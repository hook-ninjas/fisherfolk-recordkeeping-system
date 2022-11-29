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
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { QueryFisherfolkByRangeDocument } from '../../graphql/generated';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';
import { splitUpperCase } from '../../utils/utils';

interface Column {
  id:
    | 'id'
    | 'registrationDate'
    | 'name'
    | 'contactNum'
    | 'livelihood'
    | 'barangay'
    | 'status';
  label: string;
  align?: 'right' | 'left';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id' },
  { id: 'registrationDate', label: 'Date Registered', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'contactNum', label: 'Contact Number', align: 'left' },
  { id: 'livelihood', label: 'Livelihood', align: 'left' },
  { id: 'barangay', label: 'Barangay', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
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
  const handleDismissDropdown = () => setDropDown(null);
  const [fisherfolkId, setFisherfolkId] = useState();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDown(event.currentTarget);
  const open = Boolean(drop);

  const handleViewProfile = (id: string) => () => {
    navigate(`/fisherfolk-profile/${id}`);
  };

  const { loading, error, data } = useQuery(QueryFisherfolkByRangeDocument, {
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
      <Table
        stickyHeader
        sx={{ minWidth: 650, p: 2, }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
              >
                <b>{column.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.fisherfolkByRange.map((fisherfolk) => {
              const {
                id,
                registrationDate,
                barangay,
                contactNum,
                status,
                firstName,
                lastName,
                middleName,
                appellation,
                livelihoods,
              } = fisherfolk;
              const name = `${lastName}, ${firstName} ${middleName} ${appellation}`;
              const livelihood =
                livelihoods == null ? '' : livelihoods[0]?.type;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    {new Date(registrationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{contactNum}</TableCell>
                  <TableCell>{splitUpperCase(livelihood!)}</TableCell>
                  <TableCell>{barangay}</TableCell>
                  <TableCell>
                    <FisherfolkStatusButton label={status} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(e) => {
                        handleClick(e);
                        setFisherfolkId(id);
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
                      <MenuItem onClick={handleViewProfile(fisherfolkId!)}>
                        View
                      </MenuItem>
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
        count={data === undefined ? 0 : data.totalFisherfolk}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default FisherfolkTable;
