import { inputObjectType } from 'nexus';
import {
  CivilStatus,
  EducationalBackground,
  FisherfolkStatus,
  Gender,
  Salutation,
} from '../enums/';

const CreateFisherfolkInput = inputObjectType({
  name: 'CreateFisherfolkInput',
  definition(t) {
    t.nonNull.string('lastName');
    t.nonNull.string('firstName');
    t.nonNull.string('middleName');
    t.nonNull.field('registrationDate', { type: 'DateTime' });
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
    t.nonNull.int('numOfChildren');
    t.nonNull.string('nationality');
    t.nonNull.field('educationalBackground', { type: EducationalBackground });
    t.nonNull.string('personToNotify');
    t.nonNull.string('ptnRelationship');
    t.nonNull.string('ptnAddress');
    t.nonNull.string('ptnContactNum');
    t.nonNull.field('status', { type: FisherfolkStatus });
  },
});

export default CreateFisherfolkInput;
