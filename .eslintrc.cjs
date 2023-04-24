module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'coverage',
    'dist'
  ],
  rules: {
    "class-methods-use-this": "off",
  },
  env: {
    node: true,
    browser: false,
    jest: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    },
  },
};
