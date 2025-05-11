module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/coverage/**/*', // Ignore coverage reports
    '*.js', // Ignore JavaScript config files
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'import/no-unresolved': 0,
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 100 }],
    'require-jsdoc': 'off',
    'new-cap': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-namespace': 'off'
  },
};
