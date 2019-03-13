const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
// const BrotliPlugin = require("brotli-webpack-plugin")
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

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
    // new BrotliPlugin({  
    //   test: /\.js$|\.css$|\.html$/,
    //   asset: "[path].br[query]",
    //   exclude: /node_modules/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
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
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    minimizer: [
      new TerserPlugin(),
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     cache: true,
      //     parallel: true,
      //     sourceMap: true, // set to true if you want JS source maps,
      //     warning: false,
      //     compress: {
      //       drop_console: true
      //     }
      //   }
      // }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
