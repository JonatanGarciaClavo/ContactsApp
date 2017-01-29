'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:3003',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: "pre",
        options: {
          fix: false,
          failOnWarning: false,
          failOnError: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'raw-loader'],
        include: __dirname
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {limit: 10240}
      }
    ]
  }
};
