import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-core';
import { getErrorMessage } from '../../../../helper/userHelper';

type CreateUserInput = NexusGenInputs['CreateUserInput'];

export const createUser = async (args: CreateUserInput, ctx: Context) => {
  try {
    // encrypt user’s password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(args.password, saltRounds);

    const user = await ctx.prisma.user.create({
      data: {
        username: args.username,
        password: hashedPassword,
      },
    });

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new ApolloError('No secret token.');
    }

    // generate token
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr',
    });

    return {
      token,
      user,
    };
  } catch (error) {
    console.log(error);
    const errMsg = getErrorMessage(error);
    if (errMsg) {
      throw new ApolloError(errMsg);
    }
    throw error;
  }
};

export const loginUser = async (args: CreateUserInput, ctx: Context) => {
  try {
    const user = await ctx.prisma.user.findUnique({
      where: {
        username: args.username,
      },
    });

    //check if username exists
    if (!user) {
      throw new ApolloError('Sorry, could not find your account.');
    }

    const validPassword = await bcrypt.compare(args.password, user.password);

    //check if users password equals to the encrypted password
    if (!validPassword) {
      throw new ApolloError('Incorrect password.', 'INCORRECT_PASSWORD');
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new ApolloError('No secret token.');
    }

    // generate new token
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    return {
      token,
      user,
    };
  } catch (error) {
    console.log(error);
    const errMsg = getErrorMessage(error);
    if (errMsg) {
      throw new ApolloError(errMsg);
    }
    throw error;
  }
};
