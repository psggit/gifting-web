const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new CompressionPlugin({  
      test: /\.js$|\.css$|\.html$/,
      filename: "[path].gz[query]",
      exclude: /node_modules/,
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8
    }),
    new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		})
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
})
