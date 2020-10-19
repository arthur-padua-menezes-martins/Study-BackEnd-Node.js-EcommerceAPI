module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'], // refere-se o local onde serão encontrados os arquivos para testes
  coverageDirectory: 'coverage',
  testEnvironment: 'node', // ambiente de testes
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest' // utilização da lib ts-jest para converter o código .ts para .js e submete-lo ao jest
  }
}
