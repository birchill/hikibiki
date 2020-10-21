const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    hikibiki: ['./src/main.tsx'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    // Although this path is the default, it is needed by clean-webpack-plugin
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'img/*', flatten: true },
        { from: 'src/manifest.webmanifest', flatten: true },
        { from: '_headers' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      excludeChunks: ['db-worker'],
    }),
    new MiniCssExtractPlugin({ filename: 'hikibiki.[contenthash].css' }),
    // Don't run this unless we mean to -- it corrupts the stats file so
    // other tools can't use it.
    process.env.RELATIVE_CI_KEY
      ? new RelativeCiAgentWebpackPlugin()
      : undefined,
  ],
  mode,
  optimization: {
    splitChunks: {
      minChunks: 2,
    },
  },
  devtool: prod ? false : 'source-map',
};
