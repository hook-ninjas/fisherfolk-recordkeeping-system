import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import {
  RadioOptions,
  FormInputRadio as FormInputRadio,
  FormInputImage,
  FormInputSelect,
  FormInputText,
} from './FormInputFields';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CivilStatus,
  EducationalBackground,
  Gender,
  MutationCreateFisherfolkArgs,
  Nationality,
  RegistrationType,
  Salutation,
  SourceOfIncome,
} from '../../graphql/generated';
import data from './iloilo-city-brgys.json';

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

interface AddMemberFormProps {
  open: boolean;
  handleClose: () => void;
}

const civiStatuses = [
  CivilStatus.Single,
  CivilStatus.Married,
  CivilStatus.LegallySeparated,
  CivilStatus.Widowed,
];

const educationalBackgrounds = [
  EducationalBackground.Elementary,
  EducationalBackground.HighSchool,
  EducationalBackground.College,
  EducationalBackground.PostGraduate,
  EducationalBackground.Vocational,
];

const sourcesOfIncome = [
  SourceOfIncome.CaptureFishing,
  SourceOfIncome.Aquaculture,
  SourceOfIncome.FishVending,
  SourceOfIncome.FishProcessing,
];

const barangays = data.barangays.sort();

const genders: RadioOptions[] = [
  {
    label: Gender.Male,
    value: Gender.Male,
  },
  {
    label: Gender.Female,
    value: Gender.Female,
  },
];

const registrationTypes: RadioOptions[] = [
  {
    label: RegistrationType.NewRegistration,
    value: RegistrationType.NewRegistration,
  },
  {
    label: RegistrationType.Renewal,
    value: RegistrationType.Renewal,
  },
];

const salutations: RadioOptions[] = [
  {
    label: Salutation.Mr,
    value: Salutation.Mr,
  },
  {
    label: Salutation.Ms,
    value: Salutation.Ms,
  },
  {
    label: Salutation.Mrs,
    value: Salutation.Mrs,
  },
];

const nationality: RadioOptions[] = [
  {
    label: Nationality.Filipino,
    value: Nationality.Filipino,
  },
];

const addMemberSchema = object().shape({
  registrationType: string()
    .nullable()
    .oneOf([RegistrationType.Renewal, RegistrationType.NewRegistration])
    .required('Select an option for registration type.'),
  lastName: string().required('Enter last name.'),
  firstName: string().required('Enter first name.'),
  middleName: string().required('Enter middle name.'),
  salutation: string()
    .nullable()
    .oneOf([Salutation.Mr, Salutation.Ms, Salutation.Mrs])
    .required('Select an option for salutation.'),
  contactNumber: string()
    .required('Enter contact number.')
    .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  barangay: string().required('Select an option for barangay'),
  cityMunicipality: string().required('Enter city/municipality.'),
  province: string().required('Enter province.'),
  residentYear: string().matches(/^\d{4}/, 'Please enter year.'),
  gender: string()
    .nullable()
    .oneOf([Gender.Female, Gender.Male])
    .required('Select an option for gender.'),
  age: string()
    .matches(/^$|[0-9]\d(.\d+)?$|\s/, 'Age must be a number.')
    .required('Enter age.'),
  dateOfBirth: string().nullable().required('Select date of birth.'),
  placeOfBirth: string().required('Enter place of birth.'),
  civilStatus: string().required('Select an option for civil status.'),
  educationalBackground: string().required(
    'Select an option for educational background.'
  ),
  religion: string(),
  numberOfChildren: string().matches(
    /^$|[0-9]\d(.\d+)?$|\s/,
    'Must be a number.'
  ),
  nationality: string()
    .nullable()
    .oneOf([Nationality.Filipino])
    .required('Select nationality.'),
  personToNotify: string().required('Enter person to notify.'),
  ptnRelationship: string().required(
    'Enter relationship with person to notify.'
  ),
  ptnContactNum: string()
    .required('Enter contact number of person to notify.')
    .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  ptnAddress: string().required('Enter address of person to notify.'),
  mainSourceOfIncome: string().required(
    'Select an option for main source of income.'
  ),
  mainGearUsed: string(),
  mainMethodUsed: string(),
  otherSourceOfIncome: string(),
  otherGearsUsed: string(),
  otherMethodUsed: string(),
  orgName: string(),
  orgMemberSince: string().matches(
    /^$|[0-9]\d(.\d+)?$|\s/,
    'Please enter year.'
  ),
  orgPosition: string(),
  image: string().required('Attach some image.'),
  signature: string().required('Attach some signature.'),
});

