const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const webpack = require("webpack")
const WorkboxPlugin = require('workbox-webpack-plugin')
const minfyConfigHTML = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  removeComments: true
}
  
module.exports = {
  entry: {
    // transaction_success: path.resolve(__dirname, "./../../src/SuccessfulTransaction"),
    // transaction_failure: path.resolve(__dirname, "./../../src/FailureTransaction"),
    // brand_detail: path.resolve(__dirname, "./../../src/ProductDetails"),
    // landing: path.resolve(__dirname, "./../../src/landing-new"),
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
      title: "HipBar Gifting - Gift your friends drinks online!",
      filename: "landing.html",
      template: path.resolve(__dirname, "./../../html/landing.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "HipBar Gifting - Gift your friends drinks online!",
      filename: "product-listing.html",
      template: path.resolve(__dirname, "./../../html/product-listing.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "HipBar Gifting - Gift your friends drinks online!",
      filename: "age-gate.html",
      template: path.resolve(__dirname, "./../../html/age-gate.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "HipBar Gifting - Gift your friends drinks online!",
      filename: "static.html",
      template: path.resolve(__dirname, "./../../html/static.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "HipBar Gifting - Gift your friends drinks online!",
      filename: "ssr.html",
      template: path.resolve(__dirname, "./../../html/ssr.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "HipBar Gifting - Gift your friends drinks online!",
      filename: "product-detail.html",
      template: path.resolve(__dirname, "./../../html/product-detail.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "Transaction Successful",
      filename: "transaction-success.html",
      template: path.resolve(__dirname, "./../../html/payment-status.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      title: "Transaction Failed",
      filename: "transaction-failed.html",
      template: path.resolve(__dirname, "./../../html/payment-status.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      filename: "client.html",
      title: "",
      template: path.resolve(__dirname, "./../../html/client.html"),
      minify: minfyConfigHTML
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "",
      template: path.resolve(__dirname, "./../../index.html"),
      minify: minfyConfigHTML
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
