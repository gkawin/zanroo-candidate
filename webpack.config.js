const path = require('path')
const moduleRulesBabel = require('./webpack/moduleRulesBabel')
const moduleAliases = require('./webpack/moduleAliases')
const modulePlugins = require('./webpack/modulePlugins')
const development = process.env.NODE_ENV === 'development'

module.exports = {
  devtool: 'eval',
  entry: {
    app: path.resolve(__dirname, 'src', 'entry.js'),
    vendor: [ 'jquery', 'lodash', 'react', 'react-dom', 'prop-types' ]
  },
  resolve: {
    alias: Object.assign({ }, moduleAliases,
      { 'mh-design$': require.resolve('./src/design') }
    )
  },
  output: {
    filename: '[name].bundle.js',
    pathinfo: development
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      ...moduleRulesBabel,
    ]
  },
  plugins: require('./webpack/plugins'),
  devServer: {
    compress: true,
    historyApiFallback: true
  }
}