'use strict'

/**
 * This file overrides the default cozy webpack config to specify a custom react config.
 * This react config enables the use of TypeScript.
 *
 * @override node_modules/cozy-scripts/config/webpack.bundle.default.js
 */

const webpackMerge = require('webpack-merge')
const cozyNotificationsWebpackConfig = require('cozy-notifications/dist/webpack/config')
// const configs = require('cozy-scripts/config/webpack.bundle.default.js')



const merge = require('webpack-merge')
const { environment, target, addAnalyzer } = require('cozy-scripts/config/webpack.vars')

const configs = [
  require('cozy-scripts/config/webpack.config.base'),
  require('cozy-scripts/config/webpack.config.typescript'),
  require('cozy-scripts/config/webpack.config.chunks'),
  // require('cozy-scripts/config/webpack.config.react'),
  require('./app.config.react'), // Override the react config
  require('cozy-scripts/config/webpack.config.eslint'),
  require('cozy-scripts/config/webpack.config.cozy-ui'),
  require('cozy-scripts/config/webpack.config.cozy-ui.react'),
  require('cozy-scripts/config/webpack.config.intents'),
  require('cozy-scripts/config/webpack.config.public'),
  require('cozy-scripts/config/webpack.config.pictures'),
  require('cozy-scripts/config/webpack.config.vendors'),
  require('cozy-scripts/config/webpack.config.manifest'),
  require('cozy-scripts/config/webpack.config.progress'),
  require('cozy-scripts/config/webpack.config.duplicates'),
  addAnalyzer ? require('cozy-scripts/config/webpack.config.analyzer') : null,
  require('cozy-scripts/config/webpack.config.services'),
  require(`cozy-scripts/config/webpack.target.${target}`)
]

if (environment === 'production') {
  configs.push(require('cozy-scripts/config/webpack.environment.prod'))
} else {
  configs.push(require('cozy-scripts/config/webpack.environment.dev'))
}

const conf = merge.apply(null, configs)


module.exports = [
  conf
, cozyNotificationsWebpackConfig.default]
