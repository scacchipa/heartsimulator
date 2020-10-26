const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/docs'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  devServer: {
    contentBase: './docs',
    port: 9000
  }
};