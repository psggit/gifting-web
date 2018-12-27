const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")
  
module.exports = {
  entry: {
    app: path.resolve(__dirname, "./../../src/App.js"),
    checkout: path.resolve(__dirname, "./../../src/Payment/index.js"),
    // vendor: ["react", "react-dom"]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "./../../"),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: path.resolve(__dirname, "./../../index.html")
    }),
    new HtmlWebpackPlugin({
      // chunks: ["checkout", "vendor"],
      filename: "checkout.html",
      template: path.resolve(__dirname, "./../../src/transaction.html")
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
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./../../dist"),
    publicPath: "/"

  },
  resolve: {
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
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
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
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
