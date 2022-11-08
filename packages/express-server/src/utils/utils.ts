import { arg, nonNull } from 'nexus';
import { NexusInputObjectTypeDef } from 'nexus/dist/definitions/inputObjectType';

// Prevents null arguments in mutations
const nonNullArg = (input: NexusInputObjectTypeDef<any>) => {
  return arg({ type: nonNull(input) });
};

// username can contain (_ or .), can have digits and must be atleast 6 charaters long.
const isValidUserName = (username: string) =>
  /^[a-zA-Z][a-zA-Z0-9_.]{5,}$/.test(username);

// password must have a digit and be atleast 8 characters long
const isValidPassword = (password: string) =>
  /^(?=.*\d)[a-zA-Z\d]{7,}$/.test(password);

export { nonNullArg, isValidPassword, isValidUserName };
