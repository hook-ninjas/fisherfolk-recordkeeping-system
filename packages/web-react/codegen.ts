import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'src/**/*.tsx',
  generates: {
    'src/gql': {
      preset: 'client',
      plugins: ['typescript-resolvers', 'typescript', 'typed-document-node'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
