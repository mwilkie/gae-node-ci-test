module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/no-danger': 0,
    /*
     * Code Climate only supports a limited number of plugins. Unfortunately
     * we cannot use eslint-import-resolver-webpack in their environment. Disable
     * these locally for consistency. This may change in the future.
     */
    'import/extensions': ['off', 'never'],
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    /* And... */
    'import/no-named-as-default': 0,
    'import/no-absolute-path': 0,
    'import/no-duplicates': 0,
    'import/no-named-as-default-member': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'prettier/prettier': 'error'
  },
  plugins: ['prettier']
};
