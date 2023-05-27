import React, { MouseEvent, SyntheticEvent, useState } from 'react';
import { Box, Button, DialogContent, Grid, Tabs, Tab } from '@mui/material';
import { FormContainer, FormContainerTitle } from '../Containers/FormContainers';
import { useForm, UseFormRegister, UseFormWatch, UseFormResetField, Control, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateFisherfolkDocument, GearsQueryDocument, MutationCreateFisherfolkArgs, QueryFisherfolksDocument, VesselQueryDocument } from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import { FfolkValidation } from './validation/schema';
import GearForm from './GearForm';
import VesselForm from './VesselForm';
import FfolkInfoForm from './FfolkInfoForm';
import Loading from '../Loading/Loading';

interface AddFisherfolkFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddFisherfolkForm({ open, handleClose }: AddFisherfolkFormProps) {
  const [complete, setComplete] = useState(false);
  const [tab, setTab] = useState('');
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
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(FfolkValidation(tab)) });

  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const watchMainFishAct = watch('mainFishingActivity');

  const watchOtherFishAct = watch('otherFishingActivities');

  const captureFishingRegistrant = watchMainFishAct == 'CaptureFishing' || (watchOtherFishAct instanceof Array && watchOtherFishAct.includes('CaptureFishing'));

  const [createFisherfolk, { loading }] = useMutation(CreateFisherfolkDocument, {
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
    refetchQueries: [{ query: QueryFisherfolksDocument }, { query: VesselQueryDocument }, { query: GearsQueryDocument }],
  });

  const handleTabChange = (event: SyntheticEvent, newValue: string) => setTab(newValue);

  const onSubmit = handleSubmit(async (input) => {
    const org = input.withOrg
      ? {
          name: input.org.name,
          yearJoined: parseInt(input.org.memberSince),
          position: input.org.position,
        }
      : null;
    let gears = null;
    let vessel = null;

    if (step == 'gearVessel') {
      if (tab == 'gear' || tab == 'gear&vessel') {
        const hookAndLine = input.gears.hookAndLine == 'false' ? [] : input.gears.hookAndLine;
        const gillNets = input.gears.gillNets == 'false' ? [] : input.gears.gillNets;
        const liftNets = input.gears.liftNets == 'false' ? [] : input.gears.liftNets;
        const potsAndTraps = input.gears.potsAndTraps == 'false' ? [] : input.gears.potsAndTraps;
        const seineNets = input.gears.seineNets == 'false' ? [] : input.gears.seineNets;
        const scoopNets = input.gears.scoopNets == 'false' ? [] : input.gears.scoopNets;
        const fallingGear = input.gears.fallingGear == 'false' ? [] : input.gears.fallingGear;
        const miscellaneous = input.gears.miscellaneous == 'false' ? [] : input.gears.miscellaneous;
        gears = [...hookAndLine, ...gillNets, ...liftNets, ...potsAndTraps, ...seineNets, ...scoopNets, ...fallingGear, ...miscellaneous, input.gears.others];
      }

      if (tab == 'vessel' || tab == 'gear&vessel') {
        vessel = {
          mfvrNumber: input.vessel.mfvrNumber,
          homeport: input.vessel.homeport,
          name: input.vessel.name,
          material: input.vessel.material,
          type: input.vessel.type,
          placeBuilt: input.vessel.placeBuilt,
          yearBuilt: input.vessel.yearBuilt ? parseInt(input.vessel.yearBuilt) : 0,
          registeredLength: input.vessel.registeredLength ? parseFloat(input.vessel.registeredLength) : 0,
          registeredDepth: input.vessel.registeredDepth ? parseFloat(input.vessel.registeredDepth) : 0,
          registeredBreadth: input.vessel.registeredBreadth ? parseFloat(input.vessel.registeredBreadth) : 0,
          tonnageLength: input.vessel.tonnageLength ? parseFloat(input.vessel.tonnageLength) : 0,
          tonnageDepth: input.vessel.tonnageDepth ? parseFloat(input.vessel.tonnageDepth) : 0,
          tonnageBreadth: input.vessel.tonnageBreadth ? parseFloat(input.vessel.tonnageBreadth) : 0,
          grossTonnage: input.vessel.grossTonnage ? parseFloat(input.vessel.grossTonnage) : 0,
          netTonnage: input.vessel.netTonnage ? parseFloat(input.vessel.netTonnage) : 0,
          engineMake: input.vessel.engineMake,
          serialNumber: input.vessel.serialNumber,
          horsepower: input.vessel.horsepower ? parseFloat(input.vessel.horsepower) : 0,
          files: input.vessel.files,
        };
      }
    }

    handleSubmitting();
    const createFisherfolkInput: MutationCreateFisherfolkArgs = {
      data: {
        lastName: input.lastName,
        firstName: input.firstName,
        middleName: input.middleName,
        appellation: input.appellation,
        age: parseInt(input.age),
        salutation: input.salutation,
        barangay: input.barangay,
        cityMunicipality: input.cityMunicipality,
        province: input.province,
        contactNum: input.contactNumber,
        residentYear: parseInt(input.residentYear),
        dateOfBirth: new Date(input.dateOfBirth),
        placeOfBirth: input.placeOfBirth,
        religion: input.religion,
        gender: input.gender,
        civilStatus: input.civilStatus,
        numOfChildren: input.numOfChildren ? parseInt(input.numOfChildren) : 0,
        nationality: input.nationality,
        educationalBackground: input.educationalBackground,
        personToNotify: input.personToNotify,
        ptnRelationship: input.ptnRelationship,
        ptnAddress: input.ptnAddress,
        ptnContactNum: input.ptnContactNum,
        mainFishingActivity: input.mainFishingActivity,
        otherFishingActivity: !input.otherFishingActivities ? [] : input.otherFishingActivities,
        otherSourceOfIncome: input.otherSourceOfIncome,
        organization: org,
        profilePhoto: input.profilePhoto,
        files: typeof input.files == 'string' ? [] : input.files,
        gears: gears,
        vessel: vessel,
      },
    };
    await createFisherfolk({
      variables: {
        data: createFisherfolkInput.data,
      },
    });
  });

  const handleSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    trigger(undefined, { shouldFocus: true });

    onSubmit();
  };

  const handleNextButton = (e: MouseEvent) => {
    trigger();

    if (isValid) {
      setStep('gearVessel');
      setTab('gear');
    }
  };

  const handleBackButton = (e: MouseEvent) => {
    reset();
    setStep('ffolkInfo');
    setTab('Gear');
  };

  const bottomRowButtons = () => {
    switch (step) {
      case 'ffolkInfo':
        return (
          <Button type={captureFishingRegistrant ? 'button' : 'submit'} variant="contained" fullWidth onClick={captureFishingRegistrant ? handleNextButton : handleSubmitForm} disabled={isSubmitting} sx={buttonSx}>
            {captureFishingRegistrant ? 'Next' : 'Save'}
          </Button>
        );
      case 'gearVessel':
        return (
          <Grid container spacing={-2} sx={{ justifyContent: 'space-between', ml: 1, mt: 2 }}>
            <Grid item>
              <Button variant="contained" fullWidth onClick={handleBackButton} disabled={isSubmitting} sx={buttonSx}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" fullWidth onClick={handleSubmitForm} disabled={isSubmitting} sx={buttonSx}>
                Save
              </Button>
            </Grid>
          </Grid>
        );

      default:
        break;
    }
  };

  const formTab = (control: Control<FieldValues, unknown>, register: UseFormRegister<FieldValues>, errors: FieldValues) => {
    switch (tab) {
      case 'gear':
        return <GearForm control={control} register={register} errors={errors} />;
      case 'vessel':
        return <VesselForm control={control} register={register} errors={errors} />;
      case 'gear&vessel':
        return (
          <>
            <VesselForm control={control} register={register} errors={errors} />
            <GearForm control={control} register={register} errors={errors} />
          </>
        );
    }
    return <></>;
  };

  const formStep = (control: Control<FieldValues, unknown>, register: UseFormRegister<FieldValues>, errors: FieldValues, watch: UseFormWatch<FieldValues>, resetField: UseFormResetField<FieldValues>) => {
    switch (step) {
      case 'ffolkInfo':
        return FfolkInfoForm({ control, register, errors, watch, resetField });

      case 'gearVessel':
        return (
          <Box id="ffolk-form-gear">
            <Tabs value={tab} onChange={handleTabChange} aria-label="Fisherfolk form tab selection">
              <Tab label="Gear" value={'gear'} />
              <Tab label="Vessel" value={'vessel'} />
              <Tab label="Gear & Vessel" value={'gear&vessel'} />
            </Tabs>
            {formTab(control, register, errors)}
          </Box>
        );
    }
  };

  //Temporarily Disabled Responsive issues
  // if (loading) {
  //   return (
  //     <>
  //       <FormContainer onClose={close} aria-labelledby="form-container" open={open}>
  //         <Loading />
  //       </FormContainer>
  //     </>
  //   );
  // }

  return (
    <>
      <FormContainer onClose={close} aria-labelledby="form-container" open={open}>
        <FormContainerTitle aria-labelledby="form-container-title" onClose={handleClose}>
          Fisherfolk Registration
        </FormContainerTitle>
        <DialogContent dividers>
          {formStep(control, register, errors, watch, resetField)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>{bottomRowButtons()}</Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
