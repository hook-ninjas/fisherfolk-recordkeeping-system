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
  members: ['SINGLE', 'MARRIED', 'LEGALLYSEPARATED', 'WIDOWED'],
});

export const EducationalBackground = enumType({
  name: 'EducationalBackground',
  members: [
    'ELEMENTARY',
    'HIGHSCHOOL',
    'VOCATIONAL',
    'COLLEGE',
    'POSTGRADUATE',
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
