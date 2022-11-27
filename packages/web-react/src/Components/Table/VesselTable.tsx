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
  align?: 'right';
}

const vesselColumns: readonly VesselColumn[] = [
  { id: 'id', label: 'Id' },
  { id: 'mfvrNum', label: 'MFVR Number', align: 'right' },
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
    <Loading />;
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
                sx={{ minWidth: 100 }}
              >
                <b>{vessel.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
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
                <TableCell sx={{minWidth: 100}}>{id}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{mfvrNumber}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>
                  {new Date(createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{homeport}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{name}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}></TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{type}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{placeBuilt}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{yearBuilt}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{material}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{registeredLength}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{registeredDepth}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{registeredBreadth}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{tonnageLength}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{tonnageDepth}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{tonnageBreadth}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{grossTonnage}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{netTonnage}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{engineMake}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{serialNumber}</TableCell>
                <TableCell align='right' sx={{minWidth: 100}}>{horsepower}</TableCell>
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
