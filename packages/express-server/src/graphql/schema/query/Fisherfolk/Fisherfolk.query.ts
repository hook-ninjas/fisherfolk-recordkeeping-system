import { arg, intArg, list, nonNull, queryField } from 'nexus';
import { queryById, queryByRowCount } from './Fisherfolk.resolver';

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

const QueryFisherfolkByRowCount = queryField('queryFisherfolkByRowCount', {
  type: nonNull(list(nonNull('Fisherfolk'))),
  args: {
    count: nonNull(intArg())
  },
  resolve: (_, args, ctx) => queryByRowCount(args.count, ctx)
});

const QueryFisherfolkById = queryField('fisherfolk', {
  type: 'Fisherfolk',
  args: {
    id: nonNull(arg({
      type: 'BigInt'
    }))
  },
  resolve: (_, args, ctx) => queryById(args.id, ctx)
});

export default [
  Fisherfolks,
  QueryFisherfolkByRowCount,
  QueryFisherfolkById
];