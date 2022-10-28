import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { MockContext } from '../types/types';

type Context = {
  prisma: PrismaClient;
  req: any;
};

const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};

const prisma = new PrismaClient();

const context: Context = {
  prisma,
  req: {},
};

export { Context, context, createMockContext };
