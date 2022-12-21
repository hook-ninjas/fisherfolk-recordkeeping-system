import { inputObjectType } from 'nexus';

const OrganizationInput = inputObjectType({
  name: 'OrganizationInput',
  definition(t) {
    t.string('name');
    t.int('yearJoined');
    t.string('position');
  },
});

export default OrganizationInput;
