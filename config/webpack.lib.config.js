const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  root: path.join(__dirname, '../'),
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: `${PATHS.src}/slider/lib.ts`,
  output: {
    filename: 'slider.js',
    path: `${PATHS.root}/dist`,
    library: 'slider',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.root}/postcss.config.js` } },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'slider.css',
    }),
  ],
};
