import { ApolloError } from 'apollo-server-core';
import { getUserId } from '../../../../auth/auth';
import { Context } from '../../../context';

export const queryUser = (ctx: Context) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApolloError('No secret token.');
  }

  const userId = getUserId(ctx, process.env.ACCESS_TOKEN_SECRET);

  return ctx.prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
};
