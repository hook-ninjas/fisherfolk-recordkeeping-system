import { nonNull, queryField, list } from 'nexus';

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

export default [
  Gears
];