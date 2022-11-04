import { enumType } from 'nexus';

export const RegistrationType = enumType({
  name: 'RegistrationType',
  members: ['RENEWAL', 'NEW_REGISTRATION'],
});

export const Salutation = enumType({
  name: 'Salutation',
  members: ['MR', 'MRS', 'MS'],
});

export const Gender = enumType({
  name: 'Gender',
  members: ['MALE', 'FEMALE'],
});

export const CivilStatus = enumType({
  name: 'CivilStatus',
  members: ['SINGLE', 'MARRIED', 'LEGALLY_SEPARATED', 'WIDOWED'],
});

export const Nationality = enumType({
  name: 'Nationality',
  members: ['FILIPINO']
});

export const EducationalBackground = enumType({
  name: 'EducationalBackground',
  members: [
    'ELEMENTARY',
    'HIGH_SCHOOL',
    'VOCATIONAL',
    'COLLEGE',
    'POST_GRADUATE',
  ],
});

export const SourceOfIncome = enumType({
  name: 'SourceOfIncome',
  members: [
    'CAPTURE_FISHING',
    'AQUACULTURE',
    'FISH_VENDING',
    'FISH_PROCESSING',
  ],
});

export const FisherfolkStatus = enumType({
  name: 'FisherfolkStatus',
  members: ['ACTIVE', 'INACTIVE', 'DECEASED'],
});

export const PermitStatus = enumType({
  name: 'PermitStatus',
  members: ['PENDING', 'ON_RELEASE'],
});

export default [
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Nationality,
  Gender,
  PermitStatus,
  RegistrationType,
  Salutation,
  SourceOfIncome,
];
