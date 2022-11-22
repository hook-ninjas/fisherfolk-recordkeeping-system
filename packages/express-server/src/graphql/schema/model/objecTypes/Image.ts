import { nullable, objectType } from 'nexus';
import Fisherfolk from './Fisherfolk';

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.string('id');
    t.field('fisherfolkId', { type: 'BigInt' });
    t.field('fisherfolk', {
      type: nullable(Fisherfolk),
      resolve: ({ id }, _, context) => {
        return context.prisma.image
          .findUnique({ where: { id: id } }) // Id key needs to be specfied due to image id on prisma is in cuid format
          .fisherfolk();
      },
    });
    t.string('name');
    t.string('url');
    t.string('format');
    t.string('version');
    t.boolean('isArchive');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Image;
