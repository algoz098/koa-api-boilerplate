module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: 'koa',
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
  },
}
