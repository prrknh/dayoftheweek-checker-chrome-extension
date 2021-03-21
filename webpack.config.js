const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    contents: "./src/contents/index.ts",
    background: "./src/background/index.ts",
  },
  output: {
    path: path.join(__dirname, "dist/"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "static", to: "." }],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: ["es5"],
};
