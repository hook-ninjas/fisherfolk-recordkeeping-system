import { mutationField, arg, nonNull } from 'nexus'
import { createUser } from './User.resolver'

export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    data: nonNull(
      arg({
        type: 'CreateUserInput',
      }),
    ),
  },
  resolve: (_parent, args, context) => createUser(args.data, context),
})