import { inputObjectType } from 'nexus';

const OrganizationInput = inputObjectType({
  name: 'OrganizationInput',
  definition(t) {
    t.string('name');
    t.int('yearJoined');
    t.string('position');
  },
});

const CreateFfolkOrganizationInput = inputObjectType({
  name: 'OrganizationInput',
  definition(t) {
    t.field('fisherfolkId', { type: 'BigInt' });
    t.string('name');
    t.int('yearJoined');
    t.string('position');
  },
});

export { OrganizationInput, CreateFfolkOrganizationInput };
