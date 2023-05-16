import { ApolloError } from 'apollo-server-core';
import { getUserId } from '../../../../auth/auth';
import { Context } from '../../../context';
import { getErrorMessage } from '../../../../helper/userHelper';

export const queryUser = async (ctx: Context) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApolloError('No secret token.');
  }
  const userId = getUserId(ctx, process.env.ACCESS_TOKEN_SECRET);

  try {
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: { id: Number(userId) },
    });

    return user;
  } catch (error) {
    console.log(error);
    const errMsg = getErrorMessage(error);
    if (errMsg) {
      throw new ApolloError(errMsg);
    }
    throw error;
  }
};
