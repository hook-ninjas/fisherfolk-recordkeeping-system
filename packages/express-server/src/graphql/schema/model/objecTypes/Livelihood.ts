import { objectType } from 'nexus';
import { SourceOfIncome } from '../../enums';
import Fisherfolk from './Fisherfolk';
import { nullableList } from '../../../../utils/utils';

const Livelihood = objectType({
  name: 'Livelihood',
  definition(t) {
    t.field('id', { type: 'BigInt' });
    t.field('type', { type: SourceOfIncome });
    t.string('description');
    t.boolean('isMain');
    t.boolean('isArchive');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.field('fisherfolk', {
      type: nullableList(Fisherfolk),
      resolve: ({ id }, _, context) => {
        return context.prisma.livelihood
          .findUnique({ where: id })
          .fisherfolks();
      },
    });
  },
});

export default Livelihood;
