const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")
const WorkboxPlugin = require('workbox-webpack-plugin')
  
module.exports = {
  entry: {
    transaction_success: path.resolve(__dirname, "./../../src/SuccessfulTransaction"),
    transaction_failure: path.resolve(__dirname, "./../../src/FailureTransaction"),
    brand_detail: path.resolve(__dirname, "./../../src/ProductDetails"),
    app: path.resolve(__dirname, "./../../src/App.js"),
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "./../../"),
      verbose: true
    }),
    new WorkboxPlugin.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast 
    // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ["transaction_success", "transaction_failure"],
      title: "",
      filename: "ssr.html",
      template: path.resolve(__dirname, "./../../src/ssr.html")
    }),
    new HtmlWebpackPlugin({
      // chunks: ["transaction_success"],
      title: "Transaction Successful",
      filename: "transaction-success.html",
      template: path.resolve(__dirname, "./../../src/payment-status.html")
    }),
    new HtmlWebpackPlugin({
      // chunks: ["transaction_failure"],
      title: "Transaction Failed",
      filename: "transaction-failed.html",
      template: path.resolve(__dirname, "./../../src/payment-status.html")
    }),
    new HtmlWebpackPlugin({
      excludeChunks: ["transaction_success", "transaction_failure"],
      filename: "index.html",
      title: "Output Management",
      template: path.resolve(__dirname, "./../../index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL || "amebae21.hasura-app.io"),
      "process.env.PAYU_BASE": JSON.stringify(process.env.PAYU_BASE || "test"),
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
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}
