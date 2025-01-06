module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
    },
    testMatch: ['<rootDir>/testing/__tests__/**/*.test.js'],
  };
  