import { objectType } from 'nexus';
import { Context } from '../../../../types/types';
import Fisherfolk from './Fisherfolk';
import Organization from './Organization';

const Member = objectType({
  name: 'Member',
  definition(t) {
    t.bigInt('fisherfolkId');
    t.int('organizationId');
    t.int('yearJoined');
    t.string('position');
    t.field('fisherfolks', {
      type: Fisherfolk,
      resolve: ({ fisherfolkId, organizationId }, _, context: Context) => {
        return context.prisma.member.findUniqueOrThrow({
          where: {
            id: { fisherfolkId, organizationId },
          },
        });
      },
    });
    t.field('organization', {
      type: Organization,
      resolve: ({ fisherfolkId, organizationId }, _, context: Context) => {
        return context.prisma.member
          .findUniqueOrThrow({
            where: {
              id: { fisherfolkId, organizationId },
            },
          })
          .organization();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Member;
