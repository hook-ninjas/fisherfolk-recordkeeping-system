import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import {
  FormInputRadio,
  FormInputText,
  FormCreatableSelect,
  FormInputSelect,
} from './FormInputFields';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateGearsDocument,
  CreateVesselDocument,
  CreateVessselWithGearDocument,
  GearClassification,
  MutationCreateVesselWithGearArgs,
  MutationCreateImageArgs,
  CreateImageDocument,
} from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import {
  createOption,
  registrationTypeForBoatsAndGears,
  gears,
  vesselTypeOptions,
  materialOptions,
} from './Enums';
import { useParams } from 'react-router-dom';

function GearForm() {
  return (
    <>
      <Typography variant="h6" color="GrayText" mt={2} mb={2} ml={2}>
        Classification of Fishing Gear
      </Typography>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Hook and Line
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={SimpleHandLine}
                      // onChange={handleOtherFishingActivityChange}
                      name="SimpleHandLine"
                      value="SimpleHandLine"
                    />
                  }
                  label="Simple-Hand Line"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={MultipleHandLine}
                      // onChange={handleOtherFishingActivityChange}
                      name="MultipleHandLine"
                      value="MultipleHandLine"
                    />
                  }
                  label="Multiple-Hand Line"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={BottomSetLongLine}
                      // onChange={handleOtherFishingActivityChange}
                      name="BottomSetLongLine"
                      value="BottomSetLongLine"
                    />
                  }
                  label="Bottom Set Long Line"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={DriftLongLine}
                      // onChange={handleOtherFishingActivityChange}
                      name="DriftLongLine"
                      value="DriftLongLine"
                    />
                  }
                  label="Drift Long Line"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={TrollLine}
                      // onChange={handleOtherFishingActivityChange}
                      name="TrollLine"
                      value="TrollLine"
                    />
                  }
                  label="Troll line"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={Jig}
                      // onChange={handleOtherFishingActivityChange}
                      name="Jig"
                      value="Jig"
                    />
                  }
                  label="Jig"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Gil Nets
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={SurfaceSetGillNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="SurfaceSetGillNet"
                      value="SurfaceSetGillNet"
                    />
                  }
                  label="Surface Set Gill Net"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={DriftGillNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="DriftGillNet"
                      value="DriftGillNet"
                    />
                  }
                  label="Drift Gill Net"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={BottomSetGillNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="BottomSetGillNet"
                      value="BottomSetGillNet"
                    />
                  }
                  label="Bottom Set Gill Net"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={TrammelNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="TrammelNet"
                      value="TrammelNet"
                    />
                  }
                  label="Trammel Net"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={EncirclingGillNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="EncirclingGillNet"
                      value="EncirclingGillNet"
                    />
                  }
                  label="Encircling Gill Net"
                />
              </FormGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Lift Nets
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={CrabLiftNetsOrBintol}
                      // onChange={handleOtherFishingActivityChange}
                      name="CrabLiftNetsOrBintol"
                      value="CrabLiftNetsOrBintol"
                    />
                  }
                  label="Crab Lift Nets (Bintol)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={FishLiftNetsOrBagnet}
                      // onChange={handleOtherFishingActivityChange}
                      name="FishLiftNetsOrBagnet"
                      value="FishLiftNetsOrBagnet"
                    />
                  }
                  label="Fish Lift Nets (Basnig) / Bagnet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={NewLookOrZapara}
                      // onChange={handleOtherFishingActivityChange}
                      name="NewLookOrZapara"
                      value="NewLookOrZapara"
                    />
                  }
                  label="“New Look” or “Zapra”"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={ShrimpLiftNets}
                      // onChange={handleOtherFishingActivityChange}
                      name="ShrimpLiftNets"
                      value="ShrimpLiftNets"
                    />
                  }
                  label="Shrimp Lift Nets"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={LeverNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="LeverNet"
                      value="LeverNet"
                    />
                  }
                  label="Lever Net"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Pots and Traps
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={CrabPots}
                      // onChange={handleOtherFishingActivityChange}
                      name="CrabPots"
                      value="CrabPots"
                    />
                  }
                  label="Crab Pots"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={SquidPots}
                      // onChange={handleOtherFishingActivityChange}
                      name="SquidPots"
                      value="SquidPots"
                    />
                  }
                  label="Squid Pots"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={FykeNetsOrFilterNets}
                      // onChange={handleOtherFishingActivityChange}
                      name="FykeNetsOrFilterNets"
                      value="FykeNetsOrFilterNets"
                    />
                  }
                  label="Fyke Nets/Filter Nets"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={FishCorralsOrBaklad}
                      // onChange={handleOtherFishingActivityChange}
                      name="FishCorralsOrBaklad"
                      value="FishCorralsOrBaklad"
                    />
                  }
                  label="Fish Corrals (Baklad)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={SetNetOrLambaklad}
                      // onChange={handleOtherFishingActivityChange}
                      name="SetNetOrLambaklad"
                      value="SetNetOrLambaklad"
                    />
                  }
                  label="Set Net (Lambaklad)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={BarrierNetOrLikus}
                      // onChange={handleOtherFishingActivityChange}
                      name="BarrierNetOrLikus"
                      value="BarrierNetOrLikus"
                    />
                  }
                  label="Barrier Net (Likus)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={FishPots}
                      // onChange={handleOtherFishingActivityChange}
                      name="FishPots"
                      value="FishPots"
                    />
                  }
                  label="Fish Pots"
                />
              </FormGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Seine Nets
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={BeachSeine}
                      // onChange={handleOtherFishingActivityChange}
                      name="BeachSeine"
                      value="BeachSeine"
                    />
                  }
                  label="Beach Seine"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={FryDozerOrGatherer}
                      // onChange={handleOtherFishingActivityChange}
                      name="FryDozerOrGatherer"
                      value="FryDozerOrGatherer"
                    />
                  }
                  label="Fry Dozer or Gatherer"
                />
              </FormGroup>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Scoop Nets
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={ManPushNets}
                      // onChange={handleOtherFishingActivityChange}
                      name="ManPushNets"
                      value="ManPushNets"
                    />
                  }
                  label="Man Push Nets"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={ScoopNets}
                      // onChange={handleOtherFishingActivityChange}
                      name="ScoopNets"
                      value="ScoopNets"
                    />
                  }
                  label="Scoop Nets"
                />
              </FormGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Miscellaneous Fishing Gears
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={Spear}
                      // onChange={handleOtherFishingActivityChange}
                      name="Spear"
                      value="Spear"
                    />
                  }
                  label="Spear"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={OctopusOrSquidLuringDevice}
                      // onChange={handleOtherFishingActivityChange}
                      name="OctopusOrSquidLuringDevice"
                      value="OctopusOrSquidLuringDevice"
                    />
                  }
                  label="Octopus/Squid Luring Device"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={GaffHook}
                      // onChange={handleOtherFishingActivityChange}
                      name="GaffHook"
                      value="GaffHook"
                    />
                  }
                  label="Gaff Hook"
                />
              </FormGroup>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Falling Gear
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={CastNet}
                      // onChange={handleOtherFishingActivityChange}
                      name="CastNet"
                      value="CastNet"
                    />
                  }
                  label="Cast Net"
                />
              </FormGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default GearForm;
