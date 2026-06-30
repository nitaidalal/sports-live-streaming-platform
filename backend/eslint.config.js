import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
    },

    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'off',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
  },

  prettier,
];
