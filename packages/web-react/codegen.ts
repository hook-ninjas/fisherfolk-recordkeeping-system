import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `${import.meta.env.VITE_APP_API}/graphql`
  ,
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        'typescript-resolvers',
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
