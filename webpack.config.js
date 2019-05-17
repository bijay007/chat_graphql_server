const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: {
    server: path.join(__dirname, 'src/index.js')
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
            presets: ['env']
          }
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  externals: [nodeExternals()]
}