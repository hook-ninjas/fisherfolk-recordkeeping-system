import { inputObjectType } from 'nexus';

const CreateProgramInput = inputObjectType({
  name: 'CreateProgramInput',
  definition(t) {
    t.string('title'),
    t.int('slot'),
    t.field('date', {type:  'DateTime'}),
    t.string('description');
  },
});

export default CreateProgramInput;
