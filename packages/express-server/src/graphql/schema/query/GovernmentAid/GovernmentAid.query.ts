import { list, nonNull, queryField } from 'nexus';

const GovernmentAids = queryField('govermentAids', {
  type: nonNull(list('GovernmentAid')),
  resolve: (_, __, ctx) =>
    ctx.prisma.governmentAid.findMany({
      orderBy: [
        {
          startDate: 'desc',
        },
      ],
    }),
});

export default [GovernmentAids];
