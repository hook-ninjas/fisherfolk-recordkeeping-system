import { inputObjectType } from 'nexus';
import { GearClassification } from '../enums';

const CreateGearInput = inputObjectType({
  name: 'CreateGearInput',
  definition(t) {
    t.field('fisherfolkId', {type: 'BigInt'});
    t.field('classification', {type: GearClassification});
    t.string('type');
    t.nullable.string('photo');
  },
});

export default CreateGearInput;