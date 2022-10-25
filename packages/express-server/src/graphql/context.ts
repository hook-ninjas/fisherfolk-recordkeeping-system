import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { Context, MockContext } from '../types/types';

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

export { context, createMockContext };
