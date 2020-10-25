const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/docs'
  },
  devServer: {
    contentBase: './docs',
    port: 9000
  }
};