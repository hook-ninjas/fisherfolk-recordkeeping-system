import { inputObjectType } from 'nexus';

const UploadImageInput = inputObjectType({
  name: 'UploadImageInput',
  definition(t) {
    t.nullable.field('fisherfolkId', { type: 'BigInt' });
    t.nullable.field('gearId', { type: 'BigInt' });
    t.nullable.field('vesselId', { type: 'BigInt' });
    t.string('uri');
    t.string('name');
    t.nullable.int('size');
    t.nullable.string('type');
    t.nullable.boolean('isProfileImage');
  },
});

const ImageInput = inputObjectType({
  name: 'CreateImageInput',
  definition(t) {
    t.nullable.field('fisherfolkId', { type: 'BigInt' });
    t.nullable.field('gear_id', { type: 'BigInt' });
    t.nullable.field('vessel_id', { type: 'BigInt' });
    t.string('text');
    t.nullable.field('government_aid_id', { type: 'Int' });
    t.string('url');
    t.string('name');
    t.nullable.int('size');
    t.nullable.string('type');
    t.field('updated_at', { type: 'DateTime' });
  },
});

export { ImageInput, UploadImageInput };
