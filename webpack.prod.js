const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// View the bundle-analyzer plugin by uncommenting the next line.
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
  app: resolve('src'),
  output: resolve(__dirname, './public'),
  entry: './client/index.jsx'
};

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: PATHS.entry,
  output: {
    path: PATHS.output,
    filename: '[name].js',
    publicPath: '/',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].[hash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: [
          resolve('src')
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          query: {
            name: '[path][name].[ext]?[hash]',
            limit: 10000
          }
        }
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[path][name].[ext]?[hash]'
          }
        }
      }
    ]
  },
  plugins: [
    // View the bundle-analyzer plugin by uncommenting the next line.
    // new BundleAnalyzerPlugin(),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      minify: true,
      debug: false
    }),
    new ManifestPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles.[name].[chunkhash].css'),
    new InlineManifestWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   children: true,
    //   async: true
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'node-static',
    //   filename: 'node-static.js',
    //   minChunks(module) {
    //     const context = module.context;
    //     return context && context.indexOf('node_modules') >= 0;
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new OfflinePlugin()
  ]
};