export default function AddMemberForm({
  open,
  handleClose,
}: AddMemberFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addMemberSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const createFisherfolkInput: MutationCreateFisherfolkArgs = {
      data: {
        age: parseInt(data.age),
        barangay: data.barangay,
        cityMunicipality: data.cityMunicipality,
        civilStatus: data.civilStatus,
        contactNum: data.contactNumber,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        educationalBackground: data.educationalBackground,
        firstName: data.firstName,
        gender: data.gender,
        image: data.image,
        lastName: data.lastName,
        mainSrcGear: data.mainGearUsed,
        mainSrcMethod: data.mainMethodUsed,
        mainSrcOfIncome: data.mainSourceOfIncome,
        middleName: data.middleName,
        nationality: data.nationality,
        personToNotify: data.personToNotify,
        placeOfBirth: data.placeOfBirth,
        province: data.province,
        ptnAddress: data.ptnAddress,
        ptnContactNum: data.ptnContactNum,
        ptnRelationship: data.ptnRelationship,
        registrationType: data.registrationType,
        religion: data.religion,
        residentYear: data.residentYear,
        salutation: data.salutation,
        signature: data.signature,
        numOfChildren:
          data.numberOfChildren === '' ? null : parseInt(data.numberOfChildren),
        orgName: data.orgName,
        orgPosition: data.orgPosition,
        orgYearMember:
          data.orgMemberSince === '' ? null : parseInt(data.orgMemberSince),
        otherSrcGear: data.otherGearUsed,
        otherSrcMethod: data.otherMethodUsed,
        otherSrcOfIncome: data.otherSourceOfIncome ?? null,
      },
    };
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
          Add Member
        </FormContainerTitle>
        <DialogContent dividers>
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
              radioOptions={registrationTypes}
            />
          </Box>
          <Typography variant="h6" color="GrayText" mt={2} mb={-1} ml={2}>
            Personal Information
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              pl: 2,
            }}
          >
            <FormInputRadio
              name="salutation"
              label="salutation"
              control={control}
              register={register}
              errors={errors}
              radioOptions={salutations}
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
          <Grid container spacing={-2} sx={{ ml: 1 }}>
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
                name="contactNumber"
                control={control}
                label="Contact Number"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputSelect
                name="barangay"
                label="Select Barangay"
                data={barangays}
                onSavedValue=""
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: -1, ml: -1 }}>
              <FormInputText
                name="cityMunicipality"
                control={control}
                label="City/Municipality"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="province"
                control={control}
                label="Province"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="residentYear"
                control={control}
                label="Resident of the Municipality since"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
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
                name="dateOfBirth"
                control={control}
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
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
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2, mt: 1 }}>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                color="GrayText"
                mt={0.5}
                mb={-1}
                ml={0.5}
              >
                Gender
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  pl: 0.5,
                }}
              >
                <FormInputRadio
                  name="gender"
                  label="gender"
                  register={register}
                  errors={errors}
                  control={control}
                  radioOptions={genders}
                />
              </Box>
            </Grid>
            <Grid item sm={6}>
              <FormInputSelect
                name="civilStatus"
                label="Select Civil Status"
                data={civiStatuses}
                onSavedValue=""
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="numberOfChildren"
                control={control}
                label="Number of Children"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                color="GrayText"
                mt={1}
                mb={-1}
                ml={2}
              >
                Nationality
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  pl: 2,
                }}
              >
                <FormInputRadio
                  name="nationality"
                  label="nationality"
                  control={control}
                  register={register}
                  errors={errors}
                  radioOptions={nationality}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputSelect
                name="educationalBackground"
                label="Select Educational Background"
                data={educationalBackgrounds}
                onSavedValue=""
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
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
          <Grid container spacing={-2} sx={{ ml: 1 }}>
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
          <Typography variant="h6" color="GrayText" mt={2} mb={-1} ml={2}>
            Livelihood
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 2, mt: 2 }}>
            <Grid item sm={6}>
              <FormInputSelect
                name="mainSourceOfIncome"
                label="Selct Main Source of Income"
                data={sourcesOfIncome}
                onSavedValue=""
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="mainGearUsed"
                control={control}
                label="Specify gear used"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="mainMethodUsed"
                control={control}
                label="Specify method used"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2, mt: 2 }}>
            <Grid item sm={6}>
              <FormInputSelect
                name="otherSourceOfIncome"
                label="Select Other Source of Income"
                data={sourcesOfIncome}
                onSavedValue=""
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="otherGearUsed"
                control={control}
                label="Specify gear used"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="otherMethodUsed"
                control={control}
                label="Specify method used"
                placeholder=""
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
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
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
          <Grid container spacing={-2} sx={{ mt: 1 }}>
            <Grid item sm={6}>
              <Typography variant="body1" color="GrayText" mb={1} ml={2.3}>
                Upload Image
              </Typography>
              <FormInputImage
                name="image"
                label="Upload Image"
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography variant="body1" color="GrayText" mb={1} ml={2.3}>
                Upload Signature
              </Typography>
              <FormInputImage
                name="signature"
                label="Upload Signature"
                control={control}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmitForm}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
