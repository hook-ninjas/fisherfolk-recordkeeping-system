import { nullable, queryField } from 'nexus';
import { queryUser } from './User.resolver';

const User = queryField('user', {
  type: nullable('User'),
  resolve: (_, __, ctx) => queryUser(ctx),
});

export default [User];
