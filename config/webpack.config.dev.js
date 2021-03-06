const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const defaultConfig = require('./webpack.config.base.js')
const { OUTPUT_PATH, isLocal } = require('./constants')
const { getIpAddress } = require('./utils')

// 开发配置
const devServer = {
  host: getIpAddress(),
  port: 9888,
  hot: true,
  open: 'Google Chrome',
  contentBase: OUTPUT_PATH,
}

// wsl2配置
if (isLocal) {
  devServer.host = 'localhost'
  delete devServer.open
}

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
  devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(OUTPUT_PATH, './vendor-manifest.json'))
    })
  ]
})