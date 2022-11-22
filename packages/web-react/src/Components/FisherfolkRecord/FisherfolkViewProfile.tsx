import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
  TableBody,
  Menu,
  MenuItem,
  TablePagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

interface GearColumn {
  id: 'id' | 'registrationDate' | 'classification' | 'name' | 'status';
  label: string;
  align?: 'right';
}

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
  minWidth?: number
}

const gearColumns: readonly GearColumn[] = [
  { id: 'id', label: 'Id' },
  { id: 'registrationDate', label: 'Date Registered', align: 'right' },
  { id: 'classification', label: 'Classification', align: 'right' },
  { id: 'name', label: 'Name', align: 'right' },
  { id: 'status', label: 'Status', align: 'right' },
];

const vesselColumns: readonly VesselColumn[] = [
  { id: 'id', label: 'Id', },
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

interface InfoIProps {
  title: string;
  description: string;
}

interface InfoTitleProps {
  description: string;
}

function Info(input: InfoIProps) {
  return (
    <Stack direction="row" spacing={0.3}>
      <Typography variant="caption" color="#347fed">
        {input.title}:
      </Typography>
      <Typography variant="caption" justifyContent="flex-start">
        {input.description}
      </Typography>
    </Stack>
  );
}

function InfoTitle(input: InfoTitleProps) {
  return (
    <Stack direction="row">
      <Typography variant="caption" marginTop={1}>
        <b>{input.description}</b>
      </Typography>
    </Stack>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function GearTable() {
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
    <TableContainer
      component={Paper}
      sx={{ m: -2.5, marginLeft: -3, width: '106%' }}
    >
      <Table stickyHeader size="small" aria-label="gear-table">
        <TableHead>
          <TableRow>
            {gearColumns.map((gear) => (
              <TableCell key={gear.id} align={gear.align}>
                {gear.label}
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

function VesselTable() {
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
    <TableContainer
      component={Paper}
      sx={{ m: -2.5, marginLeft: -3, width: '106%' }}
    >
      <Table stickyHeader size="small" aria-label="vessel-table">
        <TableHead>
          <TableRow>
            {vesselColumns.map((vessel) => (
              <TableCell key={vessel.id} align={vessel.align} sx={{minWidth: 100}}>
                {vessel.label}
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
                      <TableCell key={column.id} align={column.align} sx={{minWidth: 100}}>
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

function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        justifyContent="space-between"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Boats" {...a11yProps(0)} />
          <Tab label="Gears" {...a11yProps(1)} />
        </Tabs>
        <Box m={1}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ height: 30, fontSize: 8, justifyContent: 'flex-end' }}
          >
            Add Boat/Gear
          </Button>
        </Box>
      </Grid>
      <TabPanel value={value} index={0}>
        <VesselTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GearTable />
      </TabPanel>
    </Box>
  );
}

const FisherfolkViewProfile = () => {
  return (
    <Grid container spacing={0.8}>
      <Grid item xs={12} sm={5} md={2.8}>
        <Item>
          <Stack direction="row" spacing={1}>
            <Typography>Lopez, Mar Fermin</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2">2022-0001</Typography>
            <Typography variant="body2">ACTIVE</Typography>
          </Stack>
          <InfoTitle description="Personal Information" />
          <Info title="Contact Number" description="09998018540" />
          <Info
            title="Address"
            description="Brgy. Bito-on Iloilo City, Iloilo"
          />
          <Info title="Gender" description="Male" />
          <Info title="Age" description="55" />
          <Info title="Date of Birth" description="Jan 17, 1977" />
          <Info title="Place of Birth" description="Iloilo City, Iloilo" />
          <Info title="Nationality" description="Filipino" />
          <Info title="Civil Status" description="Married" />
          <Info title="Religion" description="Catholic" />
          <Info title="Educational Background" description="College" />
          <Info title="Number of Children" description="2" />
          <Info title="Resident Year" description="1987" />
          <InfoTitle description="Person to Notify incase of Emergency" />
          <Info title="Name" description="Maria Lopez" />
          <Info title="Relationship" description="Spouse" />
          <Info title="Contact Number" description="09991627182" />
          <Info title="Address" description="Brgy. Bito-on Iloilo City" />
          <InfoTitle description="Livelihood" />
          <Info title="Main Fishing Activity" description="Capture Fishing" />
          <Info title="Other Fishing Activity" description="Fish Vending" />
          <Info title="Other Source of Income" description="None" />
          <InfoTitle description="Organization" />
          <Info title="Name" description="Small Fisherfolk Cooperatives" />
          <Info title="Member since" description="2003" />
          <Info title="Position" description="Member" />
        </Item>
      </Grid>
      <Grid item xs={12} sm={7} md={9.2}>
        <Item>
          <Grid container display="flex">
            <BasicTabs />
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default FisherfolkViewProfile;
