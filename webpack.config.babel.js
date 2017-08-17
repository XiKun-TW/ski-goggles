import path from 'path';;
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const Modules = {
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

const Plugins = [
  new HtmlWebpackPlugin({
    template: './src/html/panel.html',
    filename: 'panel.html',
    inject: 'body',
    chunks: ['panel']
  }),
  new HtmlWebpackPlugin({
    template: './src/html/options.html',
    filename: 'options.html',
    inject: 'body',
    chunks: ['options']
  }),
  new CopyWebpackPlugin([
    { from: 'src/assets/styles/semantic-ui.css', to: 'css'},
    { from: 'src/assets/styles/snow.css', to: 'css'},
    { from: 'src/assets/fonts', to: 'css/themes/default/assets/fonts'},
    { from: 'src/assets/images', to: 'images'},
    { from: 'src/manifest.json', to: 'manifest.json'}
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['css/semantic-ui.css'],
    append: false,
    files: ['panel.html', 'options.html']
  }),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['css/snow.css'],
    append: false,
    files: ['options.html']
  }),
  new HtmlWebpackPlugin({
    template: './src/html/devtools.html',
    filename: 'devtools.html',
    inject: 'head',
    chunks: ['devtools']
  }),
];

const Config = {
  ...Modules,

  entry: {
    panel: './src/panel.js',
    background: './src/background.js',
    devtools: './src/devtools.js',
    options: './src/options.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },

  plugins: Plugins
};

module.exports = {
  ...Config
};