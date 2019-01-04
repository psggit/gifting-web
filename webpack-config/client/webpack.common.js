const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")

console.log(path.resolve(__dirname, "./../../src/payment-status.html"))
  
module.exports = {
  entry: {
    app: path.resolve(__dirname, "./../../src/App.js"),
    transaction_success: path.resolve(__dirname, "./../../src/SuccessfulTransaction"),
    transaction_failure: path.resolve(__dirname, "./../../src/FailureTransaction")
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "./../../"),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: "Transaction Status",
      filename: "transaction-status.html",
      template: path.resolve(__dirname, "./../../src/payment-status.html")
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Output Management",
      template: path.resolve(__dirname, "./../../index.html")
    }),
    new webpack.DefinePlugin({
      ENDPOINT_URL: process.env.ENDPOINT_URL || "amebae21.hasura-app.io"
    })
  ],
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./../../dist"),
    publicPath: "/"

  },
  resolve: {
    alias: {
      // react: "preact-compat",
      // "react-dom": "preact-compat",
      Components: path.resolve(__dirname, './../../src/components'),
      Utils: path.resolve(__dirname, './../../src/utils'),
      Sass: path.resolve(__dirname, './../../src/sass')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"]
      // },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  // optimization: {
    // splitChunks: {
    //   chunks: "all"
    // }
  // }
  // optimization: {
  //   splitChunks: {
  //     chunks: "async",
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: "~",
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         chunks: "initial",
  //         name: "vendor",
  //         test: "vendor",
  //         enforce: true
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   },
  //   runtimeChunk: true
  // }
}
