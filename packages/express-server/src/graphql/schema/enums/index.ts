import { enumType } from 'nexus';

export const Salutation = enumType({
  name: 'Salutation',
  members: ['Mr', 'Mrs', 'Ms'],
});

export const Gender = enumType({
  name: 'Gender',
  members: ['Male', 'Female'],
});

export const CivilStatus = enumType({
  name: 'CivilStatus',
  members: ['Single', 'Married', 'LegallySeparated', 'Widowed'],
});

export const EducationalBackground = enumType({
  name: 'EducationalBackground',
  members: [
    'Elementary',
    'HighSchool',
    'Vocational',
    'College',
    'PostGraduate',
  ],
});

export const FisherfolkStatus = enumType({
  name: 'FisherfolkStatus',
  members: ['Active', 'Inactive', 'Deceased'],
});

export const SourceOfIncome = enumType({
  name: 'SourceOfIncome',
  members: [
    'CaptureFishing',
    'AquaCulture',
    'FishVending',
    'FishProcessing',
    'Others',
  ],
});

export default [
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Gender,
  Salutation,
  SourceOfIncome,
];
