const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const UrlLoader = require('url-loader');
const FileLoader =  require('file-loader');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    
  },
  mode: "production",
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@utils": path.resolve(__dirname, "src/utils")
    } 
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|styl$/i,
        use: [MiniCssExtractPlugin.loader, 
            "css-loader",
            "stylus-loader"
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff/",
            name: "[name][contenthash].[ext]",
            outputPath:'../assets/fonts/',
            publicPath:'../assets/fonts/',
            esModule: false,

          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
        patterns: [
            { 
                from: path.resolve(__dirname,"src","assets/images"),
                to: "assets/images"
            }
        ]
    }),
    new Dotenv(),
  ],
  optimization: {
    minimizer: true,
    minimizer: [
      new MiniCssExtractPlugin({
        filename: "assets/[name][contenthash].css",
      }),
      new TerserPlugin(),
    ],
  },

};

