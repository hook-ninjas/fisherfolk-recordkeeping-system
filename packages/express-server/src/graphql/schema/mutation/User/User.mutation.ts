import { mutationField } from 'nexus';
import { createUser, loginUser } from './User.resolver';
import { ApolloError } from 'apollo-server-core';
import { nonNullArg } from '../../../../utils/utils';
import CreateUserInput from '../../input/User.input';

export const CreateUser = mutationField('createUser', {
  type: 'AuthPayload',
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

export const LoginUser = mutationField('loginUser', {
  type: 'AuthPayload',
  args: {
    data: nonNullArg(CreateUserInput),
  },
  resolve: (_, args, context) => loginUser(args.data, context),
});