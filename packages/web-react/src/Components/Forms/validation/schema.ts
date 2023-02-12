import { object, string, mixed, number, array } from 'yup';
import { getValues } from '../../../utils/utils';
import {
  registrationTypes,
  salutationOptions,
  genderOptions,
  educationalBackgroundOptions,
  nationalityOptions,
} from '../Enums';

const FfolkValidation = object().shape({
  registrationType: string()
    .nullable()
    .oneOf(getValues(registrationTypes))
    .required('Select registration type.'),
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
  orgMemberSince: string().matches(/^$|\d{4}$/, 'Please enter year.'),
  profilePhoto: object()
    .shape({
      name: string().required(),
      size: number().max(1000000, 'File over 1 mb'),
      type: string()
        .matches(/^.*(image\/jpeg|jpg|png)$/gm, 'File format not supported')
        .required('No File Uploaded'),
    })
    .nullable()
    .required('Add Profile Image'),
  files: array()
    .of(
      object().shape({
        name: string().required(),
        size: number().max(1000000, 'File over 1 mb'),
        type: string().matches(
          /^.*(image\/jpeg|jpg|png)$/gm,
          'File format not supported'
        ),
      })
    )
    .nullable()
    .required('Upload required file/files'),
});

export { FfolkValidation };
