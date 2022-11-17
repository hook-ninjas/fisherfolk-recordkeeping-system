import { objectType } from 'nexus';

const Permit = objectType({
  name: 'Permit',
  definition(t) {
    t.string('certificateNumber');
    t.bigInt('fisherfolkId');
    t.date('registeredAt');
    t.date('renewedAt');
    t.date('expiresOn');
    t.boolean('expired');
  },
});

export default Permit;
