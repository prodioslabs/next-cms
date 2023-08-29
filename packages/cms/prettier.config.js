const config = require('prettier-config')
// TODO: Remove this from prettier-config and add it to individual config
// when required
delete config.plugins
delete config.tailwindFunctions

module.exports = config
