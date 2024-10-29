import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
// import tsParser from "@typescript-eslint/parser";
// import prettierConfig from "eslint-config-prettier";
import prettierPluginRecommend from 'eslint-plugin-prettier/recommended'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // prettier,
  {
    // plugins: {
    //   // "@typescript-eslint": tseslint.configs,
    //   // prettier: prettierPlugin,
    // },
    rules: {
      // should match with .prettierrc to make vscode can auto formatter
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // prettierConfig,
  prettierPluginRecommend,
]
