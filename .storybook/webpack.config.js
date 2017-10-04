const moduleAliases = require('../webpack/moduleAliases')
const moduleRulesBabel = require('../webpack/moduleRulesBabel')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      ...moduleRulesBabel,
    ]
  },
  resolve: {
    alias: moduleAliases
  }
}