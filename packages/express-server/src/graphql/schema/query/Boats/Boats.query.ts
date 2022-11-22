import { list, nonNull, queryField } from 'nexus';


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

export default [
  Vessels
];