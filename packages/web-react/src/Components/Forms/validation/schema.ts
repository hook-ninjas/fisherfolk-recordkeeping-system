import { object, string, mixed, array, date } from 'yup';
import { getValues } from '../../../utils/utils';
import { salutationOptions, genderOptions } from '../Enums';
import { sub } from 'date-fns/fp';

const maxBirthDate = sub({ years: 19 })(new Date());
const uploadLimit = 10000000;

const FfolkValidation = object().shape({
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
    .matches(/^$|^(1[89]|[2-9]\d)$/gm, 'Must be 18 or Above')
    .required('Enter age.'),
  dateOfBirth: date()
    .max(maxBirthDate, 'Enter Valid Date')
    .typeError('Enter Valid Date')
    .required('Enter date of birth.'),
  placeOfBirth: string().required('Enter place of birth.'),
  civilStatus: string().required('Select civil status.'),
  educationalBackground: string().required('Select educational background.'),
  nationality: string().required('Enter nationality.'),
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
  profilePhoto: mixed()
    .test(
      'uploadedPhoto',
      'Must upload photo',
      (value) => value && value instanceof FileList
    )
    .test(
      'fileSize',
      'File too large',
      (value) => value instanceof FileList && value[0].size <= uploadLimit
    )
    .test(
      'fileFormat',
      'Unsupported Format, Format must be in .jpeg, .jpg, .png',
      (value) => value && value[0].type.match(/^.*(image\/jpeg|jpg|png)$/gm)
    ),
  files: mixed()
    .test(
      'uploadedFiles',
      'Must upload photo',
      (value) => value && value instanceof FileList
    )
    .test('fileSize', 'File too large', (value) => {
      const truthArray = [];
      if (value) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size <= uploadLimit) {
            truthArray.push(value[i]);
          }
        }
      }
      return truthArray.length > 0;
    })
    .test(
      'fileFormat',
      'Unsupported Format, Format must be in .jpeg, .jpg, .png',
      (value) => {
        const truthArray = [];
        if (value) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].type.match(/^.*(image\/jpeg|jpg|png)$/gm)) {
              truthArray.push(value[i]);
            }
          }
        }
        return truthArray.length > 0;
      }
    ),
  gears: object()
    .shape({
      hookAndLine: array().of(string()).ensure(),
      gillNets: array().of(string()).ensure(),
      liftNets: array().of(string()).ensure(),
      potsAndTraps: array().of(string()).ensure(),
      seineNets: array().of(string()).ensure(),
      scoopNets: array().of(string()).ensure(),
      fallingGear: array().of(string()).ensure(),
      miscellaneous: array().of(string()).ensure(),
    })
    .test('requiredGear', 'Must have at least 1 gear', (value) => {
      const truthArray = Object.keys(value).map((key) => {
        if (key != 'others') {
          const array = value[key] as Array<string>;
          if (array instanceof Array) {
            return !array.includes('false') && array.length >= 1;
          }
        }
        return typeof value[key] === 'string' && value[key] != '';
      });

      return truthArray.includes(true);
    }),
  mfvrNumber: string().required('Please fill up mfvr no.'),
  homeport: string().required('Please indicate home port'),
  name: string().required('Vessel must have name'),
  material: string().required('Select material.'),
  type: string().required('Please indicate type'),
  placeBuilt: string().required('Please indicate place built'),
  yearBuilt: string().matches(/^$|\d{4}$/, 'Enter year.'),
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

const UpdateFisherfolkSchema = object().shape({
  profilePhoto: mixed()
    .test(
      'fileSize',
      'File too large',
      (value) => !value || (value instanceof FileList && value[0].size <= uploadLimit)
    )
    .test(
      'fileFormat',
      'Unsupported Format, Format must be in .jpeg, .jpg, .png',
      (value) => !value || (value && value[0].type.match(/^.*(image\/jpeg|jpg|png)$/gm))
    ),
  contactNumber: string()
    .matches(/^$|^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  age: string().matches(/^$|^(1[89]|[2-9]\d)$/gm, 'Must be 18 or Above'),
  ptnContactNum: string().matches(
    /^$|^(09|\+639)\d{9}$/,
    'Please enter a valid contact number.'
  ),
});

export {
  FfolkValidation,
  CreateAccountSchema,
  LoginSchema,
  UpdateFisherfolkSchema,
};
