module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'no-underscore-dangle': [0],
    'prefer-promise-reject-errors': [0],
    'consistent-return': [0],
    'implicit-arrow-linebreak': [0],
    'operator-linebreak': [0]
  }
}
