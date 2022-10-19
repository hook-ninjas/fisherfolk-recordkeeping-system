import { objectType } from 'nexus'
import * as gqlTypes from 'nexus-prisma'

const User = objectType({
  name: 'User',
  definition(t) {
    t.field(gqlTypes.User.id)
    t.field(gqlTypes.User.username)
    t.field(gqlTypes.User.password)
  },
})

export default User