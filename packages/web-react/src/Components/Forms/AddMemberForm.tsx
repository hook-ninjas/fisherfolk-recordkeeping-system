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
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import {
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FormCreatableSelect,
  FormInputAutoText,
} from './FormInputFields';
import { useForm } from 'react-hook-form';
import { object, string, mixed, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateFisherfolkDocument,
  MutationCreateFisherfolkArgs,
} from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import {
  nationalityOptions,
  educationalBackgroundOptions,
  createOption,
  registrationTypes,
  salutationOptions,
  barangayOptions,
  genderOptions,
  civilStatusOptions,
  sourceOfIncomeOptions,
  cityMunicipalityOptions,
  provinceOptions,
} from './Enums';
import { getValues } from '../../utils/utils';
import PhotoUpload from '../Input/PhotoUpload';

export interface FormContainerTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function FormContainerTitle(props: FormContainerTitleProps) {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ ml: 2, p: 2 }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const FormContainer = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

interface AddFisherfolkFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddFisherfolkForm({
  open,
  handleClose,
}: AddFisherfolkFormProps) {
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

  const { CaptureFishing, Aquaculture, FishVending, FishProcessing } =
    otherFishingActivities;

  const addFisherfolkSchema = object().shape({
    registrationType: string()
      .nullable()
      .oneOf(getValues(registrationTypes))
      .required('Select registration type.'),
    lastName: string().required('Enter last name.'),
    firstName: string().required('Enter first name.'),
    middleName: string().required('Enter middle name.'),
    salutation: string()
      .nullable()
      .oneOf(getValues(salutationOptions))
      .required('Select salutation.'),
    contactNumber: string()
      .required('Enter contact number.')
      .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
    barangay: string().required('Enter or select barangay.'),
    cityMunicipality: string().required('Enter city/municipality.'),
    province: string().required('Enter province.'),
    residentYear: string().matches(/^\d{4}$/, 'Enter year of residency.'),
    gender: string()
      .nullable()
      .oneOf(getValues(genderOptions))
      .required('Select gender.'),
    age: string()
      .matches(/^$|\d{1,3}$/, 'Age must be a number.')
      .required('Enter age.'),
    dateOfBirth: string().nullable().required('Enter date of birth.'),
    placeOfBirth: string().required('Enter place of birth.'),
    civilStatus: string().required('Select civil status.'),
    educationalBackground: mixed()
      .nullable()
      .oneOf(getValues(educationalBackgrounds))
      .required('Enter or select educational background.'),
    numOfChildren: string().matches(/^$|\d{1,2}$/, 'Enter a number.'),
    nationality: mixed()
      .nullable()
      .oneOf(getValues(nationalities))
      .required('Enter or select nationality.'),
    personToNotify: string().required('Enter person to notify.'),
    ptnRelationship: string().required(
      'Enter relationship with person to notify.'
    ),
    ptnContactNum: string()
      .required('Enter contact number of person to notify.')
      .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
    ptnAddress: string().required('Enter address of person to notify.'),
    mainFishingActivity: string().required('Select main fishing activity.'),
    orgMemberSince: string().matches(/^$|\d{4}$/, 'Please enter year.'),
    profilePhoto: object()
      .shape({
        name: string().required(),
        size: number().max(1000000, 'File over 1 mb'),
        type: string()
          .matches(/^.*(image\/jpeg|jpg|png)$/gm, 'File format not supported')
          .required('No File Uploaded'),
      })
      .nullable()
      .required('Add Profile Image'),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addFisherfolkSchema),
  });

  const [createFisherfolk] = useMutation(CreateFisherfolkDocument, {
    onCompleted: () => {
      handleClose();
      handleComplete();
      showSuccessAlert();
    },
    onError: (err) => {
      handleClose();
      handleComplete();
      showFailAlert(err.message);
    },
  });

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
    console.log(data.profilePhoto);
    console.log(createFisherfolkInput.data);

    // await createFisherfolk({
    //   variables: {
    //     data: createFisherfolkInput.data,
    //   },
    // });
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
          Fisherfolk Registration
        </FormContainerTitle>
        <DialogContent dividers>
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
            {/* <FormInputRadio
              name="registrationType"
              label="registrationType"
              control={control}
              register={register}
              errors={errors}
              radioOptions={registrationTypes}
            /> */}
            <PhotoUpload
              name="profilePhoto"
              label="profilePhoto"
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
                name="apellation"
                control={control}
                label="Apellation"
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
              <FormInputText
                name="dateOfBirth"
                control={control}
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
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
            <Grid item sm={6}>
              <FormInputText
                name="photo"
                control={control}
                label="Attach Photo"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="signature"
                control={control}
                label="Attach Signature "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={(e) => {
                handleSubmitForm(e);
              }}
              // onClick={() => onSubmit}
              disabled={isSubmitting}
              sx={buttonSx}
            >
              Save
            </Button>
            {isSubmitting}
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
