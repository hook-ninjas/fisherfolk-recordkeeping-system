import { list, nonNull, queryField } from 'nexus';


const Fisherfolks = queryField('fisherfolks', {
  type: nonNull(list(nonNull('Fisherfolk'))),
  resolve: (_parent, _args, ctx) => ctx.prisma.fisherfolk.findMany({
    where: {
      registrationDate: 'desc',
    }
  })
});

export default [
  Fisherfolks
];