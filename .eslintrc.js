const { configure, presets } = require('eslint-kit')

module.exports = configure({
  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react({
      version: 'detect',
      newJSXTransform: true,
    }),
    presets.effector(),
  ],
  extend: {
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'react/react-in-jsx-scope': 'off',
      'effector/mandatory-scope-binding': 'off',
      'effector/prefer-useUnit': 'off',
    },
  },
})
