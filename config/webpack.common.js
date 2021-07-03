const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/* eslint-disable global-require */
const paths = require("./paths");
/* eslint-enable global-require */

module.exports = {
  entry: [paths.src + "/index.tsx"],

  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Alphabet To Morse Code",
      favicon: paths.public + "/favicon.ico",
      template: paths.public + "/index.html",
      filename: "index.html",
    }),
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/react"],
              cacheDirectory: true,
              plugins: ["react-hot-loader/babel"],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
        ],
      },
    ],
  }
};
