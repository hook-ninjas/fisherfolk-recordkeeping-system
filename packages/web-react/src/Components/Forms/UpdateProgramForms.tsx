import React, { useState } from 'react';
import { Button, DialogContent, Grid } from '@mui/material';
import {
  FormInputText,
  FormInputNumber,
  FormInputDate,
} from './FormInputFields';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation } from '@apollo/client';
import {
  GovernmentAidDocument,
  GovernmentAidsDocument,
  UpdateProgramDocument,
} from '../../graphql/generated';
import { useQuery } from '@apollo/client';
import { showFailAlert, showSuccessAlert } from '../ConfirmationDialog/Alerts';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProgramSchema } from './validation/schema';
import { MutationUpdateProgramArgs } from '../../graphql/generated';

interface UpdateProgramProps {
  open: boolean;
  handleClose: () => void;
  id: number;
}

function UpdateProgram({ open, handleClose, id }: UpdateProgramProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const { loading, data } = useQuery(GovernmentAidDocument, {
    variables: {
      govtAidId: id,
    },
  });
  const handleSubmitting = () => setIsSubmitting(true);
  const handleComplete = () => setComplete(true);

  const buttonSx = {
    ...(complete && {
      bgcolor: '#336CFB',
      '&:hover': {
        bgcolor: '#336CFB',
      },
    }),
    display: 'block',
    marginTop: 3,
    marginLeft: 'auto',
  };

  const [updateProgram] = useMutation(UpdateProgramDocument, {
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
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(UpdateProgramSchema),
  });

  const onSubmit = handleSubmit(async (input) => {
    handleSubmitting();
    const updateProgramInput: MutationUpdateProgramArgs = {
      data: {
        title: input.title,
        date: new Date(input.date),
        description: input.description ?? '',
        slot: parseInt(input.slot),
      },
      governmentAidId: id,
    };
    const program = await updateProgram({
      variables: {
        data: updateProgramInput.data,
        governmentAidId: id,
      },
      refetchQueries: [
        {
          query: GovernmentAidsDocument,
        },
      ],
    });
  });

  const handleSubmitUpdateProgramForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContainer onClose={close} aria-labelledby="form-container" open={open}>
      <FormContainerTitle
        aria-labelledby="form-container-title"
        onClose={handleClose}
      >
        Edit Program
      </FormContainerTitle>
      <DialogContent dividers>
        <Grid container spacing={-2} sx={{ mr: 1, mt: 1 }}>
          <Grid item xs={12} sm={6} lg={12}>
            <FormInputText
              name="title"
              control={control}
              label="Title"
              placeholder=""
              register={register}
              errors={errors}
              shouldUnregister
              fullWidth={true}
              defaultValue={data && data.governmentAid.title}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} lg={6}>
            <FormInputNumber
              name="slot"
              control={control}
              label="Slot"
              placeholder=""
              sx={{ padding: 0.5 }}
              register={register}
              errors={errors}
              fullWidth={true}
              defaultValue={data && data.governmentAid.slot.toString()}
              shouldUnregister
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ mt: 1, ml: 0 }}>
            <FormInputDate
              sx={{ pl: 1, height: 52 }}
              name="date"
              control={control}
              openTo="year"
              defaultValue={data && new Date(data.governmentAid.date)}
              onSavedValue={null}
              label="Date"
              register={register}
              errors={errors}
            />
          </Grid>
        </Grid>
        <Grid container spacing={-2} sx={{ mr: 1, mt: 1 }}>
          <Grid item xs={12} sm={6} lg={12}>
            <FormInputText
              name="description"
              control={control}
              label="Description"
              placeholder=""
              register={register}
              errors={errors}
              shouldUnregister
              multiline={true}
              rows={12}
              maxRows={12}
              fullWidth={true}
              defaultValue={data && data.governmentAid.description}
            />
          </Grid>
        </Grid>

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
              handleSubmitUpdateProgramForm(e);
            }}
            disabled={isSubmitting}
            sx={buttonSx}
          >
            Save
          </Button>
        )}
        {isSubmitting}
      </DialogContent>
    </FormContainer>
  );
}

export default UpdateProgram;
