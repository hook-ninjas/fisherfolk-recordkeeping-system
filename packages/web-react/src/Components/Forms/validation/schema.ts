import { object, string, mixed, number } from 'yup';
import { getValues } from '../../../utils/utils';
import {
  salutationOptions,
  genderOptions,
  educationalBackgroundOptions,
  nationalityOptions,
  materialOptions,
} from '../Enums';

const FfolkValidation = object().shape({
  // registrationType: string()
  //   .nullable()
  //   .oneOf(getValues(registrationTypes))
    // .required('Select registration type.'),
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
    .oneOf(getValues(educationalBackgroundOptions))
    .required('Enter or select educational background.'),
  numOfChildren: string().matches(/^$|\d{1,2}$/, 'Enter a number.'),
  nationality: mixed()
    .nullable()
    .oneOf(getValues(nationalityOptions))
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
  orgName: string(),
  orgMemberSince: string().matches(/^$|\d{4}$/, 'Please enter year.'),
  orgPosition: string(),
  profilePhoto: object()
    .shape({
      name: string().required(),
      size: number().max(1000000, 'File over 1 mb'),
      type: string()
        .matches(/^.*(image\/jpeg|jpg|png)$/gm, 'File format not supported')
        .required('No File Uploaded'),
    })
    .nullable()
    // .required('Add Profile Image'),
});

const VesselWithGearSchema = object().shape({
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

const CreateAccountSchema = object().shape({
  username: string()
    .required('Enter username.')
    .min(6, 'Username must be atleast 6 characters.'),
  password: string()
    .required('Enter password.')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*[#?!@$%^&*_-]).{8,}$/,
      'Password must contain atleast 8 characters, one uppercase, one lowercase, one number and one special character.'
    ),
});

const LoginSchema = object().shape({
  username: string().required('Enter username.'),
  password: string().required('Enter password.'),
});

export { FfolkValidation, VesselWithGearSchema, CreateAccountSchema, LoginSchema };
