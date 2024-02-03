/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: environment.paths.output,
    },
    open: true,
    historyApiFallback: true,
    compress: true,
    hot: false,
    ...environment.server,
    devMiddleware: {
      writeToDisk: true,
      // watchOptions: {
      //   aggregateTimeout: 300,
      //   poll: 300,
      //   ignored: ['node_modules'],
      // },
    },
  },
  plugins: [],
});
