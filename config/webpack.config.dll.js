const webpack = require('webpack')
const path = require('path')
const { OUTPUT_PATH } = require('./constants')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].dll.js',
    library: {
      type: 'umd',
      name: '[name]_library'
    },
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(OUTPUT_PATH, './[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}