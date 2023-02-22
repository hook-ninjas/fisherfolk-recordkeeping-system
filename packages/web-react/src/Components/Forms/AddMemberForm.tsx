import React, { MouseEvent, SyntheticEvent, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  Grid,
  Typography,
  Tabs,
  Tab,
  FormHelperText,
  FormControl,
  FormGroup,
} from '@mui/material';
import {
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FormCreatableSelect,
  FormInputAutoText,
  FormInputDate,
} from './FormInputFields';
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateFisherfolkDocument,
  MutationCreateFisherfolkArgs,
} from '../../graphql/generated';
import { sub } from 'date-fns/fp';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import {
  nationalityOptions,
  educationalBackgroundOptions,
  createOption,
  salutationOptions,
  barangayOptions,
  genderOptions,
  civilStatusOptions,
  sourceOfIncomeOptions,
  cityMunicipalityOptions,
  provinceOptions,
} from './Enums';
import PhotoUpload from '../Input/PhotoUpload';
import { FfolkValidation } from './validation/schema';
import MultiFileUpload from '../Input/MultiFileUpload';
import GearForm from './GearForm';
import VesselForm from './VesselForm';

interface AddFisherfolkFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddFisherfolkForm({
  open,
  handleClose,
}: AddFisherfolkFormProps) {
  const [complete, setComplete] = useState(false);
  const [isCaptureFishing, setCaptureFishing] = useState(false);
  const [tab, setTab] = useState('gear');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nationalities, setNationalities] = useState(nationalityOptions);
  const [educationalBackgrounds, setEducationalBackgrounds] = useState(
    educationalBackgroundOptions
  );
  const [barangays, setBarangays] = useState(barangayOptions);
  const [otherFishingActivities, setOtherFishingActivities] = React.useState({
    CaptureFishing: false,
    Aquaculture: false,
    FishVending: false,
    FishProcessing: false,
  });

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

  const livelihoodOptions = [
    { label: 'Capture Fishing', value: 'CaptureFishing' },
    { label: 'Aquaculture', value: 'Aquaculture' },
    { label: 'Fish Processing', value: 'FishProcessing' },
    { label: 'Fish Vending', value: 'FishVending' },
  ];

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

  const handleCreateNationality = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = createOption(inputValue);
      setIsLoading(false);
      setNationalities((prev) => [...prev, newValue]);
    }, 1500);
  };

  const handleCreateEducationalBackground = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = createOption(inputValue);
      setIsLoading(false);
      setEducationalBackgrounds((prev) => [...prev, newValue]);
    }, 1000);
  };

  const handleCreateBarangay = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = createOption(inputValue);
      setIsLoading(false);
      setBarangays((prev) => [...prev, newValue]);
    }, 1000);
  };

  const {
    register,
    watch,
    control,
    handleSubmit,
    resetField,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FfolkValidation),
  });

  const ffolkInfo = [
    'lastName',
    'firstName',
    'middleName',
    'salutation',
    'contactNumber',
    'barangay',
    'cityMunicipality',
    'province',
    'residentYear',
    'gender',
    'age',
    'dateOfBirth',
    'placeBirth',
    'civilStatus',
    'educationalBackground',
    'nationality',
    'personToNotify',
    'ptnRelationship',
    'ptnContactNum',
    'ptnAddress',
    'orgName',
    'orgPosition',
    'profilePhoto',
    'files',
  ];

  const maxDate = sub({ years: 19 })(new Date());
  const watchMainFishAct = watch('mainFishingActivity');
  const watchFishCapture = watch(['mainFishingActivity', 'sndCaptFish']);
  const watchFishingCheckboxes = watch([
    'sndCaptFish',
    'sndFishVending',
    'sndAquaculture',
    'sndFishProcessing',
  ]);
  const captureFishingRegistrant =
    watchFishCapture.includes('CaptureFishing') ||
    watchFishCapture.includes(true);

  const invalidFfolkInfo = ffolkInfo.filter(
    (field) => errors[field] != undefined
  );

  const [createFisherfolk] = useMutation(CreateFisherfolkDocument, {
    onCompleted: () => {
      handleClose();
      handleComplete();
      showSuccessAlert();
    },
    onError: (err) => {
      handleClose();
      handleComplete();
      showFailAlert();
    },
  });

  const handleTabChange = (event: SyntheticEvent, newValue: string) =>
    setTab(newValue);

  const onSubmit = handleSubmit((data) => {
    // handleSubmitting();
    const createFisherfolkInput: MutationCreateFisherfolkArgs = {
      data: {
        age: parseInt(data.age),
        appellation: data.appellation,
        barangay: data.barangay,
        cityMunicipality: data.cityMunicipality,
        civilStatus: data.civilStatus,
        contactNum: data.contactNumber,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        educationalBackground: data.educationalBackground,
        firstName: data.firstName,
        gender: data.gender,
        lastName: data.lastName,
        middleName: data.middleName,
        nationality: data.nationality,
        personToNotify: data.personToNotify,
        placeOfBirth: data.placeOfBirth,
        province: data.province,
        ptnAddress: data.ptnAddress,
        ptnContactNum: data.ptnContactNum,
        ptnRelationship: data.ptnRelationship,
        religion: data.religion,
        residentYear: parseInt(data.residentYear),
        salutation: data.salutation,
        numOfChildren: parseInt(data.numberOfChildren),
        livelihoods: [],
      },
    };
    console.log(getValues());
    console.log(createFisherfolkInput.data);

    // await createFisherfolk({
    //   variables: {
    //     data: createFisherfolkInput.data,
    //   },
    // });
  });

  const handleSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    trigger();
    console.log(getValues());
    console.log(invalidFfolkInfo);
    onSubmit();
  };

  const handleNextButton = (e: MouseEvent) => {
    trigger();
    console.log(getValues());
    if (invalidFfolkInfo.length == 0) {
      setCaptureFishing(true);
    }
  };

  const handleBackButton = (e: MouseEvent) => setCaptureFishing(false);

  const formTab = () => {
    switch (tab) {
      case 'gear':
        return <GearForm />;
      case 'vessel':
        return <VesselForm />;
      case 'gear&vessel':
        return (
          <>
            <VesselForm />
            <GearForm />
          </>
        );
    }
    return <></>;
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
          Fisherfolk Registration
        </FormContainerTitle>
        <DialogContent dividers>
          {!isCaptureFishing ? (
            <Box id="ffolk-form-info">
              <Typography variant="body1" color="GrayText" mb={2} ml={2}>
                Upload Profile Picture
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  pl: 2,
                  mt: -2,
                }}
              >
                <PhotoUpload
                  name="profilePhoto"
                  control={control}
                  register={register}
                  errors={errors}
                  sx={{
                    m: 1,
                    p: 1,
                    maxWidth: '200px',
                  }}
                  alt={'Upload 2x2 Photo'}
                  dataCy={'ffolk-img'}
                />
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
                  defaultValue=""
                  control={control}
                  register={register}
                  errors={errors}
                  radioOptions={salutationOptions}
                />
              </Box>
              <Grid container spacing={-2} sx={{ ml: 1, mr: 1 }}>
                <Grid item sm={6}>
                  <FormInputText
                    name="lastName"
                    control={control}
                    label="Last Name"
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="firstName"
                    control={control}
                    label="First Name"
                    placeholder=""
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
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="appellation"
                    control={control}
                    label="Appellation"
                    placeholder="e.g. Sr. / Jr. / III"
                    register={register}
                    errors={errors}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 2 }}>
                <Grid item sm={6} sx={{ mt: 2 }}>
                  <FormCreatableSelect
                    name="barangay"
                    placeholder="Select Barangay"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onCreateOption={handleCreateBarangay}
                    options={barangays}
                    control={control}
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
                  <FormInputAutoText
                    name="cityMunicipality"
                    control={control}
                    label="City/Municipality"
                    placeholder=""
                    options={cityMunicipalityOptions}
                    register={register}
                    errors={errors}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
                <Grid item sm={6}>
                  <FormInputAutoText
                    name="province"
                    control={control}
                    label="Province"
                    placeholder=""
                    options={provinceOptions}
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="residentYear"
                    control={control}
                    label="Resident of Municipality since"
                    placeholder="e.g. 2015"
                    register={register}
                    errors={errors}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
                <Grid item sm={6}>
                  <FormInputText
                    name="age"
                    control={control}
                    label="Age"
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="contactNumber"
                    control={control}
                    label="Contact Number"
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
                <Grid item sm={6}>
                  {/* <FormInputText
                    name="dateOfBirth"
                    control={control}
                    label="Date of Birth"
                    placeholder="MM/DD/YYYY"
                    register={register}
                    errors={errors}
                  /> */}
                  <FormInputDate
                    sx={{ pl: 1, width: 240, height: 52 }}
                    name="dateOfBirth"
                    control={control}
                    max={maxDate}
                    defaultValue={null}
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
                    placeholder=""
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
                    placeholder=""
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
                      defaultValue=""
                      register={register}
                      errors={errors}
                      control={control}
                      radioOptions={genderOptions}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 2 }}>
                <Grid item sm={6} sx={{ mt: 2 }}>
                  <FormCreatableSelect
                    control={control}
                    errors={errors}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    name="nationality"
                    placeholder="Select Nationality"
                    onCreateOption={handleCreateNationality}
                    options={nationalities}
                    register={register}
                  />
                </Grid>
                <Grid item sm={6} sx={{ mt: 2 }}>
                  <FormInputSelect
                    name="civilStatus"
                    label="Select Civil Status"
                    data={civilStatusOptions}
                    onSavedValue=""
                    control={control}
                    register={register}
                    errors={errors}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 2, mt: 1 }}>
                <Grid item sm={6} sx={{ mt: 2 }}>
                  <FormCreatableSelect
                    control={control}
                    errors={errors}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    name="educationalBackground"
                    placeholder="Select Educational Background"
                    onCreateOption={handleCreateEducationalBackground}
                    options={educationalBackgrounds}
                    register={register}
                  />
                </Grid>
                <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
                  <FormInputText
                    name="numOfChildren"
                    control={control}
                    label="Number of Children"
                    placeholder=""
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
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="ptnRelationship"
                    control={control}
                    label="Relationship"
                    placeholder=""
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
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="ptnAddress"
                    control={control}
                    label="Address"
                    placeholder=""
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
                    onSavedValue=""
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
                    placeholder="e.g. Carpentry/Driver"
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Typography variant="subtitle1" color="GrayText">
                  Other Fishing Activities
                </Typography>
                <Grid direction="column" container spacing={-2} sx={{ ml: 1 }}>
                  <FormControlLabel
                    label="Capture Fishing"
                    disabled={watchMainFishAct == 'CaptureFishing'}
                    control={
                      <Checkbox
                        {...register('otherFishingActivities')}
                        defaultChecked={false}
                        // checked={watchFishingCheckboxes[0]}
                        value="CaptureFishing"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Fish Vending"
                    disabled={watchMainFishAct == 'FishVending'}
                    control={
                      <Checkbox
                        {...register('otherFishingActivities')}
                        defaultChecked={false}
                        // checked={watchFishingCheckboxes[1]}
                        value="FishVending"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Aquaculture"
                    disabled={watchMainFishAct == 'Aquaculture'}
                    control={
                      <Checkbox
                        {...register('otherFishingActivities')}
                        defaultChecked={false}
                        // checked={watchFishingCheckboxes[2]}
                        value="Aquaculture"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Fish Processing"
                    disabled={watchMainFishAct == 'FishProcessing'}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        {...register('otherFishingActivities')}
                        // checked={watchFishingCheckboxes[3]}
                        value="FishProcessing"
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" color="GrayText" mb={-1} ml={2}>
                Organization
              </Typography>
              <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
                <Grid item sm={6}>
                  <FormInputText
                    name="orgName"
                    control={control}
                    label="Name"
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormInputText
                    name="orgMemberSince"
                    control={control}
                    label="Member Since"
                    placeholder="e.g. 2015"
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
                    placeholder=""
                    register={register}
                    errors={errors}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
                <FormHelperText required>
                  Upload required images here:
                </FormHelperText>
                <MultiFileUpload
                  name="files"
                  label="files"
                  control={control}
                  register={register}
                  errors={errors}
                  sx={{
                    m: 1,
                    p: 1,
                    width: '100%',
                  }}
                  dataCy={'ffolk-files'}
                />
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                {/* {captureFishingRegistrant ? (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleNextButton}
                    disabled={isSubmitting}
                    sx={buttonSx}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={handleSubmitForm}
                    disabled={isSubmitting}
                    sx={buttonSx}
                  >
                    Save
                  </Button>
                )} */}
                <Button
                  type={captureFishingRegistrant ? 'button' : 'submit'}
                  variant="contained"
                  fullWidth
                  onClick={
                    captureFishingRegistrant
                      ? handleNextButton
                      : handleSubmitForm
                  }
                  disabled={isSubmitting}
                  sx={buttonSx}
                >
                  {captureFishingRegistrant ? 'Next' : 'Save'}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box id="ffolk-form-gear">
              <Tabs
                value={tab}
                onChange={handleTabChange}
                aria-label="Fisherfolk form tab selection"
              >
                <Tab label="Gear" value={'gear'} />
                <Tab label="Vessel" value={'vessel'} />
                <Tab label="Gear & Vessel" value={'gear&vessel'} />
              </Tabs>
              {formTab()}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Grid
                  container
                  spacing={-2}
                  sx={{ justifyContent: 'space-between', ml: 1, mt: 2 }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleBackButton}
                      disabled={isSubmitting}
                      sx={buttonSx}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      onClick={handleSubmitForm}
                      disabled={isSubmitting}
                      sx={buttonSx}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </DialogContent>
      </FormContainer>
    </>
  );
}
