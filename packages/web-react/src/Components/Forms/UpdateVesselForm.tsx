import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, DialogContent, Grid, Typography } from '@mui/material';
import { FormInputText, FormInputSelect, FormInputAutoText, FormInputNumber } from './FormInputFields';
import { materialOptions } from './Enums';
import { useMutation, useQuery } from '@apollo/client';
import { FisherfolkVesselsDocument, MutationUpdateVesselArgs, UpdateVesselDocument, VesselDocument, VesselQueryDocument } from '../../graphql/generated';
import { FormContainer, FormContainerTitle } from '../Containers/FormContainers';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { showFailAlert, showSuccessAlert } from '../ConfirmationDialog/Alerts';

interface VesselFormProps {
  id: number;
  open: boolean;
  handleClose: () => void;
}

const vesselType = ['Non-Motorized', 'Motorized'];

function UpdateVesselForm({ id, open, handleClose }: VesselFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const buttonSx = {
    ...(complete && {
      bgcolor: '#22cd4c',
      '&:hover': {
        bgcolor: '#22cd4c',
      },
    }),
    display: 'block',
    marginTop: 3,
    marginLeft: 'auto',
  };
  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const { loading, data: { vessel } = {} } = useQuery(VesselDocument, {
    variables: {
      vesselId: id,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const [updateVessel] = useMutation(UpdateVesselDocument, {
    onCompleted: () => {
      handleClose();
      handleComplete();
      showSuccessAlert();
    },
    onError: () => {
      handleClose();
      handleComplete();
      showFailAlert();
    },
    refetchQueries: [{ query: VesselQueryDocument }, { query: FisherfolkVesselsDocument, variables: { fisherfolkId: id } }],
  });

  if (loading && !vessel) {
    return null;
  }

  const { engineMake, grossTonnage, homeport, horsepower, material, mfvrNumber, name, netTonnage, placeBuilt, registeredBreadth, registeredDepth, registeredLength, serialNumber, tonnageBreadth, tonnageDepth, tonnageLength, type, yearBuilt, fisherfolk } = vessel ?? {};
  const fisherfolkId = fisherfolk?.id;

  const onSubmit = handleSubmit(async (data) => {
    handleSubmitting();

    const updateVesselInput: MutationUpdateVesselArgs = {
      vessel: {
        engineMake: data.engineMake,
        fisherfolkId: fisherfolkId,
        grossTonnage: parseFloat(data.grossTonnage),
        homeport: data.homeport,
        horsepower: parseInt(data.horsepower),
        material: data.material ?? material,
        mfvrNumber: data.mfvrNumber,
        name: data.name,
        netTonnage: parseFloat(data.netTonnage),
        placeBuilt: data.placeBuilt,
        registeredBreadth: parseFloat(data.registeredBreadth),
        registeredDepth: parseFloat(data.registeredDepth),
        registeredLength: parseFloat(data.registeredLength),
        serialNumber: data.serialNumber,
        tonnageBreadth: parseFloat(data.tonnageBreadth),
        tonnageDepth: parseFloat(data.tonnageDepth),
        tonnageLength: parseFloat(data.tonnageLength),
        type: data.type ?? type,
        yearBuilt: parseInt(data.yearBuilt),
      },
      id: id,
    };

    await updateVessel({
      variables: {
        updateVesselId: updateVesselInput.id,
        vessel: updateVesselInput.vessel,
      },
    });
  });

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <FormContainer onClose={close} aria-labelledby="form-container" open={open}>
        <FormContainerTitle aria-labelledby="form-container-title" onClose={handleClose}>
          Update Boat
        </FormContainerTitle>
        <DialogContent dividers>
          <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText name="mfvrNumber" control={control} label="MFVR Number" defaultValue={vessel && mfvrNumber} register={register} errors={errors} shouldUnregister />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText name="homeport" control={control} label="Homeport" defaultValue={vessel && homeport} register={register} errors={errors} shouldUnregister />
            </Grid>
            <Grid item sm={6}>
              <FormInputText name="name" control={control} label="Name of Fishing Vessel" defaultValue={vessel && name} register={register} errors={errors} shouldUnregister />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormInputSelect name="material" label="Select Material Used" data={materialOptions} control={control} register={register} errors={errors} onSavedValue={vessel && material!} shouldUnregister />
            </Grid>
            <Grid item sm={6} sx={{ mt: 2.3 }}>
              <FormInputAutoText sx={{ marginTop: -1.5, width: 228, marginLeft: -0.8 }} freeSolo name="type" control={control} defaultValue={vessel && type} label="Type" placeholder="Motorized" options={vesselType} register={register} errors={errors} shouldUnregister />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6} sx={{ mt: 1 }}>
              <FormInputText name="placeBuilt" control={control} label="Place Built" defaultValue={vessel && placeBuilt} register={register} errors={errors} shouldUnregister />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: 0 }}>
              <FormInputNumber name="yearBuilt" control={control} label="Year Built" defaultValue={vessel && yearBuilt?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 228, marginLeft: 1, marginTop: 0.2 }} />
            </Grid>
          </Grid>
          <Typography variant="body1" color="GrayText" mb={2} ml={2} mt={2}>
            Fishing Vessel Dimensions and Tonnages (Meters)
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputNumber name="registeredLength" control={control} label="Registered Length" defaultValue={vessel && registeredLength?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber name="registeredDepth" control={control} label="Registered Depth" defaultValue={vessel && registeredDepth?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputNumber name="registeredBreadth" control={control} label="Registered Breadth" defaultValue={vessel && registeredBreadth?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber name="tonnageLength" control={control} label="Tonnage Length" defaultValue={vessel && tonnageLength?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputNumber name="tonnageDepth" control={control} label="Tonnage Depth" defaultValue={vessel && tonnageDepth?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber name="tonnageBreadth" control={control} label="Tonnage Breadth" defaultValue={vessel && tonnageBreadth?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputNumber name="grossTonnage" control={control} label="Gross Tonnage" defaultValue={vessel && grossTonnage?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber name="netTonnage" control={control} label="Net Tonnage" defaultValue={vessel && netTonnage?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
          </Grid>
          <Typography variant="body1" color="GrayText" ml={2} mt={2} mb={2}>
            Particulars of Propulsion System
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6}>
              <FormInputText name="engineMake" control={control} label="Engine Make" defaultValue={vessel && engineMake?.toString()} register={register} errors={errors} shouldUnregister />
            </Grid>
            <Grid item sm={6}>
              <FormInputText name="serialNumber" control={control} label="Serial Number" defaultValue={vessel && serialNumber?.toString()} register={register} errors={errors} shouldUnregister />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6} sx={{ mt: -1 }}>
              <FormInputNumber name="horsepower" control={control} label="Horsepower" defaultValue={vessel && horsepower?.toString()} register={register} errors={errors} shouldUnregister sx={{ width: 230, marginLeft: 0.4 }} />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            {isSubmitting ? (
              <LoadingButton
                loading
                fullWidth
                loadingPosition="start"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Loading
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={(e) => {
                  handleSubmitForm(e);
                }}
                disabled={isSubmitting}
                sx={buttonSx}
              >
                Save Changes
              </Button>
            )}
            {isSubmitting}
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}

export default UpdateVesselForm;
