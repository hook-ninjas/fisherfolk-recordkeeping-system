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
  TableRow,
} from '@mui/material';
import React from 'react';
import { SampleFisherfolkQueryDocument } from '../../graphql/generated';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { replaceUnderscore } from '../../utils/utils';
import Loading from '../Loading/Loading';

export function RecordsTable() {
  const { loading, error, data } = useQuery(SampleFisherfolkQueryDocument);

  const [drop, setDropDown] = React.useState<null | HTMLElement>(null);
  const handleDismissDropdown = () => setDropDown(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setDropDown(event.currentTarget);
  const open = Boolean(drop);

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
  }

  if (loading) {
    <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Id</b>
            </TableCell>
            <TableCell>
              <b>Date Registered</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Livelihood</b>
            </TableCell>
            <TableCell>
              <b>Contact Number</b>
            </TableCell>
            <TableCell>
              <b>Barangay</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.fisherfolks.map((fisherfolk) => {
              const {
                id,
                fullName,
                registrationDate,
                contactNum,
                mainSrcOfIncome,
                barangay,
                status,
              } = fisherfolk;
              return (
                <TableRow key={id}>
                  <TableCell component="th" scope="row" align="left">
                    {id}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(registrationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">{fullName}</TableCell>
                  <TableCell align="left">
                    {replaceUnderscore(mainSrcOfIncome!)}
                  </TableCell>
                  <TableCell align="left">{contactNum}</TableCell>
                  <TableCell align="left">{barangay}</TableCell>
                  <TableCell align="left">{status}</TableCell>
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
    </TableContainer>
  );
}

export default RecordsTable;
