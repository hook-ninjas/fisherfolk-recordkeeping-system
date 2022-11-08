import { User } from '@prisma/client';
import { Context, createMockContext } from '../../../context';
import { createUser } from './User.resolver';
import { MockContext } from '../../../../types/types';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create new user', async () => {
  const user: User = {
    id: 1,
    username: 'user_admin',
    password: 'password123'
  };

  mockCtx.prisma.user.create.mockResolvedValue(user);

  const input = {
    username: 'user_admin',
    password: 'password123'
  };

  await expect(createUser(input, ctx)).resolves.toEqual(user);

  expect(ctx.prisma.user.create).toHaveBeenCalledWith({
    data: {
      username: 'user_admin',
      password: 'password123'
    }
  });
});