import React, { MouseEvent,  useState } from 'react';
import { Box, Button, DialogContent, Grid, Backdrop, Typography } from '@mui/material';
import { FormContainer, FormContainerTitle } from '../Containers/FormContainers';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArchiveFisherfolkDocument, FisherfolkGearsDocument, GearClassification, GearsQueryDocument, MutationUpdateFisherfolkGearArgs, UpdateFisherfolkGearDocument } from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { showSuccessAlert, showFailAlert } from '../ConfirmationDialog/Alerts';
import { UpdateFfolkGearSchema } from './validation/schema';
import { FormInputSelect, FormInputText } from './FormInputFields';

interface UpdateFfolkGearFormProps {
  gearId: number;
  fisherfolkId: number;
  open: boolean;
  handleClose: () => void;
}

const GearClassificationOptions = [
  { label: 'Hook and Line', value: GearClassification['HookAndLine'] },
  { label: 'Gill Nets', value: GearClassification['GillNets'] },
  { label: 'Lift Nets', value: GearClassification['LiftNets'] },
  { label: 'Pots And Traps', value: GearClassification['PotsAndTraps'] },
  { label: 'Seine Nets', value: GearClassification['SeineNets'] },
  { label: 'Scoop Nets', value: GearClassification['ScoopNets'] },
  { label: 'Falling Gear', value: GearClassification['FallingGear'] },
  { label: 'Miscellaneous', value: GearClassification['Miscellaneous'] },
  { label: 'Others', value: GearClassification['Others'] },
];

export default function UpdateFfolkGearForm({ open, handleClose, fisherfolkId, gearId }: UpdateFfolkGearFormProps) {
  const [complete, setComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockGearType, setLockGearType] = useState(true);
  const [isOthers, setIsOthers] = useState(false);
  const [typeSelection, setTypeSelection] = useState<string[]>([]);

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
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(UpdateFfolkGearSchema) });

  const handleSubmitting = () => setIsSubmitting(true);

  const handleComplete = () => setComplete(true);

  const [updateGear, { loading }] = useMutation(UpdateFisherfolkGearDocument, {
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
    refetchQueries: [
      {
        query: ArchiveFisherfolkDocument,
      },
      {
        query: GearsQueryDocument,
      },
      {
        query: FisherfolkGearsDocument,
        variables: { fisherfolkId: fisherfolkId },
      },
    ],
  });

  const onSubmit = handleSubmit(async (input) => {
    handleSubmitting();
    const updateFfolkGearInput: MutationUpdateFisherfolkGearArgs = {
      data: {
        id: gearId,
        classification: input.classification,
        type: input.type,
      },
    };
    await updateGear({
      variables: {
        data: updateFfolkGearInput.data,
      },
    });
  });

  const handleSubmitForm = (e: MouseEvent) => {
    e.preventDefault();
    trigger(undefined, { shouldFocus: true });
    onSubmit();
    console.log(getValues());
  };

  const bottomRowButtons = () => {
    return (
      <Button type="submit" variant="contained" fullWidth onClick={handleSubmitForm} disabled={isSubmitting} sx={buttonSx}>
        Save
      </Button>
    );
  };

  return (
    <>
      <FormContainer onClose={close} aria-labelledby="form-container" open={open}>
        <FormContainerTitle aria-labelledby="form-container-title" onClose={handleClose}>
          Update Gear
        </FormContainerTitle>
        <DialogContent dividers>
          {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}></Backdrop>}
          <Box id="ffolk-form-info">
            <Typography variant="subtitle1" color="GrayText">
              Gear Classification
            </Typography>
            <Grid container spacing={-2} sx={{ ml: 2 }}>
              <Grid item sm={6} sx={{ mt: 1 }}>
                <FormInputSelect
                  name="classification"
                  label="Select Classification"
                  defaultValue=""
                  data={GearClassificationOptions}
                  control={control}
                  register={register}
                  errors={errors}
                  handleChange={(value: string) => {
                    setLockGearType(false);
                    if (value == GearClassification['Others']) {
                      setIsOthers(true);
                    }
                    switch (value) {
                      case GearClassification['HookAndLine']:
                        setTypeSelection(['Simple Hand Line', 'Multiple Hand Line', 'Bottom Set Long Line', 'Drift Long Line', 'Troll Line', 'Jig']);
                        break;

                      case GearClassification['GillNets']:
                        setTypeSelection(['Surface Set Gill Net', 'Drift Gill Net', 'Bottom Set Gill Net', 'Trammel Net', 'Encircling Gill Net']);
                        break;

                      case GearClassification['LiftNets']:
                        setTypeSelection(['Crab Lift Nets/Bintol', 'Fish Lift Nets/Bagnet', 'New Look/Zapara', 'Shrimp Lift Nets', 'Lever Net']);
                        break;

                      case GearClassification['PotsAndTraps']:
                        setTypeSelection(['CrabPots', 'SquidPots', 'FykeNetsOrFilterNets', 'FishCorralsOrBaklad', 'SetNetOrLambaklad', 'BarrierNetOrLikus', 'FishPots']);
                        break;

                      case GearClassification['SeineNets']:
                        setTypeSelection(['BeachSeine', 'FryDozerOrGatherer']);
                        break;

                      case GearClassification['ScoopNets']:
                        setTypeSelection(['ManPushNets', 'ScoopNets']);
                        break;
                      case GearClassification['FallingGear']:
                        setTypeSelection(['CastNet']);
                        break;

                      case GearClassification['Miscellaneous']:
                        setTypeSelection(['Spear', 'OctopusOrSquidLuringDevice', 'GaffHook']);
                        break;
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" color="GrayText">
              Gear type
            </Typography>
            <Grid container spacing={-2} sx={{ ml: 2 }}>
              <Grid item sm={6} sx={{ mt: 1 }}>
                {isOthers ? <FormInputText name="type" control={control} label="Description" placeholder="If not in the ff: please Specify:" register={register} errors={errors} /> : <FormInputSelect name="type" label="Select type" defaultValue="" data={typeSelection} disabled={lockGearType} control={control} register={register} errors={errors} />}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>{bottomRowButtons()}</Box>
        </DialogContent>
      </FormContainer>
    </>
  );
}
