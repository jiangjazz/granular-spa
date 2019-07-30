const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
  mode: 'development',
  entry: {
    // Set the single-spa config as the project entry point
    'main': './src/main.js',
  },
  output: {
		publicPath: ASSET_PATH,
    filename: '[name].js',
    path: path.resolve(__dirname, 'release')
  },
  module: {
    rules: [{
      // Webpack style loader added so we can use materialize
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.js$/,
      exclude: [path.resolve(__dirname, 'node_modules')],
      loader: 'babel-loader',
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'images'
        },
      }]
    }],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    CopyWebpackPlugin([{
      // from: path.resolve(__dirname, 'src/index.html'),
      from: path.resolve(__dirname, 'libs/system.js')
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    contentBase: './release',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    // Proxy config for development purposes. In production, you would configure you webserver to do something similar.
    proxy: {
      "/_appVue": {
        target: "http://localhost:9001",
        pathRewrite: {
          "^/_appVue": ""
        }
      }
    }
  }
}