import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  FormHelperText,
} from '@mui/material';
import {
  FormInputRadio,
  FormInputSelect,
  FormInputText,
  FormInputAutoText,
  FormInputDate,
} from './FormInputFields';
import {
  UseFormResetField,
  UseFormWatch,
  UseFormRegister,
  Control,
  FieldValues,
} from 'react-hook-form';
import { sub } from 'date-fns/fp';
import {
  salutationOptions,
  genderOptions,
  civilStatusOptions,
  sourceOfIncomeOptions,
  cityMunicipalityOptions,
  provinceOptions,
} from './Enums';
import PhotoUpload from '../Input/PhotoUpload';
import MultiFileUpload from '../Input/MultiFileUpload';

interface FfolkInfoFormProps {
  control: Control<FieldValues, unknown>;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  watch: UseFormWatch<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
}

const barangayOptions = [
  'Brgy. Bonifacio',
  'Brgy. Calaparan',
  'Brgy. Dulonan',
  'Brgy. Mohon',
  'Brgy. Quezon',
  'Brgy. San José - City Proper',
  'Brgy. Santa Cruz',
  'Brgy. Santa Filomina',
  'Brgy. Santo Domingo',
  'Brgy. Santo Niño Norte',
  'Brgy. Santo Niño Sur',
  'Brgy. Sooc',
  'Brgy. Yulo Drive',
  'Brgy. Ungka',
  'Brgy. Buhang',
  'Brgy. Balabago',
  'Brgy. Democracia',
  'Brgy. San Vicente',
  'Brgy. Ma. Cristina',
  'Brgy. Balantang',
  'Brgy. Dungon',
  'Brgy. Dungon B',
  'Brgy. San Isidro - Jaro',
  'Brgy. Desamparados',
  'Brgy. Our Lady of Lourdes',
  'Brgy. San Roque',
  'Brgy. Fajardo',
  'Brgy. Claudio Castilla El-98',
  'Brgy. Sambag',
  'Brgy. Cubay',
  'Brgy. Dungon A',
  'Brgy. M.H. del Pilar',
  'Brgy. Quintin Salas',
  'Brgy. Lopez Jaena',
  'Brgy. Tacas',
  'Brgy. Taytay',
  'Brgy. Montinola',
  'Brgy. Bito-on',
  'Brgy. Lanit',
  'Brgy. Javellana',
  'Brgy. Cuartero',
  'Brgy. Buntatala',
  'Brgy. Tabuc Suba - Jaro',
  'Brgy. Camalig',
  'Brgy. Simon Ledesma',
  'Brgy. Benedicto',
  'Brgy. Arsenal Aduana',
  'Brgy. Baybay Tanza',
  'Brgy. Bonifacio Tanza',
  'Brgy. Concepcion-Montes',
  'Brgy. Danao',
  'Brgy. Delgado-Jalandoni-Bagumbayan',
  'Brgy. Edganzon',
  'Brgy. Flores',
  'Brgy. General Hughes-Montes',
  'Brgy. Gloria',
  'Brgy. Hipodromo',
  'Brgy. Inday',
  'Brgy. Jalandoni-Wilson',
  'Brgy. Kahirupan',
  'Brgy. Kauswagan',
  'Brgy. Legaspi dela Rama',
  'Brgy. Liberation',
  'Brgy. Mabolo-Delgado',
  'Brgy. Magsaysay',
  'Brgy. Malipayon-Delgado',
  'Brgy. Maria Clara',
  'Brgy. Monica Blumentritt',
  'Brgy. Muelle Loney-Montes',
  'Brgy. Nonoy',
  'Brgy. Ortiz',
  'Brgy. Osmeña',
  'Brgy. President Roxas',
  'Brgy. Rima-Rizal',
  'Brgy. Rizal Estanzuela',
  'Brgy. Rizal Ibarra',
  'Brgy. Rizal Palapala I',
  'Brgy. Rizal Palapala II',
  'Brgy. Roxas Village',
  'Brgy. Sampaguita',
  'Brgy. San Agustin',
  'Brgy. San Felix',
  'Brgy. San Jose - Arevalo',
  'Brgy. Santo Rosario-Duran',
  'Brgy. Tanza-Esperanza',
  'Brgy. Timawa Tanza I',
  'Brgy. Timawa Tanza II',
  'Brgy. Veterans Village',
  'Brgy. Villa Anita',
  'Brgy. Yulo-Arroyo',
  'Brgy. Zamora-Melliza',
  'Brgy. Calumpang',
  'Brgy. Cochero',
  'Brgy. Compania',
  'Brgy. East Baluarte',
  'Brgy. East Timawa',
  'Brgy. Habog-Habog Salvacion',
  'Brgy. Infante',
  'Brgy. Kasingkasing',
  'Brgy. Katilingban',
  'Brgy. Molo Boulevard',
  'Brgy. North Avanceña',
  'Brgy. North Baluarte',
  'Brgy. North Fundidor',
  'Brgy. North San Jose',
  'Brgy. Poblacion',
  'Brgy. San Antonio',
  'Brgy. San Juan',
  'Brgy. San Pedro',
  'Brgy. South Baluarte',
  'Brgy. South Fundidor',
  'Brgy. South San Jose',
  'Brgy. Taal',
  'Brgy. Tap-oc',
  'Brgy. West Habog-Habog',
  'Brgy. West Timawa',
  'Brgy. Abeto Mirasol Taft South (Quirino Abeto)',
  'Brgy. Airport (Tabucan Airport)',
  'Brgy. Bakhaw',
  'Brgy. Bolilao',
  'Brgy. Buhang Taft North',
  'Brgy. Calahunan',
  'Brgy. Dungon C',
  'Brgy. Guzman-Jesena',
  'Brgy. Hibao-an Norte',
  'Brgy. Hibao-an Sur',
  'Brgy. Navais',
  'Brgy. Oñate de Leon',
  'Brgy. Pale Benedicto Rizal',
  'Brgy. PHHC Block 17',
  'Brgy. PHHC Block 22 NHA',
  'Brgy. San Rafael',
  'Brgy. Santa Rosa',
  'Brgy. Tabucan',
  'Brgy. Aguinaldo',
  'Brgy. Baldoza',
  'Brgy. Bantud',
  'Brgy. Banuyao',
  'Brgy. Burgos-Mabini-Plaza',
  'Brgy. Caingin',
  'Brgy. Divinagracia',
  'Brgy. Gustilo',
  'Brgy. Hinactacan',
  'Brgy. Ingore',
  'Brgy. Jereos',
  'Brgy. Laguda',
  'Brgy. Lopez Jaena Norte',
  'Brgy. Luna',
  'Brgy. MacArthur',
  'Brgy. Magdalo',
  'Brgy. Magsaysay Village',
  'Brgy. Nabitasan',
  'Brgy. Railway',
  'Brgy. Rizal',
  'Brgy. San Isidro - La Paz',
  'Brgy. San Nicolas',
  'Brgy. Tabuc Suba - La Paz',
  'Brgy. Ticud',
  'Brgy. Alalasan',
  'Brgy. Don Esteban',
  'Brgy. Jalandoni Estate',
  'Brgy. Lapuz Norte',
  'Brgy. Lapuz Sur',
  'Brgy. Libertad',
  'Brgy. Loboc',
  'Brgy. Mansaya',
  'Brgy. Bo. Obrero',
  'Brgy. Progreso',
  'Brgy. Punong',
];

