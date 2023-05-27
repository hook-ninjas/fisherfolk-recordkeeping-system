import { nonNull, queryField, list, arg } from 'nexus';

const Gears = queryField('gears', {
  type: nonNull(list(nonNull('Gear'))),
  resolve: (_parent, args, ctx) =>
    ctx.prisma.gear.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
      where: {
        isArchive: false,
      },
    }),
});

const QueryFisherfolkGears = queryField('fisherfolkGears', {
  type: nonNull(list(nonNull('Gear'))),
  args: {
    fisherfolkId: nonNull(
      arg({
        type: 'BigInt',
      })
    ),
  },
  resolve: (_, args, ctx) =>
    ctx.prisma.gear.findMany({
      where: {
        fisherfolkId: args.fisherfolkId,
        isArchive: false,
      },
    }),
});

const QueryAllFisherfolkGears = queryField('totalFisherfolkGears', {
  type: 'Int',
  args: {
    fisherfolkId: nonNull(
      arg({
        type: 'BigInt',
      })
    ),
  },
  resolve: (_, args, ctx) =>
    ctx.prisma.gear.count({
      where: {
        fisherfolkId: args.fisherfolkId,
        isArchive: false,
      },
    }),
});

const QueryAllGears = queryField('totalGears', {
  type: 'Int',
  resolve: (_, _args, ctx) => ctx.prisma.gear.count(),
});

const QueryArchiveGear = queryField('ArchiveGear', {
  type: nonNull(list(nonNull('Gear'))),
  resolve: (_parent, _args, ctx) =>
    ctx.prisma.gear.findMany({
      where: {
        isArchive: true,
      },
    }),
});

export default [
  Gears,
  QueryFisherfolkGears,
  QueryAllFisherfolkGears,
  QueryAllGears,
  QueryArchiveGear,
];
