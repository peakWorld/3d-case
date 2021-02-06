const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const defaultConfig = require('./webpack.config.base.js')
const { OUTPUT_PATH } = require('./constants')

module.exports = merge(defaultConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|svg|woff2?|eot|ttf)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'img/'
            },
          }
        ],
      },
      {
        test: /\.(otf|woff2?|eot|ttf)$/i,
        exclude: /node_modules/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 9888,
    hot: true,
    open: 'Google Chrome',
    contentBase: OUTPUT_PATH,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(OUTPUT_PATH, './vendor-manifest.json'))
    })
  ]
})