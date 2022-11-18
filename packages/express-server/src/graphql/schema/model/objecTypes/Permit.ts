import { nullable, objectType } from 'nexus';
import { nullableList } from '../../../../utils/utils';
import Fisherfolk from './Fisherfolk';
import Gear from './Gear';
import Vessel from './Vessel';

const Permit = objectType({
  name: 'Permit',
  definition(t) {
    t.string('certificateNumber');
    t.bigInt('fisherfolkId');
    t.date('registeredAt');
    t.date('renewedAt');
    t.nullable.date('expiresOn');
    t.boolean('expired');
    t.field('fisherfolk', {
      type: nullable(Fisherfolk),
      resolve: ({ certificateNumber }, _, context) => {
        return context.prisma.permit
          .findUnique({ where: { certificateNumber } })
          .fisherfolk();
      },
    });
    t.field('gears', {
      type: nullableList(Gear),
      resolve: ({ certificateNumber }, _, context) => {
        return context.prisma.permit
          .findUnique({ where: { certificateNumber } })
          .gears();
      },
    });
    t.field('vessels', {
      type: nullableList(Vessel),
      resolve: ({ certificateNumber }, _, context) => {
        return context.prisma.permit
          .findUnique({ where: { certificateNumber } })
          .vessels();
      },
    });
  },
});

export default Permit;
