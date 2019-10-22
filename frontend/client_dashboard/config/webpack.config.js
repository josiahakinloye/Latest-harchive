const precss = require('precss');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: path.join(__dirname, '/../../client_dashboard'),
  entry: [
    './src/index.js'
  ],
  output: {
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
  }
};