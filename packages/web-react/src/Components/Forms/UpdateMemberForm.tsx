import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  FormGroup,
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
  MutationCreateFisherfolkArgs,
  MutationUpdateFisherfolkImageArgs,
  SourceOfIncome,
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
  const [otherFishingActivities, setOtherFishingActivities] = React.useState({
    CaptureFishing: false,
    Aquaculture: false,
    FishVending: false,
    FishProcessing: false,
  });
  const [image, setImage] = React.useState<
    string | undefined | ArrayBuffer | null
  >();

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

  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const handleOtherFishingActivityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherFishingActivities({
      ...otherFishingActivities,
      [event.target.name]: event.target.checked,
    });
  };

  const maxDate = sub({ years: 19 })(new Date());

  const { CaptureFishing, Aquaculture, FishVending, FishProcessing } =
    otherFishingActivities;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(UpdateFisherfolkSchema),
  });

  const { data, loading } = useQuery(FisherfolkByIdDocument, {
    variables: {
      fisherfolkId: id,
    },
  });

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

  const onSubmit = handleSubmit(async (input) => {
    handleSubmitting();
    const updateFisherfolkInput: MutationCreateFisherfolkArgs = {
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
      },
    };

    if(data) {
      const updateImageInput: MutationUpdateFisherfolkImageArgs = {
        data: {
          fisherfolkId: id,
          url: image != null ? image.toString() : data.fisherfolkPhoto[0].url,
          vessel_id: null,
          gear_id: null,
          updated_at: new Date(),
          name: '',
          text: '',
        },
        id: data.fisherfolkPhoto[0].id,
        url: data.fisherfolkPhoto[0].url,
      };
  
      await updateImage({
        variables: {
          data: updateImageInput.data,
          updateFisherfolkImageId: updateImageInput.id,
          url: updateImageInput.url,
        },
      }).then(async () => (
        await updateFisherfolk({
          variables: {
            updateFisherfolkId: id,
            data: updateFisherfolkInput.data,
          },
        })
      ));
    }
  });

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSubmit();
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (!loading && !data) {
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
  } = data!.fisherfolk;

  const otherSrcOfIncome = livelihoods?.find(
    (a) => a?.type == SourceOfIncome.Others
  )?.description;

  const mainFishingAct = livelihoods?.find((a) => a?.isMain)?.type;

  const orgName =
    organizations == null ? '' : organizations[0]?.organization.name;

  const orgPosition = organizations == null ? '' : organizations[0]?.position;

  const orgMemberSince =
    organizations == null ? '' : organizations[0]?.yearJoined.toString();

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
                      data?.fisherfolkPhoto.length != 0
                        ? image?.toString() ?? data?.fisherfolkPhoto[0].url
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
              onSavedValue={data && salutation}
            />
          </Box>
          <Grid container spacing={-2} sx={{ ml: 1, mr: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="lastName"
                control={control}
                label="Last Name"
                defaultValue={data && lastName}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="firstName"
                control={control}
                label="First Name"
                defaultValue={data && firstName}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="middleName"
                control={control}
                label="Middle Name"
                defaultValue={data && middleName}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="appellation"
                control={control}
                label="Apellation"
                defaultValue={data && appellation}
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
                control={control}
                label="Barangay"
                defaultValue={data && barangay}
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
                control={control}
                label="City/Municipality"
                defaultValue={data && cityMunicipality}
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
                control={control}
                label="Province"
                defaultValue={data && province}
                options={provinceOptions}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber
                name="residentYear"
                control={control}
                label="Resident of Municipality since"
                defaultValue={data && residentYear.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputNumber
                name="age"
                control={control}
                label="Age"
                defaultValue={data && age.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="contactNumber"
                control={control}
                label="Contact Number"
                defaultValue={data && contactNum}
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
                max={maxDate}
                defaultValue={data && dateOfBirth}
                label="Date of Birth"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="placeOfBirth"
                control={control}
                label="Place of Birth"
                defaultValue={data && placeOfBirth}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="religion"
                control={control}
                label="Religion"
                defaultValue={data && religion}
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
                  onSavedValue={data && gender}
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
                onSavedValue={data && civilStatus}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
              <FormInputAutoText
                sx={{ marginTop: -0.3, width: 230 }}
                freeSolo
                name="nationality"
                control={control}
                label="Nationality"
                defaultValue={data && nationality}
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
                onSavedValue={data && educationalBackground}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
              <FormInputNumber
                name="numOfChildren"
                control={control}
                label="Number of Children"
                defaultValue={data && numOfChildren.toString()}
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
                control={control}
                label="Person to Notify"
                defaultValue={data && personToNotify}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="ptnRelationship"
                control={control}
                label="Relationship"
                defaultValue={data && ptnRelationship}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="ptnContactNum"
                control={control}
                label="Contact Number"
                defaultValue={data && ptnContactNum.toString()}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="ptnAddress"
                control={control}
                label="Address"
                defaultValue={data && ptnAddress}
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
                onSavedValue={data && mainFishingAct}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
              <FormInputText
                name="otherSourceOfIncome"
                control={control}
                label="Other Source of Income"
                defaultValue={data && otherSrcOfIncome}
                register={register}
                errors={errors}
              />
            </Grid>
            <Typography variant="subtitle1" color="GrayText">
              Other Fishing Activities
            </Typography>
            <Grid container spacing={-2} sx={{ ml: 1 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={CaptureFishing}
                      onChange={handleOtherFishingActivityChange}
                      name="CaptureFishing"
                    />
                  }
                  label="Capture Fishing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Aquaculture}
                      onChange={handleOtherFishingActivityChange}
                      name="Aquaculture"
                    />
                  }
                  label="Aquaculture"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={FishVending}
                      onChange={handleOtherFishingActivityChange}
                      name="FishVending"
                    />
                  }
                  label="Fish Vending"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={FishProcessing}
                      onChange={handleOtherFishingActivityChange}
                      name="FishProcessing"
                    />
                  }
                  label="Fish Processing"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Typography variant="h6" color="GrayText" mt={2} mb={-1} ml={2}>
            Organization
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
            <Grid item sm={6}>
              <FormInputText
                name="orgName"
                control={control}
                label="Name"
                defaultValue={data && orgName}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputNumber
                name="orgMemberSince"
                control={control}
                label="Member Since"
                defaultValue={data && orgMemberSince}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="orgPosition"
                control={control}
                label="Position/Official Designation"
                defaultValue={data && orgPosition}
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
