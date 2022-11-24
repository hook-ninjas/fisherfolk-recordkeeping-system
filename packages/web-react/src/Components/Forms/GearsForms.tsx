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
} from './FormInputFields';
import { useForm } from 'react-hook-form';
import { object, string, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateFisherfolkDocument,
  MutationCreateFisherfolkArgs,
} from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import {
  vesselTypeOptions,
  educationalBackgroundOptions,
  createOption,
  materialUsedOptions,
  registrationTypesGears,
  salutations,
  barangays,
  genders,
  civilStatus,
  sourcesOfIncome,
} from './Enums';
import { getValues } from '../../utils/utils';

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

interface AddGearsFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddGearsForm({
  open,
  handleClose,
}: AddGearsFormProps) {
  const [complete, setComplete] = useState(false);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nationalities, setNationalities] = useState(vesselTypeOptions);
  const [educationalBackgrounds, setEducationalBackgrounds] = useState(
    educationalBackgroundOptions
  );
  const [hookandLine, setOtherFishingActivities] = React.useState({
    SimpleHandLine: false,
    MulipleHandLine: false,
    Bottomsetlongline: false,
    DriftlongLine: false,
    TrollLine: false,
    Jig: false,
    SurfaceSetGill: false,
    DriftGillNet: false,
    BottomsetGillNet: false,
    Trammelnet: false,
    EncirclinGillNet: false,
    CrabLiftNets: false,
    FishLiftNets: false,
    NewLook: false,
    ShrimpLiftNets: false,
    LeverNet: false,
    CrabPots: false,
    SquidPots: false,
    FykeNet: false,
    FishCorrals: false,
    SetNet: false,
    BarrierNet: false,
    FishPots: false,
    BeachSeine: false,
    FryDozerorGatherer: false,
    ManPushNets: false,
    ScoopNets: false,
    Spear: false,
    SquidLurkingDevice: false,
    GaffHook: false,
    CastNet: false

  });


  const { SimpleHandLine, MulipleHandLine, Bottomsetlongline, DriftlongLine,
    TrollLine, Jig, SurfaceSetGill, DriftGillNet, BottomsetGillNet, Trammelnet,
    EncirclinGillNet, CrabLiftNets, FishLiftNets, NewLook, ShrimpLiftNets, LeverNet,
    CrabPots, SquidPots, FykeNet, FishCorrals, SetNet, BarrierNet, FishPots,
    BeachSeine, FryDozerorGatherer, ManPushNets, ScoopNets, Spear, SquidLurkingDevice,
    GaffHook, CastNet } =
    hookandLine;


  const handleComplete = () => setComplete(true);

  const handleOtherFishingActivityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherFishingActivities({
      ...hookandLine,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCreateTypeVessel = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = createOption(inputValue);
      setIsLoading(false);
      setNationalities((prev) => [...prev, newValue]);
    }, 1500);
  };





  const addFisherfolkSchema = object().shape({
    registrationType: string()
      .nullable()
      .oneOf(getValues(registrationTypesGears))
      .required('Select an option for registration type.'),
    // lastName: string().required('Enter last name.'),
    // firstName: string().required('Enter first name.'),
    // middleName: string().required('Enter middle name.'),
    // salutation: string()
    //   .nullable()
    //   .oneOf(getValues(salutations))
    //   .required('Select an option for salutation.'),
    // contactNumber: string()
    //   .required('Enter contact number.')
    //   .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
    // barangay: string().required('Select an option for barangay'),
    // cityMunicipality: string().required('Enter city/municipality.'),
    // province: string().required('Enter province.'),
    // residentYear: string().matches(/^\d{4}$/, 'Please enter year.'),
    // gender: string()
    //   .nullable()
    //   .oneOf(getValues(genders))
    //   .required('Select an option for gender.'),
    // age: string()
    //   .matches(/^$|\d{1,3}$/, 'Age must be a number.')
    //   .required('Enter age.'),
    // dateOfBirth: string().nullable().required('Select date of birth.'),
    // placeOfBirth: string().required('Enter place of birth.'),
    // civilStatus: string().required('Select an option for civil status.'),
    // educationalBackground: mixed()
    //   .nullable()
    //   .oneOf(getValues(educationalBackgrounds))
    //   .required('Enter or select educational background.'),
    // numberOfChildren: string().matches(/^$|\d{1,2}$/, 'Must be a number.'),
    // nationality: mixed()
    //   .nullable()
    //   .oneOf(getValues(nationalities))
    //   .required('Enter or select nationality.'),
    // personToNotify: string().required('Enter person to notify.'),
    // ptnRelationship: string().required(
    //   'Enter relationship with person to notify.'
    // ),
    // ptnContactNum: string()
    //   .required('Enter contact number of person to notify.')
    //   .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
    // ptnAddress: string().required('Enter address of person to notify.'),
    // mainFishingActivity: string().required(
    //   'Select an option for main fishing activity.'
    // ),
    // orgMemberSince: string().matches(/^$|\d{4}$/, 'Please enter year.'),
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
    onError: () => {
      handleClose();
      handleComplete();
      showFailAlert();
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
      },
    };
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
          Boat/Gear Registration
        </FormContainerTitle>
        <DialogContent dividers>
          <Typography variant="body1" color="GrayText" mb={2} ml={2}>
            Type of Registration
          </Typography>
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
              radioOptions={registrationTypesGears}
            />
          </Box>

          <Grid container spacing={-2} sx={{ ml: 1, mr: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="Homeport"
                control={control}
                label="Homeport"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="NameofFishingVessel"
                control={control}
                label="Name of Fishing Vessel"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormCreatableSelect
                control={control}
                errors={errors}
                isLoading={isLoading}
                isDisabled={isLoading}
                label=""
                name="vesselType"

                onCreateOption={handleCreateTypeVessel}
                options={vesselTypeOptions}
                register={register}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormCreatableSelect
                control={control}
                errors={errors}
                isLoading={isLoading}
                isDisabled={isLoading}
                label=""
                name="materialUsed"
                // onChange={(newValue) => setNationality(newValue)}
                onCreateOption={handleCreateTypeVessel}
                options={materialUsedOptions}
                register={register}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
              <FormInputText
                name="placeBuilt"
                control={control}
                label="Place Built"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, }}>
              <FormInputText
                name="yearBuilt"
                control={control}
                label="Year Built"
                placeholder="e.g. 2020"
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Typography variant="body1" color="GrayText" mb={2} ml={2}>
            Fishing Vessel Dimensions and Tonnages (Meters)
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="registeredLength "
                control={control}
                label="Registered Length "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="registeredBreadth "
                control={control}
                label="Registered Breadth "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="Registeredepth "
                control={control}
                label="Registered Depth "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="tonnageDepth "
                control={control}
                label="Tonnage Depth "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="grossTonnage "
                control={control}
                label="Gross Tonnage "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="netTonnage "
                control={control}
                label="Net Tonnage"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Typography variant="body1" color="GrayText" mb={1} ml={2} mt={2}>
            Particulars of Propulsion System
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormInputText
                name="engineMake  "
                control={control}
                label="Engine Make "
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormInputText
                name="serialNumber"
                control={control}
                label="Serial Number"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6} sx={{ mt: -1 }}>
              <FormInputText
                name="horsepower"
                control={control}
                label="Horsepower"
                placeholder=""
                register={register}
                errors={errors}
              />

            </Grid>

          </Grid>
          <Typography variant="h6" color="GrayText" mt={2} mb={-1} ml={2}>
            Classification of Fishing Gear
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
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Hook and line
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={SimpleHandLine}
                          onChange={handleOtherFishingActivityChange}
                          name="SimpleHandLine"
                        />
                      }
                      label="Simple-hand line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={MulipleHandLine}
                          onChange={handleOtherFishingActivityChange}
                          name="MulipleHandLine"
                        />
                      }
                      label="Multiple-Hand Line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={Bottomsetlongline}
                          onChange={handleOtherFishingActivityChange}
                          name="Bottomsetlongline"
                        />
                      }
                      label="Bottom set long line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={DriftlongLine}
                          onChange={handleOtherFishingActivityChange}
                          name="DriftlongLine"
                        />
                      }
                      label="Drift long Line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={TrollLine}
                          onChange={handleOtherFishingActivityChange}
                          name="TrollLine"
                        />
                      }
                      label="Troll line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={Jig}
                          onChange={handleOtherFishingActivityChange}
                          name="Jig"
                        />
                      }
                      label="Jig"
                    />
                  </FormGroup>

                </Box>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Gil Nets
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={SurfaceSetGill}
                          onChange={handleOtherFishingActivityChange}
                          name="SurfaceSetGill"
                        />
                      }
                      label="Surface Set Gill"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={DriftGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="DriftGillNet"
                        />
                      }
                      label="Drift Gill Net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={BottomsetGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="BottomsetGillNet"
                        />
                      }
                      label="Bottom set Gill Net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={Trammelnet}
                          onChange={handleOtherFishingActivityChange}
                          name="Trammelnet"
                        />
                      }
                      label="Trammel net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={EncirclinGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="EncirclinGillNet"
                        />
                      }
                      label="Encircling Gill Net"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Lift Nets
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={CrabLiftNets}
                          onChange={handleOtherFishingActivityChange}
                          name="CrabLiftNets"
                        />
                      }
                      label="Crab Lift Nets"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={FishLiftNets}
                          onChange={handleOtherFishingActivityChange}
                          name="FishLiftNets"
                        />
                      }
                      label="Fish lift nets (basnig) / Bagnet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={NewLook}
                          onChange={handleOtherFishingActivityChange}
                          name="NewLook"
                        />
                      }
                      label="“New look” or “Zapra”"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={ShrimpLiftNets}
                          onChange={handleOtherFishingActivityChange}
                          name="ShrimpLiftNets"
                        />
                      }
                      label="Shrimp Lift Nets"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={LeverNet}
                          onChange={handleOtherFishingActivityChange}
                          name="LeverNet"
                        />
                      }
                      label="Lever Net"
                    />
                  </FormGroup>

                </Box>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Ports and Traps
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={CrabPots}
                          onChange={handleOtherFishingActivityChange}
                          name="CrabPots"
                        />
                      }
                      label="Crab Pots"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={SquidPots}
                          onChange={handleOtherFishingActivityChange}
                          name="SquidPots"
                        />
                      }
                      label="Squid Pots"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={FykeNet}
                          onChange={handleOtherFishingActivityChange}
                          name="FykeNet"
                        />
                      }
                      label="Fyke nets/filter nest"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={FishCorrals}
                          onChange={handleOtherFishingActivityChange}
                          name="FishCorrals"
                        />
                      }
                      label="Fish corrals (Baklad)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={SetNet}
                          onChange={handleOtherFishingActivityChange}
                          name="SetNet"
                        />
                      }
                      label="Set net (Lambaklad)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={BarrierNet}
                          onChange={handleOtherFishingActivityChange}
                          name="BarrierNet"
                        />
                      }
                      label="Barrier net (Likus)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={FishPots}
                          onChange={handleOtherFishingActivityChange}
                          name="FishPots"
                        />
                      }
                      label="FishPots"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Seine Nets
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={BeachSeine}
                          onChange={handleOtherFishingActivityChange}
                          name="BeachSeine"
                        />
                      }
                      label="Beach Seine"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={FryDozerorGatherer}
                          onChange={handleOtherFishingActivityChange}
                          name="FryDozerorGatherer"
                        />
                      }
                      label="Fry Dozer or Gatherer"
                    />
                  </FormGroup>

                </Box>
              </Grid>

              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Scoop Nets
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={ManPushNets}
                          onChange={handleOtherFishingActivityChange}
                          name="ManPushNets"
                        />
                      }
                      label="Man Push Nets"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={ScoopNets}
                          onChange={handleOtherFishingActivityChange}
                          name="ScoopNets"
                        />
                      }
                      label="Scoop Nets"
                    />

                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Miscellaneous Fishing Gears
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={Spear}
                          onChange={handleOtherFishingActivityChange}
                          name="Spear"
                        />
                      }
                      label="Spear"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={SquidLurkingDevice}
                          onChange={handleOtherFishingActivityChange}
                          name="SquidLurkingDevice"
                        />
                      }
                      label="Octopus/Squid Lurking Device"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={GaffHook}
                          onChange={handleOtherFishingActivityChange}
                          name="GaffHook"
                        />
                      }
                      label="Gaff Hook"
                    />

                  </FormGroup>

                </Box>
              </Grid>

              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Falling Gear
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: -3,
                    mb: 2,
                    pl: 1,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          checked={CastNet}
                          onChange={handleOtherFishingActivityChange}
                          name="CastNet"
                        />
                      }
                      label="Cas tNet"
                    />


                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
            <Grid item sm={6}>
              <FormInputText
                name="Others"
                control={control}
                label="Others"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>

          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="AttachSignature"
                control={control}
                label="Attach Signature"
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