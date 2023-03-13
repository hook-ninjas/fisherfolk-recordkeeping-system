import React from 'react';
import { UseFormRegister, Control, FieldValues } from 'react-hook-form';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import {
  FormInputRadio,
  FormInputText,
  FormInputSelect,
  FormInputAutoText,
} from './FormInputFields';
import {
  registrationTypeForBoatsAndGears,
  materialOptions,
} from './Enums';

interface VesselFormProps {
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

const vesselType = ['Non-Motorized', 'Motorized'];

function VesselForm({ control, register, errors }: VesselFormProps) {
  // const [vesselTypes, setVesselTypes] = useState(vesselTypeOptions);
  // const [isLoading, setIsLoading] = useState(false);

  // const handleCreateTypeVessel = (inputValue: string) => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     const newValue = createOption(inputValue);
  //     setIsLoading(false);
  //     setVesselTypes((prev) => [...prev, newValue]);
  //   }, 1500);
  // };

  return (
    <>
      <Typography variant="body1" color="GrayText" mb={2} ml={2}>
        Type of Registration
      </Typography>
      <Box
        sx={{
          display: 'flex',
          pl: 2,
          mt: -2,
        }}
      >
        <FormInputRadio
          name="registrationType"
          label="registrationType"
          control={control}
          register={register}
          errors={errors}
          radioOptions={registrationTypeForBoatsAndGears}
          defaultValue=""
          shouldUnregister
        />
      </Box>

      <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="mfvrNumber"
            control={control}
            label="MFVR Number"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="homeport"
            control={control}
            label="Homeport"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="name"
            control={control}
            label="Name of Fishing Vessel"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid item sm={6} sx={{ mt: 2 }}>
          <FormInputSelect
            name="material"
            label="Select Material Used"
            data={materialOptions}
            control={control}
            register={register}
            errors={errors}
            defaultValue=""
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6} sx={{ mt: 2 }}>
          <FormInputAutoText
            sx={{ marginTop: -1.5, width: 220 }}
            freeSolo
            name="type"
            control={control}
            defaultValue=""
            label="type"
            placeholder="Motorized"
            options={vesselType}
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6} sx={{ mt: 1 }}>
          <FormInputText
            name="placeBuilt"
            control={control}
            label="Place Built"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6} sx={{ mt: 1, ml: 0 }}>
          <FormInputText
            name="yearBuilt"
            control={control}
            label="Year Built"
            placeholder="e.g. 2020"
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Typography variant="body1" color="GrayText" mb={2} ml={2} mt={2}>
        Fishing Vessel Dimensions and Tonnages (Meters)
      </Typography>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="registeredLength"
            control={control}
            label="Registered Length"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="registeredDepth"
            control={control}
            label="Registered Depth"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="registeredBreadth"
            control={control}
            label="Registered Breadth"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="tonnageLength"
            control={control}
            label="Tonnage Length"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="tonnageDepth"
            control={control}
            label="Tonnage Depth"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="tonnageBreadth"
            control={control}
            label="Tonnage Breadth"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="grossTonnage"
            control={control}
            label="Gross Tonnage"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="netTonnage"
            control={control}
            label="Net Tonnage"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Typography variant="body1" color="GrayText" ml={2} mt={2} mb={2}>
        Particulars of Propulsion System
      </Typography>
      <Grid container spacing={-2} sx={{ ml: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="engineMake"
            control={control}
            label="Engine Make"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="serialNumber"
            control={control}
            label="Serial Number"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6} sx={{ mt: -1 }}>
          <FormInputText
            name="horsepower"
            control={control}
            label="Horsepower"
            placeholder=""
            register={register}
            errors={errors}
            shouldUnregister
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VesselForm;
