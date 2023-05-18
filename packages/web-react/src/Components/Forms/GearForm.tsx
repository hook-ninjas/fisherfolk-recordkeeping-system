import React from 'react';
import {
  Box,
  FormGroup,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import { FormInputText, FormInputCheckbox } from './FormInputFields';
import { UseFormRegister, Control, FieldValues } from 'react-hook-form';

interface GearFormProps {
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

interface GearCheckboxProps {
  name: string;
  keyId: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  shouldUnregister?: boolean;
  defaultValue: any;
}

const gearOptions = {
  hookAndLine: [
    'Simple Hand Line',
    'Multiple Hand Line',
    'Bottom Set Long Line',
    'Drift Long Line',
    'Troll Line',
    'Jig',
  ],
  gillNets: [
    'Surface Set Gill Net',
    'Drift Gill Net',
    'Bottom Set Gill Net',
    'Trammel Net',
    'Encircling Gill Net',
  ],
  liftNets: [
    'Crab Lift Nets/Bintol',
    'Fish Lift Nets/Bagnet',
    'New Look/Zapara',
    'Shrimp Lift Nets',
    'Lever Net',
  ],
  potsAndTraps: [
    'CrabPots',
    'SquidPots',
    'FykeNetsOrFilterNets',
    'FishCorralsOrBaklad',
    'SetNetOrLambaklad',
    'BarrierNetOrLikus',
    'FishPots',
  ],
  seineNets: ['BeachSeine', 'FryDozerOrGatherer'],
  scoopNets: ['ManPushNets', 'ScoopNets'],
  fallingGear: ['CastNet'],
  miscellaneous: ['Spear', 'OctopusOrSquidLuringDevice', 'GaffHook'],
};

const createGearCheckBox = ({
  name,
  keyId,
  type,
  defaultValue,
  register,
  shouldUnregister,
}: GearCheckboxProps) => {
  return (
    <FormInputCheckbox
      keyId={keyId}
      name={name}
      label={type}
      value={type}
      defaultValue={defaultValue}
      register={register}
      shouldUnregister={shouldUnregister}
    />
  );
};

function GearForm({ control, register, errors }: GearFormProps) {
  const hookAndLineCheckboxes = gearOptions['hookAndLine'].map((type, index) =>
    createGearCheckBox({
      name: 'gears.hookAndLine',
      keyId: `${type}-${index}`,
      defaultValue: '',
      type: type,
      register: register,
      shouldUnregister: true,
    })
  );

  const gillNetCheckboxes = gearOptions['gillNets'].map((type, index) =>
    createGearCheckBox({
      name: 'gears.Nets',
      keyId: `${type}-${index}`,
      defaultValue: '',
      type: type,
      register: register,
      shouldUnregister: true,
    })
  );

  const liftNetsCheckboxes = gearOptions['liftNets'].map((type, index) =>
    createGearCheckBox({
      name: 'gears.LiftNets',
      keyId: `${type}-${index}`,
      defaultValue: '',
      type: type,
      register: register,
      shouldUnregister: true,
    })
  );

  const potsAndTrapsCheckboxes = gearOptions['potsAndTraps'].map(
    (type, index) =>
      createGearCheckBox({
        name: 'gears.potsAndTraps',
        keyId: `${type}-${index}`,
        defaultValue: '',
        type: type,
        register: register,
        shouldUnregister: true,
      })
  );

  const seineNetsCheckboxes = gearOptions['seineNets'].map((type, index) =>
    createGearCheckBox({
      name: 'gears.seineNets',
      keyId: `${type}-${index}`,
      defaultValue: '',
      type: type,
      register: register,
      shouldUnregister: true,
    })
  );

  const scoopNetsCheckboxes = gearOptions['scoopNets'].map((type, index) =>
    createGearCheckBox({
      name: 'gears.scoopNets',
      keyId: `${type}-${index}`,
      defaultValue: '',
      type: type,
      register: register,
      shouldUnregister: true,
    })
  );

  const fallingGearCheckboxes = gearOptions['fallingGear'].map((type, index) =>
    createGearCheckBox({
      name: 'gears.fallingGear',
      keyId: `${type}-${index}`,
      defaultValue: '',
      type: type,
      register: register,
      shouldUnregister: true,
    })
  );

  const miscellaneousCheckboxes = gearOptions['miscellaneous'].map(
    (type, index) =>
      createGearCheckBox({
        name: 'gears.miscellaneous',
        keyId: `${type}-${index}`,
        defaultValue: '',
        type: type,
        register: register,
        shouldUnregister: true,
      })
  );

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
              <FormGroup>{hookAndLineCheckboxes}</FormGroup>
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
              <FormGroup>{gillNetCheckboxes}</FormGroup>
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
              <FormGroup>{liftNetsCheckboxes}</FormGroup>
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
              <FormGroup>{potsAndTrapsCheckboxes}</FormGroup>
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
              <FormGroup>{seineNetsCheckboxes}</FormGroup>
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
              <FormGroup>{scoopNetsCheckboxes}</FormGroup>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
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
              <FormGroup>{fallingGearCheckboxes}</FormGroup>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
              Miscellaneous
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: -3,
                mb: 2,
                pl: 1,
              }}
            >
              <FormGroup>{miscellaneousCheckboxes}</FormGroup>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <FormHelperText>If not in the ff: please Specify:</FormHelperText>
            <FormInputText
              name="gears.others"
              control={control}
              label="Others"
              placeholder=""
              defaultValue=""
              register={register}
              errors={errors}
            />
          </Grid>
        </Grid>
      </Grid>
      <FormHelperText
        error={!!errors['gears']}
        // hidden={false}
        hidden={!errors['gears']}
        sx={{ fontSize: 15, ml: 2, mt: 2 }}
      >
        {errors['gears']?.message}
      </FormHelperText>
    </>
  );
}

export default GearForm;
