import { enumType } from 'nexus';

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

export const FisherfolkStatus = enumType({
  name: 'FisherfolkStatus',
  members: ['ACTIVE', 'INACTIVE', 'DECEASED'],
});

export default [
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Gender,
  Salutation,
];
