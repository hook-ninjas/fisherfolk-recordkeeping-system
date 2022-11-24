import { list, objectType } from 'nexus';
import { Context } from '../../../../types/types';
import { nullableList } from '../../../../utils/utils';
import Member from './Member';

const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.bigInt('id');
    t.string('name');
    t.field('members', {
      type: nullableList(Member),
      resolve: ({ id }, _, context: Context) => {
        return context.prisma.organization
          .findUnique({
            where: id,
          })
          .members();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Organization;
