const path = require('path')
const moduleRulesBabel = require('./webpack/moduleRulesBabel')
const moduleRulesStyle = require('./webpack/moduleRulesStyle')
const moduleAliases = require('./webpack/moduleAliases')
const modulePlugins = require('./webpack/modulePlugins')
const development = process.env.NODE_ENV === 'development'

module.exports = {
  devtool: 'eval',
  entry: {
    app: path.resolve(__dirname, 'src', 'App.js'),
    vendor: [ 'react', 'react-dom', 'prop-types' ]
  },
  resolve: {
    alias: moduleAliases
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
      ...moduleRulesStyle
    ]
  },
  plugins: modulePlugins,
  devServer: {
    compress: true,
    historyApiFallback: true
  }
}
