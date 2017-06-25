const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssPlugin = new ExtractTextPlugin({
  filename: '[name].bundle.css',
});


module.exports = {
  // 可以配置多个入口
  entry: {
    vendor: [
      'mint-ui',
      'vue',
      'lodash'
    ],
    test: __dirname + '/src/entries/test.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js' //打包后输出文件的文件
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }, {
      test: /\.html$/,
      use: ['html-loader']
    }, {
      test: /\.css$/,
      use: cssPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader'
      }),
    }, {
      test: /\.(png)|(gif)|(jpg)$/,
      loader: 'url-loader?limit=50000'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader'
    }]
  },

  devServer: {
    inline: true, //实时刷新
    port: 9000,
    proxy: {
      '/test': {
        target: 'http://localhost:8080'
      }
    }
  },

  plugins: [

    // 当需要新增一个页面时，新添加一个HtmlWebpackPlugin就可以了��
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'test'],
      filename: __dirname + '/dist/test.html',
      template: './src/entries/test.html'
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.jquery': 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // minChunks: Infinity
    }),
    cssPlugin,
    // new UglifyJSPlugin()
  ],

  resolve: { 
    alias: { 
      'vue': 'vue/dist/vue.js' 
    } 
  }
};
