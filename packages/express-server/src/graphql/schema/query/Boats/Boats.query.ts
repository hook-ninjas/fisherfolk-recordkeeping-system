import { arg, intArg, list, nonNull, queryField } from 'nexus';

const Vessels = queryField('vessels', {
  type: nonNull(list(nonNull('Vessel'))),
  resolve: (_parent, _args, ctx) => ctx.prisma.vessel.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
});

const QueryFisherfolkVessels = queryField('fisherfolkVessels', {
  type: nonNull(list(nonNull('Vessel'))),
  args: {
    fisherfolkId: nonNull(arg({
      type: 'BigInt',
    })),
    start: nonNull(intArg()),
    count: nonNull(intArg())
  },
  resolve: (_parent, args, ctx) => ctx.prisma.vessel.findMany({
    skip: args.start,
    take: args.count,
    where: {
      fisherfolkId: args.fisherfolkId
    }
  }) 
});

const QueryAllFisherfolkVessels = queryField('totalFisherfolkVessels', {
  type: 'Int',
  args: {
    fisherfolkId: nonNull(arg({
      type: 'BigInt',
    })),
  },
  resolve: (_, args, ctx) => ctx.prisma.vessel.count({
    where: {
      fisherfolkId: args.fisherfolkId
    }
  })
});

const QueryAllVessels = queryField('totalVessels', {
  type: 'Int',
  resolve: (_, _args, ctx) => ctx.prisma.vessel.count()
});

export default [
  Vessels,
  QueryFisherfolkVessels,
  QueryAllFisherfolkVessels,
  QueryAllVessels
];