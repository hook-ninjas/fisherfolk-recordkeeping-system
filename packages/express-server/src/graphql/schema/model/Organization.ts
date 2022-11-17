import { list, objectType } from 'nexus';
import { Context } from '../../../types/types';

const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.field('id', { type: 'BigInt' });
    t.string('name');
    t.int('yearJoined');
    t.string('position');
    t.nullable.field('fisherfolks', {
      type: list('Fisherfolk'),
      resolve: ({ id }, _, context: Context) => {
        return context.prisma.organization
          .findUnique({
            where: id,
          })
          .fisherfolks();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Organization;
