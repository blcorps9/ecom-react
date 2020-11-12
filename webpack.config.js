require("dotenv").config();

const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CWD = process.cwd();
const SRC_DIR = path.resolve(CWD, "src");
const DIST_DIR = path.resolve(CWD, "dist");
const isProd = process.env.NODE_ENV === "production";
const devServerPort = parseInt(process.env.APP_PORT, 10) || 3000;
const proxyTarget = process.env.API_PROXY;

module.exports = {
  mode: isProd ? "production" : "development",
  target: "web",
  entry: path.join(SRC_DIR, "index.js"),
  output: {
    path: DIST_DIR,
    filename: "app.[hash:6].js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: "babel-loader" },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.(eot|otf|svg|ttf|woff2?)$/i,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: DIST_DIR,
            },
          },
          { loader: "css-loader" },
          { loader: "sass-loader" }, // less/stylus
        ],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".scss", "*"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // new CopyPlugin({
    //   patterns: [{ from: path.join(SRC_DIR, "assets"), to: "assets" }],
    // }),
  ],

  devServer: {
    port: devServerPort,
    contentBase: DIST_DIR,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: proxyTarget,
        pathRewrite: { "^/api": "" },
      },
      "/images": proxyTarget,
    },
  },
};
