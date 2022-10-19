import { objectType } from 'nexus'
import UserQueries from './User/User.query'

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context) => context.prisma.user.findMany(),
    })
  },
})

export default [
  Query,
  ...UserQueries,
]