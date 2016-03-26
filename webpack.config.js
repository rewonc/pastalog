// webpack.config.js
module.exports = {
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
    extensions: ['', '.js'] ,
  },
};