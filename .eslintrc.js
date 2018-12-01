// eslint rules
const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'no-unused-vars': warn,
    'react/jsx-one-expression-per-line': warn,
    'jsx-a11y/alt-text': warn,
  },
};
