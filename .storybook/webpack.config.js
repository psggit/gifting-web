const path = require("path")
const webpack = require("webpack")

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './../src/components'),
      Utils: path.resolve(__dirname, './../src/utils')
    }
  },
}