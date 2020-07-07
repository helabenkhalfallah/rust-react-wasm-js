module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "quotes": ["error", "double"],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "max-len": [1, 120, 2, { ignoreComments: true }],
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "comma-dangle": [
      2,
      "always-multiline"
    ],
    "no-console": "error"
  },
};
