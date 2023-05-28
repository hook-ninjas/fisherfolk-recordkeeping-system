import React from 'react';
import { UseFormRegister, Control, FieldValues } from 'react-hook-form';
import { Grid, Typography, FormHelperText } from '@mui/material';
import {
  FormInputText,
  FormInputSelect,
  FormInputAutoText,
} from './FormInputFields';
import { materialOptions } from './Enums';
import MultiFileUpload from '../Input/MultiFileUpload';

interface VesselFormProps {
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

const vesselType = ['Non-Motorized', 'Motorized'];

function VesselForm({ control, register, errors }: VesselFormProps) {
  return (
    <>
      <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.mfvrNumber"
            control={control}
            label="MFVR Number"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.mfvrNumber?.message}
            errorState={!!errors.vessel?.mfvrNumber}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.homeport"
            control={control}
            label="Homeport"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.homeport?.message}
            errorState={!!errors.vessel?.homeport}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.name"
            control={control}
            label="Name of Fishing Vessel"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.name?.message}
            errorState={!!errors.vesssel?.name}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid item sm={6} sx={{ mt: 2 }}>
          <FormInputSelect
            name="vessel.material"
            label="Select Material Used"
            data={materialOptions}
            control={control}
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.material?.message}
            errorState={!!errors.vessel?.material}
            defaultValue=""
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6} sx={{ mt: 2 }}>
          <FormInputAutoText
            sx={{ marginTop: -1.5, width: 220 }}
            freeSolo
            name="vessel.type"
            control={control}
            defaultValue=""
            label="type"
            placeholder="Motorized"
            options={vesselType}
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.type?.message}
            errorState={!!errors.vessel?.type}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6} sx={{ mt: 1 }}>
          <FormInputText
            name="vessel.placeBuilt"
            control={control}
            label="Place Built"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.placeBuilt?.message}
            errorState={!!errors.vessel?.placeBuilt}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6} sx={{ mt: 1, ml: 0 }}>
          <FormInputText
            name="vessel.yearBuilt"
            control={control}
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            label="Year Built"
            placeholder="e.g. 2020"
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.yearBuilt?.message}
            errorState={!!errors.vessel?.yearBuilt}
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
            name="vessel.registeredLength"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Registered Length"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.registeredLength?.message}
            errorState={!!errors.vessel?.registeredLength}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.registeredDepth"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Registered Depth"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.registeredDepth?.message}
            errorState={!!errors.vessel?.registeredDepth}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.registeredBreadth"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Registered Breadth"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.registeredBreadth?.message}
            errorState={!!errors.vessel?.registeredBreadth}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.tonnageLength"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Tonnage Length"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.tonnageLength?.message}
            errorState={!!errors.vessel?.tonnageLength}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.tonnageDepth"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Tonnage Depth"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.tonnageDepth?.message}
            errorState={!!errors.vessel?.tonnageDepth}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.tonnageBreadth"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Tonnage Breadth"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.tonnageBreadth?.message}
            errorState={!!errors.vessel?.tonnageBreadth}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.grossTonnage"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Gross Tonnage"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.grossTonnage?.message}
            errorState={!!errors.vessel?.grossTonnage}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.netTonnage"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Net Tonnage"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.netTonnage?.message}
            errorState={!!errors.vessel?.netTonnage}
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
            name="vessel.engineMake"
            control={control}
            label="Engine Make"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.engineMake?.message}
            errorState={!!errors.vessel?.engineMake}
            shouldUnregister
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            name="vessel.serialNumber"
            control={control}
            label="Serial Number"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.serialNumber?.message}
            errorState={!!errors.vessel?.serialNumber?.name}
            shouldUnregister
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
        <Grid item sm={6} sx={{ mt: -1 }}>
          <FormInputText
            name="vessel.horsepower"
            inputProps={{
              type: 'number',
              pattern: 'd*',
            }}
            control={control}
            label="Horsepower"
            placeholder=""
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.horsepower?.message}
            errorState={!!errors.vessel?.horsepower}
            shouldUnregister
          />
        </Grid>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
          <FormHelperText required>Upload required images here:</FormHelperText>
          <MultiFileUpload
            name="vessel.files"
            label="files"
            control={control}
            register={register}
            errors={errors}
            errorMessage={errors.vessel?.files?.message}
            errorState={!!errors.vessel?.files}
            hideError={!errors.vessel?.files}
            sx={{
              m: 1,
              p: 1,
              width: '100%',
            }}
            dataCy={'vessel-files'}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VesselForm;
