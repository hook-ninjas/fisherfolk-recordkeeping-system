import { Context } from '../../../context';

import {
  CivilStatus,
  EducationalBackground,
  Gender,
  Nationality,
  RegistrationType,
  Salutation,
  SourceOfIncome,
} from '@prisma/client';

interface CreateFisherfolkData {
  registrationType: RegistrationType;
  registrationNum: number;
  lastName: string;
  firstName: string;
  middleName: string;
  salutation: Salutation;
  barangay: string;
  cityMunicipality: string;
  province: string;
  contactNum: string;
  residentYear: number;
  dateOfBirth: Date;
  placeOfBirth: string;
  religion: string;
  gender: Gender;
  civilStatus: CivilStatus;
  numOfChildren?: number | null;
  nationality: Nationality;
  educationalBackground: EducationalBackground;
  personToNotify: string;
  ptnRelationship: string;
  ptnAddress: string;
  ptnContactNum: string;
  mainSrcOfIncome: SourceOfIncome;
  otherSrcOfIncome?: SourceOfIncome | null;
  mainSrcGear: string;
  otherSrcGear?: string | null;
  mainSrcMethod: string;
  otherSrcMethod?: string | null;
  orgName?: string | null;
  orgYearMember?: number | null;
  orgPosition?: string | null;
}

const createFisherfolk = (input: CreateFisherfolkData, ctx: Context) => {
  return ctx.prisma.fisherfolk.create({
    data: {
      ...input,
      signature: '',
      image: '',
      status: 'ACTIVE',
    },
  });
};

export { createFisherfolk };
