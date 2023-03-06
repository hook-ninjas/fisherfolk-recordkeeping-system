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
import {
  FormContainer,
  FormContainerTitle,
} from '../Containers/FormContainers';
import {
  FormInputRadio,
  FormInputText,
  FormCreatableSelect,
  FormInputSelect,
} from './FormInputFields';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateGearsDocument,
  CreateVesselDocument,
  CreateVessselWithGearDocument,
  GearClassification,
  MutationCreateVesselWithGearArgs,
  MutationCreateImageArgs,
  CreateImageDocument,
  FisherfolkGearsDocument,
  GearsQueryDocument,
} from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import {
  createOption,
  registrationTypeForBoatsAndGears,
  gears,
  vesselTypeOptions,
  materialOptions,
} from './Enums';
import { useParams } from 'react-router-dom';

interface AddVesselWithGearFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddVesselWithGearForm({
  open,
  handleClose,
}: AddVesselWithGearFormProps) {
  const { id } = useParams();

  const [complete, setComplete] = useState(false);
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
  const [vesselTypes, setVesselTypes] = useState(vesselTypeOptions);

  const [gearTypes, setGearTypes] = useState({
    SimpleHandLine: false,
    MultipleHandLine: false,
    BottomSetLongLine: false,
    DriftLongLine: false,
    TrollLine: false,
    Jig: false,
    SurfaceSetGillNet: false,
    DriftGillNet: false,
    BottomSetGillNet: false,
    TrammelNet: false,
    EncirclingGillNet: false,
    CrabLiftNetsOrBintol: false,
    FishLiftNetsOrBagnet: false,
    NewLookOrZapara: false,
    ShrimpLiftNets: false,
    LeverNet: false,
    CrabPots: false,
    SquidPots: false,
    FykeNetsOrFilterNets: false,
    FishCorralsOrBaklad: false,
    SetNetOrLambaklad: false,
    BarrierNetOrLikus: false,
    FishPots: false,
    BeachSeine: false,
    FryDozerOrGatherer: false,
    ManPushNets: false,
    ScoopNets: false,
    Spear: false,
    OctopusOrSquidLuringDevice: false,
    GaffHook: false,
    CastNet: false,
  });

  const {
    SimpleHandLine,
    MultipleHandLine,
    BottomSetLongLine,
    DriftLongLine,
    TrollLine,
    Jig,
    SurfaceSetGillNet,
    DriftGillNet,
    BottomSetGillNet,
    TrammelNet,
    EncirclingGillNet,
    CrabLiftNetsOrBintol,
    FishLiftNetsOrBagnet,
    NewLookOrZapara,
    ShrimpLiftNets,
    LeverNet,
    CrabPots,
    SquidPots,
    FykeNetsOrFilterNets,
    FishCorralsOrBaklad,
    SetNetOrLambaklad,
    BarrierNetOrLikus,
    FishPots,
    BeachSeine,
    FryDozerOrGatherer,
    ManPushNets,
    ScoopNets,
    Spear,
    OctopusOrSquidLuringDevice,
    GaffHook,
    CastNet,
  } = gearTypes;

  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const handleOtherFishingActivityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGearTypes({
      ...gearTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCreateTypeVessel = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newValue = createOption(inputValue);
      setIsLoading(false);
      setVesselTypes((prev) => [...prev, newValue]);
    }, 1500);
  };

  const addVesselWithGearSchema = object().shape({
    vessel: object().shape({
      engineMake: string(),
      grossTonnage: string().matches(/^[0-9]\d*(\.\d+)?$/, 'Enter a number.'),
      homeport: string(),
      horsepower: string(),
      mfvrNumber: string(),
      material: string().nullable().oneOf(materialOptions),
      name: string(),
      netTonnage: string().matches(/^[0-9]\d*(\.\d+)?$/, 'Enter a number.'),
      placeBuilt: string(),
      registeredBreadth: string().matches(
        /^[0-9]\d*(\.\d+)?$/,
        'Enter a number.'
      ),
      registeredDepth: string().matches(
        /^[0-9]\d*(\.\d+)?$/,
        'Enter a number.'
      ),
      registeredLength: string().matches(
        /^[0-9]\d*(\.\d+)?$/,
        'Enter a number.'
      ),
      serialNumber: string(),
      tonnageBreadth: string().matches(/^[0-9]\d*(\.\d+)?$/, 'Enter a number.'),
      tonnageDepth: string().matches(/^[0-9]\d*(\.\d+)?$/, 'Enter a number.'),
      tonnageLength: string().matches(/^[0-9]\d*(\.\d+)?$/, 'Enter a number.'),
      type: string(),
      yearBuilt: string().matches(/^$|\d{4}$/, 'Enter year.'),
    }),
  });

  const keys = Object.keys(gears) as GearClassification[];

  const getClassification = (value: string) => {
    return keys.filter((r) => (gears[r].includes(value) ? r : ''))[0];
  };

  const generateGears = (gears: { [x: string]: boolean }) =>
    Object.keys(gears)
      .filter((k) => {
        return gears[k] === true;
      })
      .map((type) => ({
        classification: getClassification(type),
        type: type,
        fisherfolkId: parseInt(id!),
      }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addVesselWithGearSchema),
  });

  const [createVesselWithGear] = useMutation(CreateVessselWithGearDocument, {
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

  const [createVessel] = useMutation(CreateVesselDocument, {
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

  const [createGears] = useMutation(CreateGearsDocument, {
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

  const [createImage] = useMutation(CreateImageDocument, {
    onCompleted: () => {
      handleClose();
      handleComplete();
    },
    onError: () => {
      handleClose();
      handleComplete();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleSubmitting();
    const createVesselWithGearInput: MutationCreateVesselWithGearArgs = {
      vessel: {
        engineMake: data.engineMake,
        fisherfolkId: parseInt(id!),
        grossTonnage: parseFloat(data.grossTonnage),
        homeport: data.homeport,
        horsepower: parseInt(data.horsepower),
        material: data.material === undefined ? null : data.material,
        mfvrNumber: data.mfvrNumber,
        name: data.name,
        netTonnage: parseFloat(data.netTonnage),
        placeBuilt: data.placeBuilt,
        registeredBreadth: parseFloat(data.registeredBreadth),
        registeredDepth: parseFloat(data.registeredDepth),
        registeredLength: parseFloat(data.registeredLength),
        serialNumber: data.serialNumber,
        tonnageBreadth: parseFloat(data.tonnageBreadth),
        tonnageDepth: parseFloat(data.tonnageDepth),
        tonnageLength: parseFloat(data.tonnageLength),
        type: data.type == undefined ? '' : data.type,
        yearBuilt: parseInt(data.yearBuilt),
      },
      gears: generateGears(gearTypes),
    };

    const createImageInput: MutationCreateImageArgs = {
      data: {
        fisherfolkId: parseInt(id!),
        url: image!.toString(),
        gear_id: null,
        vessel_id: null,
        text: 'none',
        name: '',
        updated_at: new Date(),
      },
    };

    // create vessel only
    if (createVesselWithGearInput.gears.length == 0) {
      await createVessel({
        variables: {
          vessel: createVesselWithGearInput.vessel,
        },
      });

      await createImage({
        variables: {
          data: createImageInput.data,
        },
      });
    }

    // create gears only
    if (createVesselWithGearInput.vessel.mfvrNumber == '') {
      await createGears({
        variables: {
          gears: createVesselWithGearInput.gears,
        },
        awaitRefetchQueries: true,
        refetchQueries: [ {
          query: GearsQueryDocument
        }]
      });

      await createImage({
        variables: {
          data: createImageInput.data,
        },
      });
    }

    // create both boat and gears
    if (
      createVesselWithGearInput.gears.length != 0 &&
      createVesselWithGearInput.vessel.mfvrNumber != ''
    ) {
      await createVesselWithGear({
        variables: {
          gears: createVesselWithGearInput.gears,
          vessel: createVesselWithGearInput.vessel,
        },
        awaitRefetchQueries: true,
        refetchQueries: [ {
          query: GearsQueryDocument
        }]
      });

      await createImage({
        variables: {
          data: createImageInput.data,
        },
      });
    }

    console.log(image);
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
              radioOptions={registrationTypeForBoatsAndGears}
            />
          </Box>

          <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="mfvrNumber"
                control={control}
                label="MFVR Number"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mr: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="homeport"
                control={control}
                label="Homeport"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="name"
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
              <FormInputSelect
                name="material"
                label="Select Material Used"
                data={materialOptions}
                onSavedValue=""
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <FormCreatableSelect
                control={control}
                errors={errors}
                isLoading={isLoading}
                isDisabled={isLoading}
                name="type"
                placeholder="Select Type"
                onCreateOption={handleCreateTypeVessel}
                options={vesselTypes}
                register={register}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6} sx={{ mt: 1 }}>
              <FormInputText
                name="placeBuilt"
                control={control}
                label="Place Built"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6} sx={{ mt: 1, ml: 0 }}>
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
          <Typography variant="body1" color="GrayText" mb={2} ml={2} mt={2}>
            Fishing Vessel Dimensions and Tonnages (Meters)
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="registeredLength"
                control={control}
                label="Registered Length"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="registeredDepth"
                control={control}
                label="Registered Depth"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="registeredBreadth"
                control={control}
                label="Registered Breadth"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="tonnageLength"
                control={control}
                label="Tonnage Length"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="tonnageDepth"
                control={control}
                label="Tonnage Depth"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="tonnageBreadth"
                control={control}
                label="Tonnage Breadth"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="grossTonnage"
                control={control}
                label="Gross Tonnage"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <FormInputText
                name="netTonnage"
                control={control}
                label="Net Tonnage"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Typography variant="body1" color="GrayText" ml={2} mt={2} mb={2}>
            Particulars of Propulsion System
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 1 }}>
            <Grid item sm={6}>
              <FormInputText
                name="engineMake"
                control={control}
                label="Engine Make"
                placeholder=""
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
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
          <Typography variant="h6" color="GrayText" mt={2} mb={2} ml={2}>
            Classification of Fishing Gear
          </Typography>
          <Grid container spacing={-2} sx={{ ml: 2 }}>
            <Grid container spacing={-2} sx={{ ml: 1, mt: 2 }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Hook and Line
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
                          size="small"
                          checked={SimpleHandLine}
                          onChange={handleOtherFishingActivityChange}
                          name="SimpleHandLine"
                          value="SimpleHandLine"
                        />
                      }
                      label="Simple-Hand Line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={MultipleHandLine}
                          onChange={handleOtherFishingActivityChange}
                          name="MultipleHandLine"
                          value="MultipleHandLine"
                        />
                      }
                      label="Multiple-Hand Line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={BottomSetLongLine}
                          onChange={handleOtherFishingActivityChange}
                          name="BottomSetLongLine"
                          value="BottomSetLongLine"
                        />
                      }
                      label="Bottom Set Long Line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={DriftLongLine}
                          onChange={handleOtherFishingActivityChange}
                          name="DriftLongLine"
                          value="DriftLongLine"
                        />
                      }
                      label="Drift Long Line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={TrollLine}
                          onChange={handleOtherFishingActivityChange}
                          name="TrollLine"
                          value="TrollLine"
                        />
                      }
                      label="Troll line"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={Jig}
                          onChange={handleOtherFishingActivityChange}
                          name="Jig"
                          value="Jig"
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
                          size="small"
                          checked={SurfaceSetGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="SurfaceSetGillNet"
                          value="SurfaceSetGillNet"
                        />
                      }
                      label="Surface Set Gill Net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={DriftGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="DriftGillNet"
                          value="DriftGillNet"
                        />
                      }
                      label="Drift Gill Net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={BottomSetGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="BottomSetGillNet"
                          value="BottomSetGillNet"
                        />
                      }
                      label="Bottom Set Gill Net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={TrammelNet}
                          onChange={handleOtherFishingActivityChange}
                          name="TrammelNet"
                          value="TrammelNet"
                        />
                      }
                      label="Trammel Net"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={EncirclingGillNet}
                          onChange={handleOtherFishingActivityChange}
                          name="EncirclingGillNet"
                          value="EncirclingGillNet"
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
                          size="small"
                          checked={CrabLiftNetsOrBintol}
                          onChange={handleOtherFishingActivityChange}
                          name="CrabLiftNetsOrBintol"
                          value="CrabLiftNetsOrBintol"
                        />
                      }
                      label="Crab Lift Nets (Bintol)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={FishLiftNetsOrBagnet}
                          onChange={handleOtherFishingActivityChange}
                          name="FishLiftNetsOrBagnet"
                          value="FishLiftNetsOrBagnet"
                        />
                      }
                      label="Fish Lift Nets (Basnig) / Bagnet"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={NewLookOrZapara}
                          onChange={handleOtherFishingActivityChange}
                          name="NewLookOrZapara"
                          value="NewLookOrZapara"
                        />
                      }
                      label="“New Look” or “Zapra”"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={ShrimpLiftNets}
                          onChange={handleOtherFishingActivityChange}
                          name="ShrimpLiftNets"
                          value="ShrimpLiftNets"
                        />
                      }
                      label="Shrimp Lift Nets"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={LeverNet}
                          onChange={handleOtherFishingActivityChange}
                          name="LeverNet"
                          value="LeverNet"
                        />
                      }
                      label="Lever Net"
                    />
                  </FormGroup>
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="GrayText" mt={-2} mb={3}>
                  Pots and Traps
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
                          size="small"
                          checked={CrabPots}
                          onChange={handleOtherFishingActivityChange}
                          name="CrabPots"
                          value="CrabPots"
                        />
                      }
                      label="Crab Pots"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={SquidPots}
                          onChange={handleOtherFishingActivityChange}
                          name="SquidPots"
                          value="SquidPots"
                        />
                      }
                      label="Squid Pots"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={FykeNetsOrFilterNets}
                          onChange={handleOtherFishingActivityChange}
                          name="FykeNetsOrFilterNets"
                          value="FykeNetsOrFilterNets"
                        />
                      }
                      label="Fyke Nets/Filter Nets"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={FishCorralsOrBaklad}
                          onChange={handleOtherFishingActivityChange}
                          name="FishCorralsOrBaklad"
                          value="FishCorralsOrBaklad"
                        />
                      }
                      label="Fish Corrals (Baklad)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={SetNetOrLambaklad}
                          onChange={handleOtherFishingActivityChange}
                          name="SetNetOrLambaklad"
                          value="SetNetOrLambaklad"
                        />
                      }
                      label="Set Net (Lambaklad)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={BarrierNetOrLikus}
                          onChange={handleOtherFishingActivityChange}
                          name="BarrierNetOrLikus"
                          value="BarrierNetOrLikus"
                        />
                      }
                      label="Barrier Net (Likus)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={FishPots}
                          onChange={handleOtherFishingActivityChange}
                          name="FishPots"
                          value="FishPots"
                        />
                      }
                      label="Fish Pots"
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
                          size="small"
                          checked={BeachSeine}
                          onChange={handleOtherFishingActivityChange}
                          name="BeachSeine"
                          value="BeachSeine"
                        />
                      }
                      label="Beach Seine"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={FryDozerOrGatherer}
                          onChange={handleOtherFishingActivityChange}
                          name="FryDozerOrGatherer"
                          value="FryDozerOrGatherer"
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
                          size="small"
                          checked={ManPushNets}
                          onChange={handleOtherFishingActivityChange}
                          name="ManPushNets"
                          value="ManPushNets"
                        />
                      }
                      label="Man Push Nets"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={ScoopNets}
                          onChange={handleOtherFishingActivityChange}
                          name="ScoopNets"
                          value="ScoopNets"
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
                          size="small"
                          checked={Spear}
                          onChange={handleOtherFishingActivityChange}
                          name="Spear"
                          value="Spear"
                        />
                      }
                      label="Spear"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={OctopusOrSquidLuringDevice}
                          onChange={handleOtherFishingActivityChange}
                          name="OctopusOrSquidLuringDevice"
                          value="OctopusOrSquidLuringDevice"
                        />
                      }
                      label="Octopus/Squid Luring Device"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={GaffHook}
                          onChange={handleOtherFishingActivityChange}
                          name="GaffHook"
                          value="GaffHook"
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
                          size="small"
                          checked={CastNet}
                          onChange={handleOtherFishingActivityChange}
                          name="CastNet"
                          value="CastNet"
                        />
                      }
                      label="Cast Net"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={-2} sx={{ ml: 1, mt: 1 }}>
            <Grid item sm={6}>
              <Button variant="contained" component="label" sx={{ width: 210 }}>
                <input
                  type="file"
                  onChange={(e) => {
                    previewImage(e);
                  }}
                />
              </Button>
              <Box sx={{ width: 150, height: 150 }} mt={2}>
                <img src={image?.toString()} width={150} height={150} />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              Save
            </Button>
            {isSubmitting}
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
