import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateUserInput = NexusGenInputs['CreateUserInput']

export function createUser(user: CreateUserInput, ctx: Context) {
  return ctx.prisma.user.create({
    data: {
      username: user.username,
      password: user.password
    }
  });
}