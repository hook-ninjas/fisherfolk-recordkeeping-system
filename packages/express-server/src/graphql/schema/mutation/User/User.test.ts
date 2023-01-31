import { User } from '@prisma/client';
import { Context, createMockContext } from '../../../context';
import { createUser, loginUser } from './User.resolver';
import { MockContext } from '../../../../types/types';
import bcrypt from 'bcrypt';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('Create Account', () => {
  it('should create new user', async () => {
    const user: User = {
      id: 1,
      username: 'admin_jc',
      password: 'Admin_2023',
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);

    const input = {
      username: 'admin_jc',
      password: 'Admin_2023',
    };

    const payload = createUser(input, ctx);

    await expect(payload).resolves.toEqual({
      token: (await payload).token,
      user: (await payload).user,
    });
  });
});

describe('Login', () => {
  it('should log in user', async () => {
    const user: User = {
      id: 1,
      username: 'admin_jc',
      password: await bcrypt.hash('Admin_2023', 10),
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(user);

    const input = {
      username: 'admin_jc',
      password: 'Admin_2023',
    };

    const loginUserPayload = loginUser(input, ctx);

    await expect(loginUserPayload).resolves.toEqual({
      token: (await loginUserPayload).token,
      user: (await loginUserPayload).user,
    });
  });

  it('should throw can not find account error', async () => {
    const user: User = {
      id: 1,
      username: 'admin_jc',
      password: 'Admin_2023',
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);

    const input = {
      username: 'admin_lj',
      password: 'Admin_2023',
    };

    const loginUserPayload = loginUser(input, ctx);

    await expect(loginUserPayload).rejects.toThrowError(
      'Sorry, could not find your account.'
    );
  });

  it('should throw incorrect password error', async () => {
    const user: User = {
      id: 1,
      username: 'admin_jc',
      password: await bcrypt.hash('Admin_2023', 10),
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(user);

    const input = {
      username: 'admin_jc',
      password: 'Admin_2022',
    };

    const loginUserPayload = loginUser(input, ctx);

    await expect(loginUserPayload).rejects.toThrowError('Incorrect password');
  });
});
