import React, { MouseEvent, SyntheticEvent, useState } from 'react';
import { Box, Button, DialogContent, Grid, Tabs, Tab } from '@mui/material';
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import {
  useForm,
  UseFormRegister,
  UseFormWatch,
  UseFormResetField,
  Control,
  FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateFisherfolkDocument,
  MutationCreateFisherfolkArgs,
} from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import { FfolkValidation } from './validation/schema';
import GearForm from './GearForm';
import VesselForm from './VesselForm';
import FfolkInfoForm from './FfolkInfoForm';

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
  const [step, setStep] = useState('ffolkInfo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const {
    register,
    watch,
    control,
    handleSubmit,
    resetField,
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(FfolkValidation),
  });

  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const watchMainFishAct = watch('mainFishingActivity');

  const watchFishCapture = watch([
    'mainFishingActivity',
    'otherFishingActivities',
  ]);

  const watchOtherFishAct = watch('otherFishingActivities');

  const mainFishAct = {
    aquaculture: watchMainFishAct == 'Aquaculture',
    captureFishing: watchMainFishAct == 'CaptureFishing',
    fishVending: watchMainFishAct == 'FishVending',
    fishProcessing: watchMainFishAct == 'FishProcessing',
  };

  const otherFishAct = {
    aquaculture:
      watchOtherFishAct instanceof Array &&
      watchOtherFishAct.includes('Aquaculture'),
    captureFishing:
      watchOtherFishAct instanceof Array &&
      watchOtherFishAct.includes('CaptureFishing'),
    fishVending:
      watchOtherFishAct instanceof Array &&
      watchOtherFishAct.includes('FishVending'),
    fishProcessing:
      watchOtherFishAct instanceof Array &&
      watchOtherFishAct.includes('FishProcessing'),
  };

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

  const captureFishingRegistrant =
    watchMainFishAct == 'CaptureFishing' ||
    (watchOtherFishAct instanceof Array &&
      watchOtherFishAct.includes('CaptureFishing'));

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
    console.log(getValues('HookAndLine')[0]['type']);
    console.log(invalidFfolkInfo);
    onSubmit();
  };

  const handleNextButton = (e: MouseEvent) => {
    trigger();
    console.log(getValues());
    // if (isValid) {

    //   setCaptureFishing(true);
    // }
    setStep('gearVessel');
  };

  const handleBackButton = (e: MouseEvent) => {
    console.log(getValues());
    setStep('ffolkInfo');
  };

  const bottomRowButtons = () => {
    switch (step) {
      case 'ffolkInfo':
        return (
          <Button
            type={captureFishingRegistrant ? 'button' : 'submit'}
            variant="contained"
            fullWidth
            onClick={
              captureFishingRegistrant ? handleNextButton : handleSubmitForm
            }
            disabled={isSubmitting}
            sx={buttonSx}
          >
            {captureFishingRegistrant ? 'Next' : 'Save'}
          </Button>
        );
      case 'gearVessel':
        return (
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
        );

      default:
        break;
    }
  };

  const formTab = (
    control: Control<FieldValues, unknown>,
    register: UseFormRegister<FieldValues>,
    errors: FieldValues
  ) => {
    switch (tab) {
      case 'gear':
        return (
          <GearForm control={control} register={register} errors={errors} />
        );
      case 'vessel':
        return <VesselForm />;
      case 'gear&vessel':
        return (
          <>
            <VesselForm />
            <GearForm control={control} register={register} errors={errors} />
          </>
        );
    }
    return <></>;
  };

  const formStep = (
    control: Control<FieldValues, unknown>,
    register: UseFormRegister<FieldValues>,
    errors: FieldValues,
    watch: UseFormWatch<FieldValues>,
    resetField: UseFormResetField<FieldValues>
  ) => {
    switch (step) {
      case 'ffolkInfo':
        return FfolkInfoForm({ control, register, errors, watch, resetField });

      case 'gearVessel':
        return (
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
            {formTab(control, register, errors)}
          </Box>
        );
    }
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
          {formStep(control, register, errors, watch, resetField)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {bottomRowButtons()}
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
