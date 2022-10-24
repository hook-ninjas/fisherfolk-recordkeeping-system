import { objectType } from 'nexus';

// This Code is for test purpose //

const Book = objectType({
  name: 'Book',
  definition(t) {
    t.string('title');
    t.string('author');
  },
});

export default { Book };
