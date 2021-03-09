const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require("copy-webpack-plugin");
const { ROOT_PATH, SRC_PATH, OUTPUT_PATH, isPro } = require('./constants');

module.exports = {
  entry: path.join(SRC_PATH, './index.tsx'),
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH,
    publicPath: '/'
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: SRC_PATH,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        include: path.join(ROOT_PATH, './node_modules/normalize.css')
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        include: SRC_PATH
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(ROOT_PATH, './tsconfig.json')
      })
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'assets/webgl/**/*', }, // 默认拷贝到output文件夹
        {
          context:'src/workers', // context + from 为待拷贝路径, 但是context路径不会拷贝到结果文件夹中
          from: '**/*',
          to: 'workers'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      env: isPro,
      inject: 'body',
      template: './index.html'
    })
    // new  BundleAnalyzerPlugin()
  ]
}