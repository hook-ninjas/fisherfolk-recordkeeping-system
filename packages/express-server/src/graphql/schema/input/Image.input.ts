import { inputObjectType } from 'nexus';

const CreateImageInput = inputObjectType({
  name: 'CreateImageInput',
  definition(t) {
    t.string('text');
    t.field('fisherfolkId', { type: 'BigInt' });
    t.nullable.field('gear_id', { type: 'BigInt' });
    t.nullable.field('vessel_id', { type: 'BigInt' });
    t.string('name');
    t.string('url');
    t.field('updated_at', { type: 'DateTime' });
  }
});

export default CreateImageInput;