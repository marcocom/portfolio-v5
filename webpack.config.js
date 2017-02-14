// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'app'; // the app root folder: src, src_users, etc
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  app_root, // the app root folder, needed by the other webpack configs
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js',
  ],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap',
        exclude: /node_modules/,
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'raw-loader' },
      { test: /([^\s]+(\.(jpg|png|gif|bmp))$)/, loader: 'url-loader?limit=10240' }
    ],
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      app_root,
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  devServer: {
    contentBase: __dirname + '/dist',
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(['*'], {
      root: __dirname + '/dist',
      verbose: true,
      dry: false, // true for simulation
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/' + app_root + '/index.html',
      filename: 'index.html',
      inject: 'body',
    })
  ],
};
