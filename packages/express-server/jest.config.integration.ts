import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['dotenv/config'],
  testRegex: '(/__tests__/.*|(\\.|/)(integration))\\.(test|spec)\\.tsx?$',
  testEnvironment: 'jest-environment-node',
};

export default config;
