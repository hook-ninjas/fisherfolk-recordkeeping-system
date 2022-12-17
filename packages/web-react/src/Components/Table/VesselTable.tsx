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
  Typography,
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FisherfolkVesselsDocument } from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

interface VesselColumn {
  id:
    | 'id'
    | 'registrationDate'
    | 'mfvrNum'
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
  align?: 'left';
}

const vesselColumns: readonly VesselColumn[] = [
  { id: 'id', label: 'Id' },
  { id: 'mfvrNum', label: 'MFVR Number' },
  { id: 'registrationDate', label: 'Date Registered' },
  { id: 'homeport', label: 'Homeport' },
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
  { id: 'type', label: 'Type' },
  { id: 'placeBuilt', label: 'Place Built' },
  { id: 'yearBuilt', label: 'Year Built' },
  { id: 'material', label: 'Material' },
  { id: 'length', label: 'Length' },
  { id: 'breadth', label: 'Breadth' },
  { id: 'depth', label: 'Depth' },
  { id: 'tonLength', label: 'Ton Length' },
  { id: 'tonBreadth', label: 'Ton Breadth' },
  { id: 'tonDepth', label: 'Ton Depth' },
  { id: 'grossTon', label: 'Gross Ton' },
  { id: 'netTon', label: 'Net Ton' },
  { id: 'engineMake', label: 'Engine Make' },
  { id: 'serialNum', label: 'Serial Number' },
  { id: 'horsepower', label: 'Horsepower' },
];

export default function VesselTable() {
  const { id } = useParams();

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

  const { loading, error, data } = useQuery(FisherfolkVesselsDocument, {
    variables: {
      fisherfolkId: id,
      start: page * rowsPerPage,
      count: rowsPerPage,
    },
  });

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (data && data?.totalFisherfolkVessels === 0) {
    return (
      <TableContainer component={Paper}>
        <Table stickyHeader size="small" aria-label="vessel-table">
          <TableHead>
            <TableRow>
              {vesselColumns.map((vessel) => (
                <TableCell key={vessel.id} align={vessel.align}>
                  <b>{vessel.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableRow
            sx={{
              height: 380,
              width: '100%',
              color: 'grey',
            }}
          >
            <TableCell align="center" colSpan={10}>
              <Typography variant="h6">No data recorded.</Typography>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small" aria-label="vessel-table">
        <TableHead>
          <TableRow>
            {vesselColumns.map((vessel) => (
              <TableCell
                key={vessel.id}
                align={vessel.align}
                sx={{ minWidth: 130 }}
              >
                <b>{vessel.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.fisherfolkVessels.map((vessel) => {
              const {
                createdAt,
                engineMake,
                grossTonnage,
                homeport,
                horsepower,
                id,
                material,
                mfvrNumber,
                name,
                netTonnage,
                placeBuilt,
                registeredBreadth,
                registeredDepth,
                registeredLength,
                serialNumber,
                tonnageBreadth,
                tonnageDepth,
                tonnageLength,
                type,
                yearBuilt,
              } = vessel;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={vessel.id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{mfvrNumber}</TableCell>
                  <TableCell>
                    {new Date(createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{homeport}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{placeBuilt}</TableCell>
                  <TableCell>{yearBuilt}</TableCell>
                  <TableCell>{material}</TableCell>
                  <TableCell>{registeredLength}</TableCell>
                  <TableCell>{registeredDepth}</TableCell>
                  <TableCell>{registeredBreadth}</TableCell>
                  <TableCell>{tonnageLength}</TableCell>
                  <TableCell>{tonnageDepth}</TableCell>
                  <TableCell>{tonnageBreadth}</TableCell>
                  <TableCell>{grossTonnage}</TableCell>
                  <TableCell>{netTonnage}</TableCell>
                  <TableCell>{engineMake}</TableCell>
                  <TableCell>{serialNumber}</TableCell>
                  <TableCell>{horsepower}</TableCell>
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
        count={data === undefined ? 0 : data.totalFisherfolkVessels}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
