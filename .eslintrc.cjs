module.exports = {
  plugins: [
    'jest',
  ],
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
  },
};
