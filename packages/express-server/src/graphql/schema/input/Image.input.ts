import { inputObjectType } from 'nexus';

const ImageInput = inputObjectType({
  name: 'CreateImageInput',
  definition(t) {
    t.nullable.field('fisherfolkId', { type: 'BigInt' });
    t.nullable.field('gear_id', { type: 'BigInt' });
    t.nullable.field('vessel_id', { type: 'BigInt' });
    t.string('url');
    t.string('name');
    t.nullable.int('size');
    t.nullable.string('type');
    t.field('updated_at', { type: 'DateTime' });
  },
});

export default ImageInput;
