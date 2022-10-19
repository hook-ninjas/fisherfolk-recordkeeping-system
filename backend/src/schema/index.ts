import { makeSchema, asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { validatePlugin } from 'nexus-validate'
import Input from './inuput'
import Query from './query'
import Mutation from './mutation'
import Models from './model'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types: [...Query, ...Mutation, DateTime, ...Models, ...Input],
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
})
