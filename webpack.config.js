const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: [
    'regenerator-runtime/runtime',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'server.js'
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
  externals: [nodeExternals()]
}