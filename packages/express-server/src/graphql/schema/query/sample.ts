import { queryField, list } from 'nexus';
import Book from '../model/sample';

// This Code is for test purpose //
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const SampleQuery = queryField('book', {
  type: 'Book',
  resolve: (_parent) => () => books,
});

export default { SampleQuery };
