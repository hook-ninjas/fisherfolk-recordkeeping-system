import { inputObjectType } from 'nexus';
import { GearClassification } from '../enums';

const CreateGearInput = inputObjectType({
  name: 'CreateGearInput',
  definition(t) {
    t.field('classification', {type: GearClassification});
    t.string('type');
  },
});

export default CreateGearInput;