import { inputObjectType, list } from 'nexus';
import { GearClassification } from '../enums';

const CreateGearInput = inputObjectType({
  name: 'CreateGearInput',
  definition(t) {
    t.field('fisherfolkId', { type: 'BigInt' });
    t.field('classification', { type: GearClassification });
    t.string('type');
    t.nullable.string('photo');
  },
});

const CreateFfolkGearInput = inputObjectType({
  name: 'CreateFfolkGearInput',
  definition(t) {
    t.field('fisherfolkId', { type: 'BigInt' });
    t.field('types', { type: list('String') });
  },
});

const UpdateFfolkGearInput = inputObjectType({
  name: 'UpdateFfolkGearInput',
  definition(t) {
    t.field('id', { type: 'BigInt' });
    t.field('classification', { type: 'GearClassification' });
    t.string('type');
  },
});

export { CreateGearInput, CreateFfolkGearInput, UpdateFfolkGearInput };
