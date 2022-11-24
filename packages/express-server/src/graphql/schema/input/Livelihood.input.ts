import { inputObjectType } from 'nexus';
import { SourceOfIncome } from '../enums';

const LivelihoodInput = inputObjectType({
  name: 'livelihoodInput',
  definition(t) {
    t.field('type', { type: SourceOfIncome });
    t.string('description');
    t.boolean('isMain');
    t.boolean('isArchive');
  },
});

export default LivelihoodInput;
