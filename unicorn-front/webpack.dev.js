const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: 'build',
    port: 3000,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
