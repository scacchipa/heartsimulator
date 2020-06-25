const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
     port: 9000
   }
};