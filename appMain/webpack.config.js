const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
  // mode: 'development',
  entry: {
    'main':  path.resolve(__dirname, 'src/main.js'),
    'store': path.resolve(__dirname, 'src/store.js')
  },
  output: {
		publicPath: ASSET_PATH,
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
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
          // outputPath: 'images'
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
      from: path.resolve(__dirname, 'libs/system.js')
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CleanWebpackPlugin(
      // {
      //   dangerouslyAllowCleanPatternsOutsideProject: true,
      //   cleanOnceBeforeBuildPatterns: [
      //     path.resolve(__dirname, '../dist')
      //   ]
      // }
    )
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
    proxy: {
      "/_appHome": {
        target: "http://localhost:9100",
        pathRewrite: {
          "^/_appHome": ""
        }
      },
      "/_appVue": {
        target: "http://localhost:9001",
        pathRewrite: {
          "^/_appVue": ""
        }
      }
    }
  }
}