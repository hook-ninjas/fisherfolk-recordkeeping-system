import { inputObjectType } from 'nexus';

const CreateImageInput = inputObjectType({
  name: 'CreateImageInput',
  definition(t) {
    t.string('text');
    t.nullable.field('fisherfolkId', { type: 'BigInt' });
    t.nullable.field('gear_id', { type: 'BigInt' });
    t.nullable.field('vessel_id', { type: 'BigInt' });
    t.nullable.field('government_aid_id', { type: 'Int' });
    t.string('name');
    t.string('url');
    t.field('updated_at', { type: 'DateTime' });
  }
});

export default CreateImageInput;