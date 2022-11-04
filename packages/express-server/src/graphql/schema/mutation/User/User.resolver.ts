import { Context } from '../../../context';

type User = {
    username: string
    password: string
}

export function createUser(user: User, ctx: Context) {
  return ctx.prisma.user.create({
    data: {
      username: user.username,
      password: user.password
    }
  });
}