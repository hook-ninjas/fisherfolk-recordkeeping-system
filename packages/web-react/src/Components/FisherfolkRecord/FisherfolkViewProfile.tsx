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
import AddVesselWithGearForm from '../Forms/AddVesselWithGearForms';
import { FisherfolkByIdDocument } from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { splitUpperCase } from '../../utils/utils';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

interface InfoProps {
  title: string;
  description: string | number | undefined;
}

interface InfoTitleProps {
  description: string;
}

function Info(input: InfoProps) {
  return (
    <Stack direction="row" spacing={0.3}>
      <Typography variant="caption" color="grey">
        <b>{input.title}</b>:
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
      <Typography variant="caption" marginTop={1} color="rgb(22,181,61)">
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
  const [addVesselGearBtn, setAddGearsBtn] = useState(false);
  const handleAddMemberOpen = () => setAddGearsBtn(true);
  const handleAddVesselGearClose = () => setAddGearsBtn(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

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
            variant="contained"
            sx={{ height: 30, background: '#28c181' }}
            onClick={handleAddMemberOpen}
          >
            Add Boat/Gear
          </Button>
          {addVesselGearBtn && (
            <AddVesselWithGearForm
              handleClose={handleAddVesselGearClose}
              open={addVesselGearBtn}
            />
          )}
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
  const { id } = useParams();

  if (id == undefined) {
    throw 'Ffolk does not exist';
  }

  const {
    loading,
    error,
    data: { fisherfolk } = {},
  } = useQuery(FisherfolkByIdDocument, {
    variables: {
      fisherfolkId: parseInt(id),
    },
  });

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
  }

  if (loading) {
    return (
      <Grid container spacing={0.8}>
        <Grid item xs={12} sm={5} md={2.8}>
          <Item>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6"></Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Typography variant="body2" width={200}>
                ID:
              </Typography>
            </Stack>
            <InfoTitle description="Personal Information" />
            <Info title="Contact Number" description="" />
            <Info title="Address" description="" />
            <Info title="Gender" description="" />
            <Info title="Age" description="" />
            <Info title="Date of Birth" description="" />
            <Info title="Place of Birth" description="" />
            <Info title="Nationality" description="" />
            <Info title="Civil Status" description="" />
            <Info title="Religion" description="" />
            <Info title="Educational Background" description="" />
            <Info title="Number of Children" description="" />
            <Info title="Resident Year" description="" />
            <InfoTitle description="Person to Notify incase of Emergency" />
            <Info title="Name" description="" />
            <Info title="Relationship" description="" />
            <Info title="Contact Number" description="" />
            <Info title="Address" description="" />
            <InfoTitle description="Livelihood" />
            <Info title="Main Fishing Activity" description="" />
            <Info title="Other Fishing Activity" description="" />
            <Info title="Other Source of Income" description="" />
            <InfoTitle description="Organization" />
            <Info title="Name" description="" />
            <Info title="Member since" description="" />
            <Info title="Position" description="" />
          </Item>
        </Grid>
        <Grid item xs={12} sm={7} md={9.2}>
          <Item sx={{ p: 0 }}>
            <Grid container>
              <BasicTabs />
            </Grid>
          </Item>
        </Grid>
      </Grid>
    );
  }

  const name = `${fisherfolk?.lastName}, ${fisherfolk?.firstName} ${fisherfolk?.middleName} ${fisherfolk?.appellation}`;

  const address = `${fisherfolk?.barangay} ${fisherfolk?.cityMunicipality}, ${fisherfolk?.province}`;

  const mainFishingActivity =
    fisherfolk?.livelihoods == null
      ? ''
      : splitUpperCase(
        fisherfolk?.livelihoods.filter((a) => a?.isMain)[0]?.type
      );

  const otherFishingActivity =
    fisherfolk?.livelihoods == null
      ? ''
      : splitUpperCase(
        fisherfolk?.livelihoods.filter(
          (a) => a?.isMain === false && a.type !== 'Others'
        )[0]?.type
      );

  const otherSourceOfIncome =
    fisherfolk?.livelihoods == null
      ? ''
      : splitUpperCase(
        fisherfolk?.livelihoods.filter(
          (a) => a?.isMain === false && a.type === 'Others'
        )[0]?.description
      );

  const orgName =
    fisherfolk?.organizations == null
      ? ''
      : fisherfolk?.organizations[0]?.organization.name;

  const yearJoined =
    fisherfolk?.organizations == null
      ? ''
      : fisherfolk?.organizations[0]?.yearJoined.toString();

  const position =
    fisherfolk?.organizations == null
      ? ''
      : fisherfolk?.organizations[0]?.position;

  return (
    <Grid container spacing={0.8}>
      <Grid item xs={12} sm={5} md={2.8}>
        <Item>
          <Stack direction="row" spacing={1} mb={0.5}>
            <Typography variant="body1">{name}</Typography>
          </Stack>
          <Stack direction="row" spacing={3} mb={1.5}>
            <Typography variant="body2" width={200}>
              ID: {id}
            </Typography>
            <FisherfolkStatusButton label={fisherfolk?.status} />
          </Stack>
          <InfoTitle description="Personal Information" />
          <Info title="Contact Number" description={fisherfolk?.contactNum} />
          <Info title="Address" description={address} />
          <Info title="Gender" description={fisherfolk?.gender} />
          <Info title="Age" description={fisherfolk?.age} />
          <Info
            title="Date of Birth"
            description={new Date(fisherfolk?.dateOfBirth).toLocaleDateString()}
          />
          <Info title="Place of Birth" description={fisherfolk?.placeOfBirth} />
          <Info title="Nationality" description={fisherfolk?.nationality} />
          <Info
            title="Civil Status"
            description={splitUpperCase(fisherfolk?.civilStatus)}
          />
          <Info title="Religion" description={fisherfolk?.religion} />
          <Info
            title="Educational Background"
            description={splitUpperCase(fisherfolk?.educationalBackground)}
          />
          <Info
            title="Number of Children"
            description={fisherfolk?.numOfChildren}
          />
          <Info
            title="Resident Year"
            description={fisherfolk?.residentYear}
          />
          <InfoTitle description="Person to Notify incase of Emergency" />
          <Info title="Name" description={fisherfolk?.personToNotify} />
          <Info
            title="Relationship"
            description={fisherfolk?.ptnRelationship}
          />
          <Info
            title="Contact Number"
            description={fisherfolk?.ptnContactNum}
          />
          <Info title="Address" description={fisherfolk?.ptnAddress} />
          <InfoTitle description="Livelihood" />
          <Info
            title="Main Fishing Activity"
            description={mainFishingActivity}
          />
          <Info
            title="Other Fishing Activity"
            description={otherFishingActivity}
          />
          <Info
            title="Other Source of Income"
            description={otherSourceOfIncome}
          />
          <InfoTitle description="Organization" />
          <Info title="Name" description={orgName} />
          <Info title="Member since" description={yearJoined} />
          <Info title="Position" description={position} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={7} md={9.2}>
        <Item sx={{ p: 0 }}>
          <Grid container>
            <BasicTabs />
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default FisherfolkViewProfile;
