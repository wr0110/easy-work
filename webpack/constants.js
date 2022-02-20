const { normalize, resolve } = require('path')
const fs = require('fs')

const root = normalize(fs.realpathSync(`${__dirname}/..`))

const source = resolve(root, 'src')

exports.context = source
exports.build = resolve(root, 'build')
exports.entryMain = resolve(source, 'index.tsx')
exports.indexHTML = resolve(source, 'index.html')
exports.extensions = ['js', 'jsx', 'ts', 'tsx', 'json']

exports.outputDev = {
  js: 'bundle.js',
}

exports.outputProd = {
  js: '[name].[contenthash].js',
}
