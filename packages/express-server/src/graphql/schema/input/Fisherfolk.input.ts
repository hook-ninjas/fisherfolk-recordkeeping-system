import { inputObjectType } from 'nexus';
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

const CreateFisherfolkInput = inputObjectType({
  name: 'CreateFisherfolkInput',
  definition(t) {
    t.nonNull.field('registrationType', { type: RegistrationType });
    t.nonNull.string('lastName');
    t.nonNull.string('firstName');
    t.nonNull.string('middleName');
    t.nonNull.int('age');
    t.nonNull.field('salutation', { type: Salutation });
    t.nonNull.string('barangay');
    t.nonNull.string('cityMunicipality');
    t.nonNull.string('province');
    t.nonNull.string('contactNum');
    t.nonNull.int('residentYear');
    t.nonNull.field('dateOfBirth', { type: 'DateTime' });
    t.nonNull.string('placeOfBirth');
    t.nonNull.string('religion');
    t.nonNull.field('gender', { type: Gender });
    t.nonNull.field('civilStatus', { type: CivilStatus });
    t.nullable.int('numOfChildren');
    t.nonNull.field('nationality', { type: Nationality });
    t.nonNull.field('educationalBackground', { type: EducationalBackground });
    t.nonNull.string('personToNotify');
    t.nonNull.string('ptnRelationship');
    t.nonNull.string('ptnAddress');
    t.nonNull.string('ptnContactNum');
    t.nonNull.field('mainSrcOfIncome', { type: SourceOfIncome });
    t.nullable.field('otherSrcOfIncome', { type: SourceOfIncome });
    t.nullable.string('mainSrcGear');
    t.nullable.string('otherSrcGear');
    t.nullable.string('mainSrcMethod');
    t.nullable.string('otherSrcMethod');
    t.nullable.string('orgName');
    t.nullable.int('orgYearMember');
    t.nullable.string('orgPosition');
    t.nonNull.string('image');
    t.nonNull.string('signature');
    t.nonNull.field('status', { type: FisherfolkStatus});
  },
});

export default CreateFisherfolkInput;
