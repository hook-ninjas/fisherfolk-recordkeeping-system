import { intArg, list, nonNull, queryField } from 'nexus';
import {
  queryGovernmentAid,
  queryGovernmentAids,
  queryTotalProgram,
} from './GovernmentAid.resolver';

const GovernmentAids = queryField('governmentAids', {
  type: nonNull(list('GovernmentAid')),
  resolve: (_, __, ctx) => queryGovernmentAids(ctx),
});

const GovernmentAid = queryField('governmentAid', {
  type: nonNull('GovernmentAid'),
  args: {
    govtAidId: intArg(),
  },
  resolve: (_, args, ctx) => queryGovernmentAid(args.govtAidId, ctx),
});

const TotalPrograms = queryField('totalPrograms', {
  type: 'Int',
  resolve: (_, args, ctx) => queryTotalProgram(ctx),
});

export default [GovernmentAids, GovernmentAid, TotalPrograms];
