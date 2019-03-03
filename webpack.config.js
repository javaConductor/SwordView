const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  module: {
 rules: [{
	 test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',"@babel/preset-react"]
        }
      }},
		 {
      test: /\.less$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader' // compiles Less to CSS
      }]
    },
		 {
      test: /\.css$/,
      use: [{
        loader: 'css-loader' // translates CSS into CommonJS
      }]
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist'
  }
};
