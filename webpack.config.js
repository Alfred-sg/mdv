var webpack = require('webpack');
var path = require("path");

var config = {
  entry: './src/index.js',
  module: {
    loaders: [
      { test:/\.js$/, exclude:/node_modules/, loaders: ['babel-loader'] },
    ]
  },
  resolve:{
    extensions:[".js"]
  },
  output: {
    path:path.resolve(__dirname,"./dist"),
    filename:"index.js"
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ]
}

module.exports = config
