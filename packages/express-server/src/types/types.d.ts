import { DeepMockProxy } from 'jest-mock-extended';

declare type Context = {
  prisma: PrismaClient;
  req: any;
};

declare type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export { Context, MockContext };
