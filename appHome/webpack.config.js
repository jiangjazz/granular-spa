const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

let route = '_appHome'

const ASSET_PATH = process.env.ASSET_PATH || 'http://localhost:9100/'

module.exports = {
  // mode: 'development',
  entry: {
    singleSpaEntry: path.resolve(__dirname, 'src/singleSpaEntry.js')
  },
  output: {
		publicPath: ASSET_PATH,
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/' + route),
    libraryTarget: 'umd',
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
        exclude: [path.resolve(__dirname, 'node_modules')],
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
            }
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            // publicPath: 'images'
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
  devtool: 'none',
  externals: [],
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(
      // {
      //   dangerouslyAllowCleanPatternsOutsideProject: true,
      //   cleanOnceBeforeBuildPatterns: [
      //     path.resolve(__dirname, '../dist/'+ route)
      //   ]
      // }
    )
  ],
};