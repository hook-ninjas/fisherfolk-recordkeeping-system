import { queryField, nonNull } from 'nexus';
import { queryTotalByType } from './Livelihood.resolver';

const QueryTotalByType = queryField('livelihoodCount', {
  type: 'Int',
  args: {
    activity: nonNull('SourceOfIncome'),
  },
  resolve: (_, args, ctx) => queryTotalByType(args.activity, ctx),
});

export default [QueryTotalByType];
