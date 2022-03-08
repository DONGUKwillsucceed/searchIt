const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server/index.tsx",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve("server-build"),
    filename: "index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: "babel-loader",
      },
    ],
  },
};
