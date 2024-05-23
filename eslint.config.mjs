import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'indent': ['error', 2, { FunctionDeclaration: { parameters: 'first' } }],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
  },
})
