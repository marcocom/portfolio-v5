const webpack = require('webpack');
const config = require('./webpack.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.module.loaders[1] = {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer?browsers=last 3 version!less?outputStyle=expanded&sourceMap'),
  exclude: /node_modules/,
};

// compress the js file
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new ExtractTextPlugin('main-[contenthash].css')
);

config.devtool = null;

module.exports = Object.assign({}, config, {
  entry: [
    'babel-polyfill',
    __dirname + '/' + config.app_root + '/index.js'
  ]
});
