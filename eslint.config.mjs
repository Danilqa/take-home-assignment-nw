import tsPattern from '@danilqa/eslint-plugin-ts-pattern'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import playwright from 'eslint-plugin-playwright'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const forbidImports = (...packages) => ({
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: packages.flatMap((name) => [name, `${name}/**`]),
          message: 'Imports go one way between packages. See AGENTS.md.',
        },
      ],
    },
  ],
})

export default defineConfig(
  globalIgnores(['**/node_modules/', '**/styled-system/', '**/dist/', '**/*.config.*']),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: '19' },
    },
    plugins: {
      'import-x': importX,
      'react-hooks': reactHooks,
      'ts-pattern': tsPattern,
      unicorn,
    },
    rules: {
      curly: 'error',
      eqeqeq: 'error',
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-negated-condition': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'TSTypeLiteral:not(TSTypeAliasDeclaration TSTypeLiteral):not(TSInterfaceDeclaration TSTypeLiteral)',
          message: 'Extract inline type literals to a named interface.',
        },
      ],

      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',

      'import-x/no-default-export': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', ['external', 'internal'], 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: '@web-app/**', group: 'external', position: 'after' }],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-no-constructed-context-values': 'error',
      'react/no-object-type-as-default-prop': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      'ts-pattern/prefer-match-on-union': 'error',

      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/name-replacements': [
        'error',
        {
          checkFilenames: false,
          extendDefaultReplacements: false,
          replacements: {
            e: { error: false, event: true },
            ctx: { context: true },
            req: { request: true },
            res: { response: true },
            el: { element: true },
          },
        },
      ],
    },
  },
  {
    files: ['**/*.e2e.ts', '**/*.ct.ts'],
    extends: [playwright.configs['flat/recommended']],
  },
  {
    files: ['packages/design-system/**'],
    rules: forbidImports('domains', 'web-app', 'server', 'e2e'),
  },
  {
    files: ['packages/domains/**'],
    rules: forbidImports(
      'design-system',
      'web-app',
      'server',
      'e2e',
      'react',
      'react-dom'
    ),
  },
  {
    files: ['packages/server/**'],
    rules: forbidImports('design-system', 'web-app', 'e2e'),
  },
  prettier
)
