import { list, nonNull, queryField } from 'nexus';


const Fisherfolks = queryField('fisherfolks', {
  type: nonNull(list(nonNull('Fisherfolk'))),
  resolve: (_parent, _args, ctx) => ctx.prisma.fisherfolk.findMany({
    orderBy: [
      {
        registrationDate: 'desc'
      }
    ]
  })
});

export default [
  Fisherfolks
];