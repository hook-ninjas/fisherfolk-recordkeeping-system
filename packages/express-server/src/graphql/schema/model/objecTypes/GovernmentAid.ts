import { objectType } from 'nexus';

const GovernmentAid = objectType({
  name: 'GovernmentAid',
  definition(t) {
    t.int('id');
    t.string('title');
    t.int('slot');
    t.date('date');
    t.string('description');
    t.date('createdAt');
    t.date('updatedAt');
  },
});

export default GovernmentAid;
