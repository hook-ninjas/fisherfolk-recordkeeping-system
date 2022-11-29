import { nonNull, queryField, list, intArg, arg } from 'nexus';

const Gears = queryField('gears', {
  type: nonNull(list(nonNull('Gear'))),
  resolve: (_parent, _args, ctx) => ctx.prisma.gear.findMany({
    orderBy: [
      {
        id: 'desc'
      }
    ]
  })
});

const QueryFisherfolkGears = queryField('fisherfolkGears',  {
  type: nonNull(list(nonNull('Gear'))),
  args: {
    fisherfolkId: nonNull(arg({
      type: 'BigInt',
    })),
    start: nonNull(intArg()),
    count: nonNull(intArg())
  },
  resolve: (_, args, ctx) => ctx.prisma.gear.findMany({
    skip: args.start,
    take: args.count,
    where: {
      fisherfolkId: args.fisherfolkId
    }
  })
});

const QueryAllFisherfolkGears = queryField('totalGears', {
  type: 'Int',
  args: {
    fisherfolkId: nonNull(arg({
      type: 'BigInt',
    })),
  },
  resolve: (_, args, ctx) => ctx.prisma.gear.count({
    where: {
      fisherfolkId: args.fisherfolkId
    }
  })
});

export default [
  Gears,
  QueryFisherfolkGears,
  QueryAllFisherfolkGears
];
