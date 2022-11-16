import { objectType } from 'nexus';
import { SourceOfIncome } from '../enums';

const Livelihood = objectType({
  name: 'Livelihood',
  definition(t) {
    t.field('id', { type: 'BigInt' });
    t.field('fisherfolkId', { type: 'BigInt' });
    t.field('type', { type: SourceOfIncome });
    t.string('description');
    t.boolean('isMain');
    t.boolean('isArchive');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Livelihood;
