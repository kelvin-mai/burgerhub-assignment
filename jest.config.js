// https://github.com/react-native-community/upgrade-support/issues/152#issuecomment-1921986831

/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  preset: 'jest-expo',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      babelConfig: true,
    },
  },
  transformIgnorePatterns: [],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
