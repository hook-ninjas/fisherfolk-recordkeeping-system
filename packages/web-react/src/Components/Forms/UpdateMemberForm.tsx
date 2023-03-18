import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogContent,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import {
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FormInputAutoText,
  FormInputDate,
  FormInputNumber,
} from './FormInputFields';
import { Controller, useForm } from 'react-hook-form';
import {
  FisherfolkByIdDocument,
  MutationUpdateFisherfolkArgs,
  MutationUpdateFisherfolkImageArgs,
  UpdateFisherfolkDocument,
  UpdateFisherfolkImageDocument,
} from '../../graphql/generated';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import {
  educationalBackgroundOptions,
  salutationOptions,
  barangayOptions,
  genderOptions,
  civilStatusOptions,
  sourceOfIncomeOptions,
  cityMunicipalityOptions,
  provinceOptions,
} from './Enums';
import { sub } from 'date-fns/fp';
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import { UpdateFisherfolkSchema } from './validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

interface UpdateFisherfolkFormProps {
  id: number;
  open: boolean;
  handleClose: () => void;
}

export default function UpdateFisherfolkForm({
  id,
  open,
  handleClose,
}: UpdateFisherfolkFormProps) {
  const MAXDATE = sub({ years: 19 })(new Date());
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = React.useState<
    string | undefined | ArrayBuffer | null
  >();

  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files instanceof FileList) {
      reader.readAsDataURL(event.target.files[0]);

      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      return 'handle exception';
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(UpdateFisherfolkSchema),
  });

  const { loading, data: { fisherfolk, fisherfolkPhoto } = {} } = useQuery(
    FisherfolkByIdDocument,
    {
      variables: {
        fisherfolkId: id,
      },
    }
  );

  const [updateImage] = useMutation(UpdateFisherfolkImageDocument);

  const [updateFisherfolk] = useMutation(UpdateFisherfolkDocument, {
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

  if (loading) {
    return <LinearProgress />;
  }

  if (!loading && !fisherfolk) {
    throw 'Fisherfolk does not exist.';
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
    salutation,
  } = fisherfolk!;

  const photo = fisherfolkPhoto![0];
  const organization = organizations[0];

  const fishingAct = (isMain: boolean) =>
    livelihoods.filter((a) => a.isMain == isMain);

  const mainFishingAct = fishingAct(true)[0].type;
  const orgName = organization?.organization.name;
  const orgMemberSince = organization?.yearJoined.toString();
  const orgPosition = organization?.position;

  const onSubmit = handleSubmit(async (input) => {
    handleSubmitting();
    const updateFisherfolkInput: MutationUpdateFisherfolkArgs = {
      data: {
        age: parseInt(input.age),
        appellation: input.appellation,
        barangay: input.barangay,
        cityMunicipality: input.cityMunicipality ?? cityMunicipality,
        civilStatus: input.civilStatus ?? civilStatus,
        contactNum: input.contactNumber,
        dateOfBirth: new Date(input.dateOfBirth),
        educationalBackground:
          input.educationalBackground ?? educationalBackground,
        firstName: input.firstName,
        gender: input.gender ?? gender,
        lastName: input.lastName,
        middleName: input.middleName,
        nationality: input.nationality ?? nationality,
        personToNotify: input.personToNotify,
        placeOfBirth: input.placeOfBirth,
        province: input.province,
        ptnAddress: input.ptnAddress,
        ptnContactNum: input.ptnContactNum,
        ptnRelationship: input.ptnRelationship,
        religion: input.religion,
        residentYear: parseInt(input.residentYear),
        salutation: input.salutation ?? salutation,
        numOfChildren: parseInt(input.numOfChildren),
        livelihoods: [
          {
            description: '',
            isMain: true,
            type: input.mainFishingActivity ?? mainFishingAct,
          },
        ],
        organizations: [
          input.orgMemberSince || input.orgName || input.orgPosition
            ? {
              name: input.orgName,
              position: input.orgPosition,
              yearJoined: parseInt(input.orgMemberSince),
            }
            : null,
        ],
      },
      fisherfolkId: id,
    };

    if (fisherfolkPhoto && photo) {
      const updateImageInput: MutationUpdateFisherfolkImageArgs = {
        data: {
          fisherfolkId: id,
          url: image != null ? image.toString() : photo.url,
          vessel_id: null,
          gear_id: null,
          updated_at: new Date(),
          name: '',
          text: '',
        },
        id: photo.id,
        url: photo.url,
      };

      await updateImage({
        variables: {
          data: updateImageInput.data,
          updateFisherfolkImageId: updateImageInput.id,
          url: updateImageInput.url,
        },
      }).then(
        async () =>
          await updateFisherfolk({
            variables: {
              fisherfolkId: id,
              data: updateFisherfolkInput.data,
            },
          })
      );
    }

    await updateFisherfolk({
      variables: {
        fisherfolkId: id,
        data: updateFisherfolkInput.data,
      },
    });
  });

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <FormContainer
        onClose={close}
        aria-labelledby="form-container"
        open={open}
      >
        <FormContainerTitle
          aria-labelledby="form-container-title"
          onClose={handleClose}
        >
          Update Fisherfolk
        </FormContainerTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: 'flex',
              pl: 2,
              mt: -2,
            }}
          >
            <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
              <Grid item sm={6}>
                <Box sx={{ width: 150, height: 150 }} mt={2}>
                  <img
                    src={
                      fisherfolkPhoto?.length != 0
                        ? image?.toString() ?? fisherfolkPhoto![0].url
                        : ''
                    }
                    width={150}
                    height={150}
                  />
                </Box>
                <FormHelperText sx={{ color: '#d32f2f' }}>
                  {errors['vesselGearPhoto']?.message?.toString()}
                </FormHelperText>
                <Controller
                  name="profilePhoto"
                  control={control}
                  defaultValue=""
                  render={() => (
                    <Button
                      sx={{ width: 150 }}
                      id="upload-btn-label"
                      variant="contained"
                      component="label"
                      htmlFor="upload-btn"
                    >
                      Upload
                      <input
                        id="upload-btn"
                        data-cy="vessel-gear-input"
                        type="file"
                        hidden
                        aria-label="vessel-gear-img-upload"
                        accept="image/*"
                        {...register('profilePhoto', {
                          onChange: (e) => previewImage(e),
                        })}
                      />
                    </Button>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h6" color="GrayText" ml={2} mt={2}>
            Personal Information
          </Typography>
          <Box
            sx={{
              display: 'flex',
              pl: 2,
            }}
          >
            <FormInputRadio
              name="salutation"
              label="salutation"
              control={control}
              register={register}
              errors={errors}
              radioOptions={salutationOptions}
              onSavedValue={fisherfolk && salutation}
            />
          </Box>
          <Grid container spacing={-2} sx={{ ml: 1, mr: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="lastName"
                id="lastName"
                control={control}
                label="Last Name"
                defaultValue={fisherfolk && lastName}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="firstName"
                id="firstName"
                control={control}
                label="First Name"
                defaultValue={fisherfolk && firstName}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="middleName"
                id="middleName"
                control={control}
                label="Middle Name"
                defaultValue={fisherfolk && middleName}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="appellation"
                id="appellation"
                control={control}
                label="Apellation"
                defaultValue={fisherfolk && appellation}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6} sx={{ mt: 1 }}>
              <FormInputAutoText
                sx={{ marginTop: -0.3, width: 230 }}
                freeSolo
                name="barangay"
                id="barangay"
                control={control}
                label="Barangay"
                defaultValue={fisherfolk && barangay}
                options={barangayOptions}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1 }}>
              <FormInputAutoText
                sx={{ marginTop: -0.3, width: 230 }}
                freeSolo
                name="cityMunicipality"
                id="cityMunicipality"
                control={control}
                label="City/Municipality"
                defaultValue={fisherfolk && cityMunicipality}
                options={cityMunicipalityOptions}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputAutoText
                freeSolo
                sx={{ marginTop: -0.3, width: 230 }}
                name="province"
                id="province"
                control={control}
                label="Province"
                defaultValue={fisherfolk && province}
                options={provinceOptions}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber
                name="residentYear"
                id="residentYear"
                control={control}
                label="Resident of Municipality since"
                defaultValue={fisherfolk && residentYear.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputNumber
                name="age"
                id="age"
                control={control}
                label="Age"
                defaultValue={fisherfolk && age.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="contactNumber"
                id="contactNumber"
                control={control}
                label="Contact Number"
                defaultValue={fisherfolk && contactNum}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputDate
                sx={{ pl: 1, width: 240, height: 52, ml: 0.1, mt: 0.9 }}
                name="dateOfBirth"
                control={control}
                openTo="year"
                max={MAXDATE}
                defaultValue={fisherfolk && dateOfBirth}
                label="Date of Birth"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="placeOfBirth"
                id="placeOfBirth"
                control={control}
                label="Place of Birth"
                defaultValue={fisherfolk && placeOfBirth}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="religion"
                id="religion"
                control={control}
                label="Religion"
                defaultValue={fisherfolk && religion}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                color="GrayText"
                mt={0.5}
                mb={-1}
                ml={1}
              >
                Gender
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  pl: 1,
                }}
              >
                <FormInputRadio
                  name="gender"
                  label="gender"
                  register={register}
                  errors={errors}
                  control={control}
                  radioOptions={genderOptions}
                  onSavedValue={fisherfolk && gender}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormInputSelect
                name="civilStatus"
                label="Select Civil Status"
                data={civilStatusOptions}
                control={control}
                register={register}
                errors={errors}
                onSavedValue={fisherfolk && civilStatus}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
              <FormInputAutoText
                sx={{ marginTop: -0.3, width: 230 }}
                freeSolo
                name="nationality"
                control={control}
                label="Nationality"
                defaultValue={fisherfolk && nationality}
                options={['Filipino']}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormInputSelect
                name="educationalBackground"
                label="Select Educational Background"
                data={educationalBackgroundOptions}
                control={control}
                register={register}
                errors={errors}
                onSavedValue={fisherfolk && educationalBackground}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
              <FormInputNumber
                name="numOfChildren"
                id="numOfChildren"
                control={control}
                label="Number of Children"
                defaultValue={fisherfolk && numOfChildren.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" color="GrayText" mt={3} mb={-1} ml={2}>
            Person to Notify Incase of Emergency
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
            <Grid item sm={6}>
              <FormInputText
                name="personToNotify"
                id="personToNotify"
                control={control}
                label="Person to Notify"
                defaultValue={fisherfolk && personToNotify}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="ptnRelationship"
                id="ptnRelationship"
                control={control}
                label="Relationship"
                defaultValue={fisherfolk && ptnRelationship}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="ptnContactNum"
                id="ptnContactNum"
                control={control}
                label="Contact Number"
                defaultValue={fisherfolk && ptnContactNum.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="ptnAddress"
                id="ptnAddress"
                control={control}
                label="Address"
                defaultValue={fisherfolk && ptnAddress}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" color="GrayText" mt={2} ml={2}>
            Fishing Activity
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormInputSelect
                name="mainFishingActivity"
                label="Main Fishing Activity "
                data={sourceOfIncomeOptions}
                onSavedValue={fisherfolk && mainFishingAct}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" color="GrayText" mt={2} mb={-1} ml={2}>
            Organization
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
            <Grid item sm={6}>
              <FormInputText
                name="orgName"
                id="orgName"
                control={control}
                label="Name"
                defaultValue={fisherfolk && orgName}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber
                name="orgMemberSince"
                id="orgMemberSince"
                control={control}
                label="Member Since"
                defaultValue={fisherfolk && orgMemberSince}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="orgPosition"
                id="orgPosition"
                control={control}
                label="Position/Official Designation"
                defaultValue={fisherfolk && orgPosition}
                register={register}
                errors={errors}
              />
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
