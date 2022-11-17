import { nullable, objectType } from 'nexus';
import Fisherfolk from './Fisherfolk';

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
  },
});

export default Permit;
