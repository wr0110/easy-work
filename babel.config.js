module.exports = function (api) {
  const isProduction = api.env('production')
  const isTests = api.env('test')

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@linaria',
  ]

  const plugins = [
    [
      'effector/babel-plugin',
      {
        factories: ['src/shared/api/requests/request', '~/shared/api/requests/request'],
      },
    ],
    '@babel/plugin-transform-runtime',
  ]

  if (isProduction) {
    plugins.push([
      'import',
      {
        libraryName: '@geist-ui/icons',
        libraryDirectory: '',
        customName: (name) => {
          const pathToLib = (name) => `@geist-ui/icons/${name}`
          const parseToCamelCase = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`

          const separator = '-'
          const hasDash = name.includes(separator)

          if (hasDash) {
            const words = name.split('-')
            const iconsWithDashed = words.slice(1).map(parseToCamelCase)

            const finallyIconName = words[0] + iconsWithDashed.join('')

            return pathToLib(finallyIconName)
          }

          return pathToLib(name)
        },
      },
      'geist-icons',
    ])
  }

  if (isTests) {
    plugins.push(
      ...[
        '@babel/plugin-transform-modules-commonjs',
        [
          'module-resolver',
          {
            alias: {
              '~': './src',
            },
          },
        ],
      ]
    )
  }

  return {
    presets,
    plugins: plugins.filter(Boolean),
  }
}
