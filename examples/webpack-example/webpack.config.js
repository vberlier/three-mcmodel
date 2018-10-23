const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /assets/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
