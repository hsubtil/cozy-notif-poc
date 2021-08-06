/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

/**
 * This file overrides the default services webpack config.
 * This services config enables the use of TypeScript.
 *
 * @override node_modules/cozy-scripts/config/webpack.config.services.js
 */

const webpack = require('webpack')
const path = require('path')
const fs = require('fs-extra')
const paths = require('cozy-scripts/utils/paths')
const {
  eslintFix,
  getFilename,
  target,
} = require('cozy-scripts/config/webpack.vars')

const servicesFolder = paths.appServicesFolder()
const servicesPaths = fs.existsSync(servicesFolder)
  ? fs.readdirSync(servicesFolder)
  : []

const servicesEntries = {}
servicesPaths.forEach(file => {
  if (!file.match(/^[^.]*.ts$/)) return
  const filename = file.match(/^([^.]*).ts$/)[1]
  servicesEntries[filename] = path.resolve(path.join(servicesFolder, file))
})

const config = {
  __mergeStrategy: {
    smart: false,
    strategy: {
      plugins: 'replace',
      output: 'replace',
      entry: 'replace',
      optimization: 'replace',
      module: 'replace',
      externals: 'replace',
    },
  },
  entry: servicesEntries,
  output: {
    path: paths.appServicesBuild(),
    filename: `${getFilename(false)}.js`,
  },
  target: 'node',
  optimization: {}, // reset optimization property
  devtool: false,
  externals: [], // reset externals property
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: require.resolve('cozy-scripts/node_modules/eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app'],
          fix: eslintFix,
          emitWarning: true,
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|cozy-(bar|client-js))/,
        loader: require.resolve('cozy-scripts/node_modules/babel-loader'),
        options: {
          cacheDirectory: 'cozy-scripts/node_modules/.cache/babel-loader/node',
          babelrc: false,
          presets: [['cozy-app', { node: true, react: false }]],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services'),
    }),
  ],
}

/* We don't build services if no services and if on mobile build */
const addServicesConfig =
  target === 'browser' && Object.keys(servicesEntries).length

// only for browser target (services are usable only on cozy-stack)
module.exports = addServicesConfig ? { multiple: { services: config } } : {}
