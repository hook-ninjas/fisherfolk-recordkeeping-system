import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import bcrypt from 'bcrypt';

type CreateUserInput = NexusGenInputs['CreateUserInput'];

export async function createUser(user: CreateUserInput, ctx: Context) {

  // encrypt user’s password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  return ctx.prisma.user.create({
    data: {
      username: user.username,
      password: hashedPassword,
    },
  });
}