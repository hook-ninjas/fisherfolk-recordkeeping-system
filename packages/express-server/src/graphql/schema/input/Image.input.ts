import { inputObjectType } from 'nexus';

const CreateImageInput = inputObjectType({
  name: 'CreateImageInput',
  definition(t) {
    t.string('text');
    t.field('fisherfolkId', { type: 'BigInt' });
    t.field('gear_id', { type: 'BigInt' });
    t.field('vessel_id', { type: 'BigInt' });
    t.string('version');
    t.string('name');
    t.string('url');
    t.string('format');
    t.field('updated_at', { type: 'DateTime' });
  }
});

export default CreateImageInput;