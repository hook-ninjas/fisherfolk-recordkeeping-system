import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testRegex: '(/__tests__/.*|(\\.|/)(unit))\\.(test|spec)\\.ts?$',
  testEnvironment: 'jest-environment-node',
};

export default jestConfig;
