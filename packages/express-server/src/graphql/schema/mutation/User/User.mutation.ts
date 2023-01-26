import { mutationField } from 'nexus';
import { createUser } from './User.resolver';
import { ApolloError } from 'apollo-server-core';
import { nonNullArg } from '../../../../utils/utils';
import CreateUserInput from '../../input/User.input';
import User from '../../model/objecTypes/User';

export const CreateUser = mutationField('createUser', {
  type: User,
  args: {
    data: nonNullArg(CreateUserInput),
  },
  validate: async (_, args, context) => {
    const { username } = args.data;

    // check if username already exist
    const existingUser = await context.prisma.user.findFirst({
      where: {
        username: username
      }
    });

    // throw error if user exists;
    if (existingUser) {
      throw new ApolloError('Username is already taken.');
    }
  },
  resolve: (_, args, context) => createUser(args.data, context),
});