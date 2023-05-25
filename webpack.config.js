const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';
let target = 'web';
let devtool = 'source-map';
const optimization = {};

const plugins = [
  new MiniCssExtractPlugin({ filename: './css/[name].css' }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
  devtool = false;

  optimization.minimize = true;
  optimization.minimizer = [
    new TerserPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: { plugins: [['webp', { quality: 50 }]] },
      },
    }),
  ];
}

if (process.env.SERVE) plugins.push(new ReactRefreshWebpackPlugin());

module.exports = {
  mode,
  target,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].bundle.js',
    assetModuleFilename: 'images/[name][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
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

  plugins,
  devtool,
  optimization,

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
