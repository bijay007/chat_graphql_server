const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: "node",
  mode: "production",
  entry: {
    server: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin() // cleans dist folder on every build
  ]
}