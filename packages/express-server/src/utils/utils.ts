import { arg, nonNull, nullable, list } from 'nexus';
import { NexusNullableTypes } from 'nexus/dist/core';
import { NexusInputObjectTypeDef } from 'nexus/dist/definitions/inputObjectType';

// Prevents null arguments in mutations
const nonNullArg = (input: NexusInputObjectTypeDef<any>) => {
  return arg({ type: nonNull(input) });
};

// Enables Nullability of nexus list types
const nullableList = (type: NexusNullableTypes) => {
  return nullable(list(nullable(type)));
};

// username can contain (_ or .), can have digits and must be atleast 6 charaters long.
const isValidUserName = (username: string) =>
  /^[a-zA-Z][a-zA-Z0-9_.]{5,}$/.test(username);

// password must have a digit and be atleast 8 characters long
const isValidPassword = (password: string) =>
  /^(?=.*\d)[a-zA-Z\d]{7,}$/.test(password);

// function to encode file data to base64 encoded string
const convertToUri = (
  base64: string | Buffer,
  options: { type: string; format: string }
) => {
  const { format, type } = options;
  const result = `data:${type}/${format};base64,${base64}`;
  return result;
};

export {
  nonNullArg,
  nullableList,
  isValidPassword,
  isValidUserName,
  convertToUri,
};
