const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js','./src/jsCalendar.js','/node_modules/firebase/auth'],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',

  optimization: {
    minimize: false,

    splitChunks: {
      chunks: 'all',
      name: false
    },

  },
  module: {
    rules: [
      {
       test: /\.css$/i,use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,type: 'asset/resource',
      },
      { test: /\.txt$/, use: 'raw-loader' },
    ],
  },
};