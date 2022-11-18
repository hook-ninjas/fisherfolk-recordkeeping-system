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
    t.int('yearBuilt');
    t.field('material', { type: Material });
    t.float('registeredLength');
    t.float('registeredBreadth');
    t.float('registeredDepth');
    t.float('tonnageLength');
    t.float('tonnageBreadth');
    t.float('tonnageDepth');
    t.float('grossTonnage');
    t.float('netTonnage');
    t.string('engineMake');
    t.string('serialNumber');
    t.float('horsepower');
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
  },
});

export default Vessel;
