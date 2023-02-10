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

function VesselForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(addVesselWithGearSchema),
  });
  const [vesselTypes, setVesselTypes] = useState(vesselTypeOptions);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTypeVessel = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = createOption(inputValue);
      setIsLoading(false);
      setVesselTypes((prev) => [...prev, newValue]);
    }, 1500);
  };

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
          />
        </Grid>
      </Grid>
      <Grid container spacing={-2} sx={{ ml: 2 }}>
        <Grid item sm={6} sx={{ mt: 2 }}>
          <FormInputSelect
            name="material"
            label="Select Material Used"
            data={materialOptions}
            onSavedValue=""
            control={control}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item sm={6} sx={{ mt: 2 }}>
          <FormCreatableSelect
            control={control}
            errors={errors}
            isLoading={isLoading}
            isDisabled={isLoading}
            name="type"
            placeholder="Select Type"
            onCreateOption={handleCreateTypeVessel}
            options={vesselTypes}
            register={register}
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
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VesselForm;
