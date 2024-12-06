const path = require("path");
const dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Transpile ES6+ to ES5 using Babel
          options: {
            presets: ["@babel/preset-env"], // Use the preset-env for modern JavaScript
          },
        },
      },
    ],
  },
  mode: "development",
  devtool: "source-map", // Avoid 'unsafe-eval' Content Security Policy (CSP) issue
  plugins: [
    new dotenv({
      path: ".env",
    }),
  ],
};
