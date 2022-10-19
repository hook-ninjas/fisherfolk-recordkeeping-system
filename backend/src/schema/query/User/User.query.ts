import { queryField, intArg, nonNull } from 'nexus'
import { queryUser } from './User.resolver'

const QueryUser = queryField('user', {
  type: 'User',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, args, context) => queryUser(context, args.id),
})

export default [QueryUser]
