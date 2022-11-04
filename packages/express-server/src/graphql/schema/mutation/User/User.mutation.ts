import { arg, mutationField, nonNull } from 'nexus';
import { isValidPassword, isValidUserName } from '../../../../utils/utils';
import { createUser } from './User.resolver';

export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    data: nonNull(
      arg({
        type: 'CreateUserInput',
      })
    )
  },
  validate: async (_, args, context) => {
    const { username, password } = args.data;

    if (!isValidPassword(password)) {
      throw new Error('Password must have a digit and be atleast 8 characters long.');
    }

    if (!isValidUserName(username)) {
      throw new Error('Username can contain but can not start with (_ .) or digits and must be atleast 6 charaters long.');
    }

    // check if username already exist
    const existingUser = await context.prisma.user.findFirst({
      where: {
        username: username
      }
    });
    if (existingUser) {
      throw new Error('Username is already taken.');
    }
  },
  resolve: (_, args, context) => createUser(args.data, context),
});