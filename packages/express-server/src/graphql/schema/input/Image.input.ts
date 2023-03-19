import { inputObjectType } from 'nexus';

const UploadImageInput = inputObjectType({
  name: 'UploadImageInput',
  definition(t) {
    t.string('uri');
    t.string('name');
    t.int('size');
    t.string('type');
    t.boolean('isProfileImage');
  },
});

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
  },
});

export { ImageInput, UploadImageInput };
