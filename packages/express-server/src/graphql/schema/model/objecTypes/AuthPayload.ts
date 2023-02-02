import { objectType } from 'nexus';
import User from './User';

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', {
      type: User,
    });
  },
});

export default AuthPayload;
