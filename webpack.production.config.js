'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          plugins: ['transform-runtime'],
          presets: [[ "es2015", { "modules": false } ], 'stage-0', 'react'],
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          plugins: ['transform-runtime'],
          presets: [[ "es2015", { "modules": false } ], 'stage-0', 'react'],
        }
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
