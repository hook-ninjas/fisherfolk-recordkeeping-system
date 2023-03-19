import { SourceOfIncome } from './../enums/index';
import { nullable, list, inputObjectType } from 'nexus';
import {
  CivilStatus,
  EducationalBackground,
  Gender,
  Salutation,
} from '../enums/';
import OrganizationInput from './Organization.input';
import { UploadImageInput } from './Image.input';
import { CreateFfolkVesselInput } from './Vessel.input';

const CreateFisherfolkInput = inputObjectType({
  name: 'CreateFisherfolkInput',
  definition(t) {
    t.string('lastName');
    t.string('firstName');
    t.string('middleName');
    t.string('appellation');
    t.int('age');
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
    t.int('numOfChildren');
    t.string('nationality');
    t.field('educationalBackground', { type: EducationalBackground });
    t.string('personToNotify');
    t.string('ptnRelationship');
    t.string('ptnAddress');
    t.string('ptnContactNum');
    t.field('mainFishingActivity', { type: SourceOfIncome });
    t.field('otherFishingActivity', { type: list(SourceOfIncome) });
    t.string('otherSourceOfIncome');
    t.nullable.field('organization', { type: nullable(OrganizationInput) });
    t.field('profilePhoto', { type: UploadImageInput });
    t.field('files', { type: list(UploadImageInput) });
    t.nullable.field('gears', { type: list('String') });
    t.nullable.field('vessel', { type: CreateFfolkVesselInput });
  },
});

export default CreateFisherfolkInput;
