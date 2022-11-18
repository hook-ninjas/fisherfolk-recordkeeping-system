import { objectType } from 'nexus';
import { GearClassification } from '../../enums';

const Gear = objectType({
  name: 'Gear',
  definition(t) {
    t.field('id', { type: 'BigInt' });
    t.field('classification', { type: GearClassification }), t.string('type');
    t.field('fisherfolk', {
      type: 'Fisherfolk',
      resolve: (parent, _, context) => {
        return context.prisma.gear
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

export default Gear;
