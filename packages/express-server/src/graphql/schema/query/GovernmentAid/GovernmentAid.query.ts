import { intArg, list, nonNull, queryField } from 'nexus';
import { queryGovernmentAid, queryGovernmentAids } from './GovernmentAid.resolver';

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

export default [GovernmentAids, GovernmentAid];
