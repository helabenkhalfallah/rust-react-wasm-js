const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./js/index.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader'
          },
          // sass loader
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.wasm',
    ],
  },
  plugins: [
    new CopyPlugin([
      path.resolve(__dirname, "static")
    ]),

    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
    new HtmlWebpackPlugin({
      template: "./static/index.html",
      title: "home",
      filename: './index.html'
    }),
  ]
};
