import { makeSchema, asNexusMethod } from 'nexus';
import { DateTimeResolver, BigIntResolver } from 'graphql-scalars';
import { validatePlugin } from 'nexus-validate';
import Input from './input';
import Query from './query';
import Mutation from './mutation';
import Models from './model';

const DateTime = asNexusMethod(DateTimeResolver, 'date');
const BigInt = asNexusMethod(BigIntResolver, 'bigInt');

const schema = makeSchema({
  nonNullDefaults: {
    input: true,
    output: true,
  },
  types: [...Models, ...Input, ...Mutation, ...Query, DateTime, BigInt],
  outputs: {
    schema: `${__dirname}/../../schema.graphql`,
    typegen: `${__dirname}/../generated/nexus.ts`,
  },
  contextType: {
    module: require.resolve('../context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  plugins: [validatePlugin()],
});

export { schema };
