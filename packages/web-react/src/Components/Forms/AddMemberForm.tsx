import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { FormInputSelect, FormInputText } from './FormInputFields';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CivilStatus,
  CreateFisherfolkDocument,
  EducationalBackground,
  Gender,
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

const replaceUnderscore = (list: string[]) =>
  list.map((x) => x.replace('_', ' '));

const civiStatuses = replaceUnderscore([
  CivilStatus.Single,
  CivilStatus.Married,
  CivilStatus.LegallySeparated,
  CivilStatus.Widowed,
]);
const educationalBackgrounds = replaceUnderscore([
  EducationalBackground.Elementary,
  EducationalBackground.HighSchool,
  EducationalBackground.College,
  EducationalBackground.PostGraduate,
  EducationalBackground.Vocational,
]);
const sourcesOfIncome = replaceUnderscore([
  SourceOfIncome.CaptureFishing,
  SourceOfIncome.Aquaculture,
  SourceOfIncome.FishVending,
  SourceOfIncome.FishProcessing,
]);
const barangays = data.barangays.sort();

const addMemberSchema = object().shape({
  lastName: string().required('Enter last name.'),
  firstName: string().required('Enter first name.'),
  middleName: string().required('Enter middle name.'),
  contactNumber: string()
    .required('Enter contact number.')
    .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  barangay: string().required('Select an option for barangay'),
  cityMunicipality: string().required('Enter city/municipality.'),
  province: string().required('Enter province.'),
  residentYear: string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Please enter year.'),
  age: string().matches(/^[0-9]\d(.\d+)?$|\s/, 'Age must be a number.').required('Enter age.'),
  dateOfBirth: string().nullable().required('Select date of birth.'),
  placeOfBirth: string().required('Enter place of birth.'),
  civilStatus: string().required('Select an option for civil status.'),
  educationalBackground: string().required('Select an option for educational background.'),
  religion: string(),
  numberOfChildren: string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Must be a number.'),
  personToNotify: string().required('Enter person to notify.'),
  ptnRelationship: string().required('Enter relationship with person to notify.'),
  ptnContactNum: string()
    .required('Enter contact number of person to notify.')
    .matches(/^(09|\+639)\d{9}$/, 'Enter a valid contact number.'),
  address: string().required('Enter address of person to notify.'),
  mainSourceofIncome: string().required('Select an option for main source of income.'),
  mainGearUsed: string(),
  mainMethodUsed: string(),
  otherSourceofIncome: string(),
  otherGearsUsed: string(),
  otherMethodUsed: string(),
  orgName: string(),
  orgMemberSince: string().matches(/^[0-9]\d(.\d+)?$|\s/, 'Please enter year.'),
  orgPosition: string(),

});
interface CreateInputProps {
  data: {
    lastnameValidation: string;
    fistNameValidation: string;
    middleNameValidation: string;
  }
}



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
    const createInput: CreateInputProps = {
      data: {
        lastnameValidation: data.lastName,
        fistNameValidation: data.fistNameValidation,
        middleNameValidation: data.middleNameValidation,
      }
    };
  });
  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
            <FormControlLabel
              control={<Checkbox />}
              label={RegistrationType.NewRegistration.replace('_', ' ')}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={RegistrationType.Renewal}
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
            <FormControlLabel control={<Checkbox />} label={Salutation.Mr} />
            <FormControlLabel control={<Checkbox />} label={Salutation.Ms} />
            <FormControlLabel control={<Checkbox />} label={Salutation.Mrs} />
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
                label="City Municipality"
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
                placeholder=""
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
                <FormControlLabel control={<Checkbox />} label={Gender.Male} />
                <FormControlLabel
                  control={<Checkbox />}
                  label={Gender.Female}
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
                <FormControlLabel
                  control={<Checkbox />}
                  label={Nationality.Filipino}
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
                name="address"
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
                name="mainSourceofIncome"
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
                name="specifyGearUsed"
                control={control}
                label="Specify gear used"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="specifyMethodUsed"
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
                name="otherSourceofIncome"
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
                name="otherGearsUsed"
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>

            <Button type="submit" variant="contained" fullWidth onClick={(e) => { handleSubmitForm(e); }}>
              {' '}
              Save
            </Button>
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
