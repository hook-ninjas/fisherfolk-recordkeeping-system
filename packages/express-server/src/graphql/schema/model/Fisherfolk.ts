import { objectType } from 'nexus';
import {
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Gender,
  Nationality,
  RegistrationType,
  Salutation,
  SourceOfIncome,
} from '../enums/';

const Fisherfolk = objectType({
  name: 'Fisherfolk',
  definition(t) {
    t.nonNull.int('id');
    t.int('registrationNum');
    t.field('registrationDate', { type: 'DateTime' });
    t.field('registrationType', { type: RegistrationType });
    t.string('lastName');
    t.string('firstName');
    t.string('middleName');
    t.field('salutation', { type: Salutation });
    t.string('barangay');
    t.string('cityMunicipality');
    t.string('province');
    t.string('contactNum');
    t.int('residentYear');
    t.field('dateOfBirth', { type: 'DateTime' });
    t.string('placeOfBirth');
    t.string('religion');
    t.field('gender', { type: Gender });
    t.field('civilStatus', { type: CivilStatus });
    t.nullable.int('numOfChildren');
    t.field('nationality', { type: Nationality });
    t.field('educationalBackground', { type: EducationalBackground });
    t.string('personToNotify');
    t.string('ptnRelationship');
    t.string('ptnAddress');
    t.string('ptnContactNum');
    t.field('mainSrcOfIncome', { type: SourceOfIncome });
    t.nullable.field('otherSrcOfIncome', { type: SourceOfIncome });
    t.string('mainSrcGear');
    t.nullable.string('otherSrcGear');
    t.string('mainSrcMethod');
    t.nullable.string('otherSrcMethod');
    t.nullable.string('orgName');
    t.nullable.int('orgYearMember');
    t.nullable.string('orgPosition');
    t.string('image');
    t.string('signature');
    t.field('registrationType', { type: RegistrationType });
    t.field('fisherfolkStatus', { type: FisherfolkStatus });
    t.field('fullName', {
      type: 'String',
      resolve: (parent) => `${parent.firstName} ${parent.lastName}`,
    });
  },
});

export default Fisherfolk;
