import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});

export default { User };
