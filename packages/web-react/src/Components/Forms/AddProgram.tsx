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
  CreateMultipleProgramImageDocument,
  CreateProgramDocument,
  GovernmentAidsDocument,
  MutationCreateMultipleImageArgs,
  MutationCreateProgramArgs,
} from '../../graphql/generated';
import { showFailAlert, showSuccessAlert } from '../ConfirmationDialog/Alerts';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProgramSchema } from './validation/schema';
import MultiImageUpload from '../Input/MultiImageUpload';

interface CreateProgramFormProps {
  open: boolean;
  handleClose: () => void;
}

function CreateProgramForm({ open, handleClose }: CreateProgramFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [images, setImages] = useState<string[] | undefined>([]);

  const handleImageChange = (newImages: string[] | undefined) => {
    setImages(newImages);
  };

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

  const [createProgram] = useMutation(CreateProgramDocument, {
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

  const [createProgamImages] = useMutation(CreateMultipleProgramImageDocument, {
    onCompleted: () => {
      handleClose();
      handleComplete();
    },
    onError: () => {
      handleClose();
      handleComplete();
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateProgramSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    handleSubmitting();
    const createProgramInput: MutationCreateProgramArgs = {
      data: {
        title: data.title,
        date: new Date(data.date),
        description: data.description ?? '',
        slot: parseInt(data.slot),
      },
    };

    if (images) {
      const program = await createProgram({
        variables: {
          data: createProgramInput.data,
        },
        refetchQueries: [
          {
            query: GovernmentAidsDocument,
          }
        ],
      });

      const id = program.data?.createProgram.id;

      const createProgramImagesInput: MutationCreateMultipleImageArgs = {
        images: images.map((image) => ({
          name: `program-image-${id}`,
          text: '',
          updated_at: new Date(),
          url: image.toString(),
          government_aid_id: id,
        })),
      };

      await createProgamImages({
        variables: {
          images: createProgramImagesInput.images,
        },
        refetchQueries: [
          {
            query: GovernmentAidsDocument,
          },
          {
            query: GovernmentAidsDocument,
            variables: { govtAidId: id },
          },
        ],
      });
    }
  });

  const handleSubmitCreateProgramForm = (
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
        Add Program
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
              shouldUnregister
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ mt: 1, ml: 0 }}>
            <FormInputDate
              sx={{ pl: 1, height: 52 }}
              name="date"
              control={control}
              openTo="year"
              defaultValue={new Date()}
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
            />
          </Grid>
        </Grid>
        <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
          <Grid item sm={6} lg={12}>
            <MultiImageUpload
              control={control}
              errors={errors}
              label="programImages"
              name="programImages"
              register={register}
              onImageChange={handleImageChange}
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
              handleSubmitCreateProgramForm(e);
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

export default CreateProgramForm;
