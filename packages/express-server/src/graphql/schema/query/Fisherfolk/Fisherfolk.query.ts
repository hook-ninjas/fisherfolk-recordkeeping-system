import { arg, intArg, list, nonNull, queryField } from 'nexus';
import { queryById, queryByRange, queryFisherFolkByGender, querytActiveFisherFolk, queryTotalFisherfolk, queryUniqueBarangayCount } from './Fisherfolk.resolver';

const Fisherfolks = queryField('fisherfolks', {
  type: nonNull(list(nonNull('Fisherfolk'))),
  resolve: (_parent, _args, ctx) => ctx.prisma.fisherfolk.findMany({
    orderBy: [
      {
        status: 'asc'
      },
      {
        registrationDate: 'desc'
      }
    ]
  })
});

const QueryTotalFisherfolk = queryField('totalFisherfolk', {
  type: 'Int',
  resolve: (_, _args, ctx) => queryTotalFisherfolk(ctx)
});

const QueryFisherfolkByRange = queryField('fisherfolkByRange', {
  type: nonNull(list(nonNull('Fisherfolk'))),
  args: {
    start: nonNull(intArg()),
    count: nonNull(intArg())
  },
  resolve: (_, args, ctx) => queryByRange(args.start, args.count, ctx)
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

const QueryUniqeBarangays = queryField('barangayCount', {
  type: 'Int',
  resolve: (_, __, ctx) => queryUniqueBarangayCount(ctx),
});

const QueryActiveFisherFolk = queryField('activeFisherFolk', {
  type: 'Int',
  resolve: (_, __, ctx) => querytActiveFisherFolk(ctx)
})

const QueryFisherFolkByGender = queryField('fisherfolkGender', {
  type: 'Int',
  args: {
    gender: 'Gender'
  },
  resolve: (_, args, ctx) => queryFisherFolkByGender(args.gender, ctx)
})


export default [
  Fisherfolks,
  QueryActiveFisherFolk,
  QueryFisherFolkByGender,
  QueryTotalFisherfolk,
  QueryFisherfolkByRange,
  QueryFisherfolkById,
  QueryUniqeBarangays
];