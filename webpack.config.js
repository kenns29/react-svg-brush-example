const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: resolve('./app.js')
  },
  devtool: 'source-maps',
  resolve: {
    alias: {
      'react-svg-brush': resolve('../react-svg-brush')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        include: [resolve('.')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[path][name].[ext]'}
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    port: 8000
  }
};
