import { objectType } from 'nexus';
import Fisherfolk from './Fisherfolk';
import GovernmentAid from './GovernmentAid';

const Queue = objectType({
  name: 'Queue',
  definition(t) {
    t.bigInt('fisherfolkId');
    t.int('governmentAidId');
    t.int('queueNumber');
    t.date('date');
    t.date('createdAt');
    t.date('updatedAt');
    t.field('fisherfolk', {
      type: Fisherfolk,
      resolve: ({ fisherfolkId, governmentAidId }, _, context) => {
        return context.prisma.queue
          .findUniqueOrThrow({
            where: {
              fisherfolkId_governmentAidId: { fisherfolkId, governmentAidId },
            },
          })
          .fisherfolk();
      },
    });
    t.field('governmentAid', {
      type: GovernmentAid,
      resolve: ({ fisherfolkId, governmentAidId }, _, context) => {
        return context.prisma.queue
          .findUniqueOrThrow({
            where: {
              fisherfolkId_governmentAidId: { fisherfolkId, governmentAidId },
            },
          })
          .governmentAid();
      },
    });
  },
});

export default Queue;
