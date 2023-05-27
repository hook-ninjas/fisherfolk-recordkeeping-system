import React from 'react';
import { useState } from 'react';
import { Box, Grid, Stack, Typography, Alert } from '@mui/material';
import VesselTable from '../Table/VesselTable';
import GearTable from '../Table/GearTable';
import { FisherfolkStatusButton } from '../Buttons/CustomStatusButton';
import AddVesselWithGearForm from '../Forms/AddVesselWithGearForms';
import {
  FisherfolkByIdDocument,
  SourceOfIncome,
} from '../../graphql/generated';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { splitUpperCase } from '../../utils/utils';
import { CustomAddButton, CustomBtnText } from '../Buttons/CustomAddButton';
import AddIcon from '@mui/icons-material/Add';
import BasicTabs, { Item } from '../Tab/BasicTab';

interface InfoProps {
  title: string;
  description: string | number | undefined | (string | undefined)[];
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

const FisherfolkViewProfile = () => {
  const { id } = useParams();

  if (id == undefined) {
    throw 'Ffolk does not exist';
  }
  const [addVesselGearBtn, setAddGearsBtn] = useState(false);
  const handleAddMemberOpen = () => setAddGearsBtn(true);
  const handleAddVesselGearClose = () => setAddGearsBtn(false);

  const AddBoatGearBtn = () => (
    <Box m={1}>
      <CustomAddButton
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleAddMemberOpen}
      >
        <CustomBtnText> Add Boat/Gear</CustomBtnText>
      </CustomAddButton>
      {addVesselGearBtn && (
        <AddVesselWithGearForm
          handleClose={handleAddVesselGearClose}
          open={addVesselGearBtn}
        />
      )}
    </Box>
  );

  const { loading, error, data } = useQuery(FisherfolkByIdDocument, {
    variables: {
      fisherfolkId: parseInt(id),
    },
  });

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
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
              <BasicTabs
                tab1Label="Boats"
                tab2Label="Gears"
                tabelPanel1={<VesselTable />}
                tabelPanel2={<GearTable />}
                button={<AddBoatGearBtn />}
              />
            </Grid>
          </Item>
        </Grid>
      </Grid>
    );
  }

  const {
    age,
    appellation,
    barangay,
    cityMunicipality,
    civilStatus,
    contactNum,
    dateOfBirth,
    educationalBackground,
    firstName,
    gender,
    lastName,
    livelihoods,
    middleName,
    nationality,
    numOfChildren,
    organizations,
    personToNotify,
    placeOfBirth,
    province,
    ptnAddress,
    ptnContactNum,
    ptnRelationship,
    religion,
    residentYear,
    status,
  } = data!.fisherfolk;

  const image = data?.fisherfolkPhoto?.[0]?.url;
  const name = `${lastName}, ${firstName} ${middleName} ${appellation}`;
  const address = `${barangay} ${cityMunicipality}, ${province}`;
  const organization = organizations[0];

  const fishingActMain = (isMain: boolean) =>
    livelihoods.filter((a) => a.isMain == isMain);

  const fishingActOther = (isMain: boolean, type: SourceOfIncome) =>
    livelihoods.find((a) => a.isMain == isMain && a.type == type);

  const mainFishingActivity = splitUpperCase(fishingActMain(true)[0].type);

  const otherFishingActivities = fishingActMain(false).map((a) =>
    splitUpperCase(a.type)
  );

  const otherSourceOfIncome = splitUpperCase(
    fishingActOther(false, SourceOfIncome.Others)?.description
  );

  const orgName = organization?.organization.name;

  const yearJoined = organization?.yearJoined.toString();

  const position = organization?.position;

  return (
    <Grid container spacing={0.8}>
      <Grid item xs={12} sm={5} md={2.8}>
        <Item>
          <Stack direction="row" spacing={2} mb={1} alignItems={'center'}>
            <Box sx={{ width: 80, height: 80 }} mt={2}>
              <img src={image} width={80} height={80} />
            </Box>
            <Typography variant="body1">{name}</Typography>
          </Stack>
          <Stack direction="row" spacing={3} mb={1.5} padding={1}>
            <Typography variant="body2" width={200}>
              ID: {id}
            </Typography>
            <FisherfolkStatusButton label={status} />
          </Stack>
          <InfoTitle description="Personal Information" />
          <Info title="Contact Number" description={contactNum} />
          <Info title="Address" description={address} />
          <Info title="Gender" description={gender} />
          <Info title="Age" description={age} />
          <Info
            title="Date of Birth"
            description={new Date(dateOfBirth).toLocaleDateString()}
          />
          <Info title="Place of Birth" description={placeOfBirth} />
          <Info title="Nationality" description={nationality} />
          <Info
            title="Civil Status"
            description={splitUpperCase(civilStatus)}
          />
          <Info title="Religion" description={religion} />
          <Info
            title="Educational Background"
            description={splitUpperCase(educationalBackground)}
          />
          <Info title="Number of Children" description={numOfChildren} />
          <Info title="Resident Year" description={residentYear} />
          <InfoTitle description="Person to Notify incase of Emergency" />
          <Info title="Name" description={personToNotify} />
          <Info title="Relationship" description={ptnRelationship} />
          <Info title="Contact Number" description={ptnContactNum} />
          <Info title="Address" description={ptnAddress} />
          <InfoTitle description="Livelihood" />
          <Info
            title="Main Fishing Activity"
            description={mainFishingActivity}
          />
          <Info
            title="Other Fishing Activity"
            description={otherFishingActivities}
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
            <BasicTabs
              tab1Label="Boats"
              tab2Label="Gears"
              tabelPanel1={<VesselTable />}
              tabelPanel2={<GearTable />}
              button={<AddBoatGearBtn />}
            />
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
};

export default FisherfolkViewProfile;
