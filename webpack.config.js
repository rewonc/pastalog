// webpack.config.js

// hack to avoid packaging external modules
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [

  // CLIENT
  {
    entry: './src/client.js',
    output: {
      filename: './dist/assets/app.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015-webpack', 'react'],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    resolve: {
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js'],
    },
  },

  // NODE SERVER
  {
    entry: './src/server.js',
    target: 'node',
    output: {
      filename: './dist/server.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015-webpack', 'react'],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    resolve: {
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js'],
    },
    node: {
      console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    externals: nodeModules
  },
];

