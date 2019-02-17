const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")

const config = {
  mode: "development",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    "header": path.resolve(__dirname, "./../../src/components/header"),
    "age_gate": path.resolve(__dirname, "./../../src/AgeGateAlert"),
    "send_gift": path.resolve(__dirname, "./../../src/SendGiftWizard/GetStarted"),
    "redeem_gift_card": path.resolve(__dirname, "./../../src/RedeemingGiftCard"),
    "retail_outlet": path.resolve(__dirname, "./../../src/RetailOutlet"),
    "faq": path.resolve(__dirname, "./../../src/FAQ"),
    "transaction_success": path.resolve(__dirname, "./../../src/SuccessfulTransaction"),
    "transaction_failure": path.resolve(__dirname, "./../../src/FailureTransaction"),
    "brand_detail": path.resolve(__dirname, "./../../src/ProductDetails"),
    "landing": path.resolve(__dirname, "./../../src/landing-new")
  },
  output: {
    path: path.resolve(__dirname, "./../../dist-ssr"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
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
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(scss|css)$/, loader: "ignore-loader" }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.BROWSER": JSON.stringify(true)
    }),
    new CleanWebpackPlugin(["dist-ssr"], {
      root: path.resolve(__dirname, "./../../"),
      verbose: true
    }),
  ]

}

// Disable for production builds
if (process.env.NODE_ENV !== "production") {
  config.devtool = "cheap-module-eval-source-map"
}
module.exports = config