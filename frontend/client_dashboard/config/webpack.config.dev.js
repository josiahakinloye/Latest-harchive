const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const path = require('path');

console.log(`Dir: ${__dirname}`)

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.join(__dirname, '/../../client_dashboard'),
  entry: [
    './src/index.js',
    // 'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    // path: path.join(__dirname, '../.tmp/public'),
    // filename: 'bundle.js',
    // publicPath: '/'
    path: path.join(__dirname, '/../../../backend/assets/js/pages/harchive/client_dashboard'),
    filename: 'compiled.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader' // inject CSS to page
        }, {
          loader: 'css-loader' // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: () => // post css plugins, can be exported to postcss.config.js
              [
                precss,
                autoprefixer
              ]
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: '/frontend/landing/public/index.html'
  //   }),
  //   new webpack.HotModuleReplacementPlugin()
  // ]
};