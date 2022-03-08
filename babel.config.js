module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@linaria',
  ],
  plugins: [
    'effector/babel-plugin',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-modules-commonjs',
    [
      'module-resolver',
      {
        alias: {
          '~': './src',
        },
      },
    ],
  ],
}
