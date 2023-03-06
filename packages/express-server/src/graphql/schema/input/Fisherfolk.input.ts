import { nullable, list, inputObjectType } from 'nexus';
import {
  CivilStatus,
  EducationalBackground,
  Gender,
  Salutation,
  SourceOfIncome,
  Material,
} from '../enums/';
import LivelihoodInput from './Livelihood.input';
import OrganizationInput from './Organization.input';
import ImageInput from './Image.input';

const CreateFisherfolkInput = inputObjectType({
  name: 'CreateFisherfolkInput',
  definition(t) {
    t.string('lastName');
    t.string('firstName');
    t.string('middleName');
    t.string('appellation');
    t.int('age');
    t.nullable.field('salutation', { type: Salutation });
    t.string('barangay');
    t.string('cityMunicipality');
    t.string('province');
    t.string('contactNum');
    t.nullable.int('residentYear');
    t.field('dateOfBirth', { type: 'DateTime' });
    t.string('placeOfBirth');
    t.string('religion');
    t.field('gender', { type: Gender });
    t.field('civilStatus', { type: CivilStatus });
    t.nullable.int('numOfChildren');
    t.string('nationality');
    t.field('educationalBackground', { type: EducationalBackground });
    t.string('personToNotify');
    t.string('ptnRelationship');
    t.string('ptnAddress');
    t.string('ptnContactNum');
    t.field('mainFishingActivity', { type: SourceOfIncome });
    t.nullable.field('otherFishingActivity', { type: list(SourceOfIncome) });
    t.nullable.string('otherSourceOfIncome');
    t.nullable.field('organization', { type: nullable(OrganizationInput) });
    t.field('profilePhoto', { type: ImageInput });
    t.field('files', { type: list(ImageInput) });
    t.nullable.field('gears', { type: list('String') });
    t.nullable.string('mfvrNumber');
    t.nullable.string('homeport');
    t.nullable.string('name');
    t.nullable.string('type');
    t.nullable.string('placeBuilt');
    t.nullable.int('yearBuilt');
    t.nullable.field('material', { type: Material });
    t.nullable.float('registeredLength');
    t.nullable.float('registeredBreadth');
    t.nullable.float('registeredDepth');
    t.nullable.float('tonnageLength');
    t.nullable.float('tonnageBreadth');
    t.nullable.float('tonnageDepth');
    t.nullable.float('grossTonnage');
    t.nullable.float('netTonnage');
    t.nullable.string('engineMake');
    t.nullable.string('serialNumber');
    t.nullable.float('horsepower');
    t.nullable.field('vesselFiles', { type: list(ImageInput) });
    t.boolean('hasGear');
    t.boolean('hasVessel');
  },
});

export default CreateFisherfolkInput;
