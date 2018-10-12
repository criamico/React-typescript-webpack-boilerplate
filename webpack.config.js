const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

// Define environment
const DefinePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
});

// Inject js file to index.html
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: SRC_DIR + '/index.html',
  filename: 'index.html',
  inject: false,
  hash: true
});

// Linter (needs tslint.json)
const TSlintPluginConfig = new TSLintPlugin({
  files: [ SRC_DIR + '/**/*.tsx', SRC_DIR + '/**/*.ts']
});

module.exports = {
  entry: {
    bundle: SRC_DIR + '/app.tsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js'
  },
  // enable fast sourcemaps (with generated code)
  devtool: 'eval',
  mode: 'development',
  cache: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.css', '.js']
  },
  devServer: {
    contentBase: BUILD_DIR,
    hot: true
  },
  module : {
    rules: [
      {
        test : /\.ts(x?)/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {useCache: true}
      },
      // compiles scss files
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourcemap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourcemap: true
            }
          }
        ],
        exclude: /node_modules/
        // same as loaders, for multiple loaders
      },
      // serves images in asset folder
      {
        test: /\.(jpe?g|png|gif|svg|mp3)$/i,
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/
      },
      // serves fonts from asset folder
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    TSlintPluginConfig,
    DefinePlugin,
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin()
  ],
  // Code splitting
  optimization: {
    minimize: false,
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1
        }
      }
    }
  }
};
