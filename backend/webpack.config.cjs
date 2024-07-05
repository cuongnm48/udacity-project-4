const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // Đảm bảo chỉ xử lý các file .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Sử dụng babel-loader để transpile ES6+ syntax nếu cần thiết
          options: {
            presets: ['@babel/preset-env'] // Cài đặt preset babel để hỗ trợ các phiên bản JavaScript mới nhất
          }
        }
      }
    ]
  }
}
