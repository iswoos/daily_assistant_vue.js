module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': 'warn',
    'vue/no-multiple-template-root': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
  },
}
