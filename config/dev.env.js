'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  dev: {
    host: '127.0.0.1',
    port: 8001
  },
  NODE_ENV: '"development"',
  BASE_URL: '"https://ins-api.sleen.top/"'
//  BASE_URL: '"http://127.0.0.1:5000/"'
})