const educationalBackgroundOptions = [
  { label: 'Elementary', value: 'Elementary' },
  { label: 'High School', value: 'HighSchool' },
  { label: 'College', value: 'College' },
  { label: 'Vocational', value: 'Vocational' },
  { label: 'Post-Graduate', value: 'PostGraduate' },
];

const maxDate = sub({ years: 19 })(new Date());

function FfolkInfoForm({
  control,
  register,
  errors,
  watch,
  resetField,
}: FfolkInfoFormProps) {
  const watchMainFishAct = watch('mainFishingActivity');

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

  const handleMainFishingAct = (value: string) => {
    resetField('otherFishingActivities', { defaultValue: [] });
  };

  return (
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
        <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
          <FormInputAutoText
            sx={{ marginTop: -0.3, width: 230 }}
            freeSolo
            name="barangay"
            control={control}
            defaultValue=""
            label="Barangay"
            placeholder="e.g Barangay Sto.nino"
            options={barangayOptions}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item sm={6} sx={{ mt: 1 }}>
          <FormInputAutoText
            sx={{ marginTop: -0.3, width: 230 }}
            freeSolo
            name="cityMunicipality"
            control={control}
            defaultValue=""
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
            freeSolo
            sx={{ marginTop: -0.3, width: 230 }}
            name="province"
            control={control}
            label="Province"
            defaultValue=""
            placeholder=""
            options={provinceOptions}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            inputMode="numeric"
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
            inputMode="numeric"
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item sm={6}>
          <FormInputText
            inputMode="numeric"
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
          <FormInputDate
            sx={{ pl: 1, width: 240, height: 52 }}
            name="dateOfBirth"
            control={control}
            openTo="year"
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
          <Typography variant="body2" color="GrayText" mt={0.5} mb={-1} ml={1}>
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
        <Grid item sm={6} sx={{ mt: 1, ml: -1 }}>
          <FormInputAutoText
            sx={{ marginTop: -0.3, width: 230 }}
            freeSolo
            name="nationality"
            control={control}
            defaultValue=""
            label="Nationality"
            placeholder="e.g Filipino"
            options={['Filipino']}
            register={register}
            errors={errors}
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
          <FormInputSelect
            name="educationalBackground"
            label="Select Educational Background"
            data={educationalBackgroundOptions}
            onSavedValue=""
            control={control}
            register={register}
            errors={errors}
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
            inputMode="numeric"
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
            defaultValue=""
            handleChange={handleMainFishingAct}
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
            disabled={mainFishAct['captureFishing']}
            control={
              <Checkbox
                {...register('otherFishingActivities')}
                checked={otherFishAct['captureFishing']}
                value="CaptureFishing"
              />
            }
          />
          <FormControlLabel
            label="Fish Vending"
            disabled={mainFishAct['fishVending']}
            control={
              <Checkbox
                {...register('otherFishingActivities')}
                checked={otherFishAct['fishVending']}
                value="FishVending"
              />
            }
          />
          <FormControlLabel
            label="Aquaculture"
            disabled={mainFishAct['aquaculture']}
            control={
              <Checkbox
                {...register('otherFishingActivities')}
                checked={otherFishAct['aquaculture']}
                value="Aquaculture"
              />
            }
          />
          <FormControlLabel
            label="Fish Processing"
            disabled={mainFishAct['fishProcessing']}
            control={
              <Checkbox
                {...register('otherFishingActivities')}
                checked={otherFishAct['fishProcessing']}
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
            inputMode="numeric"
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
        <FormHelperText required>Upload required images here:</FormHelperText>
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
    </Box>
  );
}

export default FfolkInfoForm;
