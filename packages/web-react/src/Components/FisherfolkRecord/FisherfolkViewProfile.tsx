import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
} from '@mui/material';
import VesselTable from '../Table/VesselTable';
import GearTable from '../Table/GearTable';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';
import { FisherfolkStatus } from '../../graphql/generated';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

interface InfoProps {
  title: string;
  description: string;
}

interface InfoTitleProps {
  description: string;
}

function Info(input: InfoProps) {
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
            <Typography variant='h6'>Lopez, Mar Fermin</Typography>
          </Stack>
          <Stack direction="row" spacing={5}>
            <Typography variant="body2" width={200}>2022-0001</Typography>
            <FisherfolkStatusButton label={FisherfolkStatus.Active}/>
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
        <Item sx={{p: 0}}>
          <Grid container>
            <BasicTabs />
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default FisherfolkViewProfile;
