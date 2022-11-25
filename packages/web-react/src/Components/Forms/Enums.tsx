import {
  CivilStatus,
  Gender,
  SourceOfIncome,
  Salutation,
  EducationalBackground,
} from '../../graphql/generated';
import data from './iloilo-city-brgys.json';

export const createOption = (label: string) => ({
  label,
  value: label,
});

export const nationalityOptions = [createOption('Filipino')];
export const vesselTypeOptions = ['Non-Motorized', 'Motorize'].map((a) =>
  createOption(a)
);
export const materialUsedOptions = ['Wood', 'Fiber', 'Glass'].map((a) =>
  createOption(a));

export const educationalBackgroundOptions = Object.values(
  EducationalBackground
).map((a) => createOption(a));

export const civilStatus = Object.values(CivilStatus);

export const sourcesOfIncome = Object.values(SourceOfIncome).slice(0, -1);

export const barangays = data.barangays.sort();

export const genders = Object.values(Gender).map((a) => createOption(a));

export const registrationTypes = ['NewRegistration', 'Renewal'].map((a) =>
  createOption(a)
);

export const registrationTypesGears = ['Initial Registration', 'Issuance of New Certificate of Number(CN)', 'Re-Issuance of Certificate of Number'].map((a) =>
  createOption(a)
);

export const salutations = Object.values(Salutation).map((a) =>
  createOption(a)
);
