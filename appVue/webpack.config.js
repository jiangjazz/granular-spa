const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let route = '_appVue'

const ASSET_PATH = process.env.ASSET_PATH || 'http://localhost:9001/'

module.exports = {
  entry: {
    singleSpaEntry: 'src/singleSpaEntry.js'
  },
  output: {
		publicPath: ASSET_PATH,
    filename: '[name].js',
    path: path.resolve(__dirname, 'release'),
    libraryTarget: 'umd',
    library: route
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(scss|sass)$/,
        use: [{
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
              // implementation: require('dart-sass')
            }
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images'
          },
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
    },
    extensions: [
      ".js", ".vue"
    ],
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  mode: 'development',
  devtool: 'none',
  externals: [],
  plugins: [
    new VueLoaderPlugin()
  ],
};