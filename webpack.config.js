const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};