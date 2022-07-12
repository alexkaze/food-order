const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new ImageMinimizerPlugin({
    minimizerOptions: {
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
      ],
    },
  }),
];

if (process.env.SERVE) plugins.push(new ReactRefreshWebpackPlugin());

module.exports = {
  mode: mode,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[name][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: plugins,

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    open: true,
  },
};
