import { objectType } from 'nexus';
import { Material } from '../../enums';

const Vessel = objectType({
  name: 'Vessel',
  definition(t) {
    t.field('id', { type: 'BigInt' });
    t.string('mfvrNumber');
    t.string('homeport');
    t.string('name');
    t.string('type');
    t.string('placeBuilt');
    t.nullable.int('yearBuilt');
    t.nullable.field('material', { type: Material });
    t.nullable.float('registeredLength');
    t.nullable.float('registeredBreadth');
    t.nullable.float('registeredDepth');
    t.nullable.float('tonnageLength');
    t.nullable.float('tonnageBreadth');
    t.nullable.float('tonnageDepth');
    t.nullable.float('grossTonnage');
    t.nullable.float('netTonnage');
    t.string('engineMake');
    t.string('serialNumber');
    t.nullable.float('horsepower');
    t.field('fisherfolk', {
      type: 'Fisherfolk',
      resolve: (parent, _, context) => {
        return context.prisma.vessel
          .findUniqueOrThrow({
            where: {
              id: parent.id,
            },
          })
          .fisherfolk();
      },
    });
    t.field('createdAt', {type: 'DateTime'});
    t.field('updatedAt', { type: 'DateTime' });
    t.boolean('isArchive');
  },
});

export default Vessel;
