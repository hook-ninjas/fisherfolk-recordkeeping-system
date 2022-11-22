import { objectType } from 'nexus';

const GovernmentAid = objectType({
  name: 'GovernmentAid',
  definition(t) {
    t.int('id');
    t.string('title');
    t.int('slot');
    t.date('startDate');
    t.date('endDate');
    t.date('createdAt');
    t.date('updatedAt');
  },
});

export default GovernmentAid;
