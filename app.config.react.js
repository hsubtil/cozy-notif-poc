'use strict'

const { useHotReload } = require('cozy-scripts/config/webpack.vars')
const CTS = require('cozy-scripts/utils/constants.js')

process.env[CTS.ENTRY_EXT] = '.jsx'
const path = require('path')
const get = require('lodash/get')
const SRC_DIR = path.resolve(__dirname, './src')

module.exports = {
  resolve: {
    extensions: ['.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, // Add TS extensions
        exclude: /node_modules(\/|\\)(?!(cozy-ui))/,
        loader: require.resolve('cozy-scripts/node_modules/babel-loader'), // Add full path
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/react',
          presets: ['cozy-app'],
          plugins: useHotReload ? ['react-hot-loader/babel']  : [],
        },
      },
      {
        test: /\.scss$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.hbs$/,
        include: SRC_DIR,
        loader: 'raw-loader',
      },
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
    ]
  },
  target: 'node'
}
