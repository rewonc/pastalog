// webpack.config.js
/*eslint-disable */

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
      filename: './build/assets/app.js',
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
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
      ],
    },
    resolve: {
      alias: {
        lib: __dirname + '/src/lib',
      },
      extensions: ['', '.js', '.scss'],
    },
  },

  // NODE SERVER
  {
    entry: './src/server.js',
    target: 'node',
    output: {
      filename: './build/server.js',
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
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
      ],
    },
    resolve: {
      alias: {
        lib: __dirname + '/src/lib',
      },
      extensions: ['', '.js', '.scss'],
    },
    node: {
      console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    externals: nodeModules,
  },

  // TEST
  {
    entry: './test/index.js',
    target: 'node',
    output: {
      filename: './test/build/index.js',
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
      ],
    },
    node: {
      console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },

    externals: nodeModules,
  },
];

/*eslint-enable */
