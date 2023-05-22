import { inputObjectType, list } from 'nexus';
import { SourceOfIncome } from '../enums';

const CreateLivelihoodInput = inputObjectType({
  name: 'CreateLivelihoodInput',
  definition(t) {
    t.nullable.field('fisherfolkId', { type: 'BigInt' });
    t.field('type', { type: SourceOfIncome });
    t.string('description');
    t.boolean('isMain');
  },
});

const CreateFfolkLivelihoodInput = inputObjectType({
  name: 'CreateFfolkLivelihoodInput',
  definition(t) {
    t.field('fisherfolkId', { type: 'BigInt' });
    t.field('mainFishingActivity', { type: SourceOfIncome });
    t.field('otherFishingActivity', { type: list(SourceOfIncome) });
    t.string('otherSourceOfIncome');
  },
});

export { CreateLivelihoodInput, CreateFfolkLivelihoodInput };
