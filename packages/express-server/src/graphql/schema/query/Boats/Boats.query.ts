import { arg, list, nonNull, queryField } from 'nexus';

const Vessels = queryField('vessels', {
  type: nonNull(list(nonNull('Vessel'))),
  resolve: (_parent, _args, ctx) =>
    ctx.prisma.vessel.findMany({
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

const QueryFisherfolkVessels = queryField('fisherfolkVessels', {
  type: nonNull(list(nonNull('Vessel'))),
  args: {
    fisherfolkId: nonNull(
      arg({
        type: 'BigInt',
      })
    ),
  },
  resolve: (_parent, args, ctx) =>
    ctx.prisma.vessel.findMany({
      where: {
        fisherfolkId: args.fisherfolkId,
        isArchive: false,
      },
    }),
});

const QueryAllFisherfolkVessels = queryField('totalFisherfolkVessels', {
  type: 'Int',
  args: {
    fisherfolkId: nonNull(
      arg({
        type: 'BigInt',
      })
    ),
  },
  resolve: (_, args, ctx) =>
    ctx.prisma.vessel.count({
      where: {
        fisherfolkId: args.fisherfolkId,
        isArchive: false,
      },
    }),
});

const QueryAllVessels = queryField('totalVessels', {
  type: 'Int',
  resolve: (_, _args, ctx) => ctx.prisma.vessel.count(),
});

const QueryVessel = queryField('vessel', {
  type: 'Vessel',
  args: {
    id: nonNull(
      arg({
        type: 'BigInt',
      })
    ),
  },
  resolve: (_, args, ctx) =>
    ctx.prisma.vessel.findFirstOrThrow({
      where: {
        id: args.id,
      },
    }),
});

const QueryArchiveVessel = queryField('ArchiveVessel', {
  type: nonNull(list(nonNull('Vessel'))),
  resolve: (_parent, _args, ctx) =>
    ctx.prisma.vessel.findMany({
      where: {
        isArchive: true,
      },
    }),
});

export default [
  Vessels,
  QueryFisherfolkVessels,
  QueryAllFisherfolkVessels,
  QueryAllVessels,
  QueryVessel,
  QueryArchiveVessel,
];
