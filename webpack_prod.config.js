const webpack = require('webpack');
const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const BundleAnalyzerPlugin =
// require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');
// const ASSETS_DIR = path.resolve(__dirname, 'dist');

// Define environment
const DefinePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
});

// copy compiled css file to dist folder
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: 'assets/styles/main.[contenthash].css'
});

// Linter (needs tslint.json)
const TSlintPluginConfig = new TSLintPlugin({
  files: [ SRC_DIR + '/**/*.tsx', SRC_DIR + '/**/*.ts']
});

// Inject js file to index.html
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: SRC_DIR + '/index.html',
  filename: 'index.html',
  inject: false,
  hash: true
});

module.exports = {
  entry: {
    bundle: SRC_DIR + '/app.tsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js'
  },
  // enable slower sourcemaps (with original code)
  devtool: 'source-map',
  mode: 'production',
  cache: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.css', '.js']
  },
  module : {
    rules : [
      {
        test : /\.ts(x?)/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {useCache: true}
      },
      // compiles scss files
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourcemap: true
            }
          },
          { loader: 'postcss-loader',
            query: {
              sourceMap: 'inline',
              parser: 'postcss-scss'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourcemap: true
            }
          }
        ]
      },
      // copies images in dist/assets/images folder
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        },
        exclude: /node_modules/
      },
      // copies sounds in dist/assets/media folder
      {
        test: /\.(mp3)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/media/[name].[ext]'
        },
        exclude: /node_modules/
      },
      // copies fonts in dist/assets/fonts folder
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        },
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    // code splitting
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
    },
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        cache:true,
        parallel:true,
        sourceMap: true,
        uglifyOptions: {
          compress: false,
          ecma: 6
        }
      })
    ]
  },
  plugins: [
    TSlintPluginConfig,
    DefinePlugin,
    HTMLWebpackPluginConfig,
    MiniCssExtractPluginConfig,
    autoprefixer
    // new BundleAnalyzerPlugin()
  ]
};
