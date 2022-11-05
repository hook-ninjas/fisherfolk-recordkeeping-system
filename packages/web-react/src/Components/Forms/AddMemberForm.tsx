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
  EducationalBackground,
  Gender,
  Nationality,
  RegistrationType,
  Salutation,
  SourceOfIncome,
} from '../../graphql/generated';

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

const addMemberSchema = object().shape({
  lastName: string().required('Last name is required.'),
  firstName: string().required('First name is required.'),
  middleName: string().required('Middle name is required.'),
  // to add more properties
});

export default function AddMemberForm({
  open,
  handleClose,
}: AddMemberFormProps) {
  const {
    register,
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addMemberSchema),
  });

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
                name="last-name"
                control={control}
                label="Last Name"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="first-name"
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
                name="middle-name"
                control={control}
                label="Middle Name"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="contact-number"
                control={control}
                label="Contact Number"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="street-brgy"
                control={control}
                label="Street/Barangay"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="city-municipality"
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
                name="resident-year"
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
                name="date-of-birth"
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
                name="place-of-birth"
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
                name="civil-status"
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
                name="num-of-children"
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
                name="educ-background"
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
                name="person-to-notify"
                control={control}
                label="Person to Notify"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="ptn-relationship"
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
                name="ptn-contact-num"
                control={control}
                label="Contact Number"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="ptn-address"
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
                name="main-src-income"
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
                name="main-inc-src-gear"
                control={control}
                label="Specify gear used"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="main-inc-src-method"
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
                name="other-src-income"
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
                name="other-inc-src-gear"
                control={control}
                label="Specify gear used"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="other-inc-src-method"
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
                name="org-name"
                control={control}
                label="Name"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="org-member-since"
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
                name="org-position"
                control={control}
                label="Position/Official Designation"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" fullWidth>
              {' '}
              Save
            </Button>
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
