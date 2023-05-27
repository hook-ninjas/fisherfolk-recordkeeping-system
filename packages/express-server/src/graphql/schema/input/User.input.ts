import { inputObjectType } from 'nexus';

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});

export default CreateUserInput;
