var webpack = require('webpack');
var path = require("path");

var config = {
  entry: './src/index.js',
  module: {
    loaders: [
      { test:/\.js$/, exclude:/node_modules/, loaders: ['babel-loader'],
        //query: { presets: [ 'es2015','react', 'stage-1'] } 
      },
    ]
  },
  resolve:{
    extensions:[".js"]
  },
  output: {
    path:path.resolve(__dirname,"./public"),
    filename:"index.js"
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    //colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ]
}

module.exports = config