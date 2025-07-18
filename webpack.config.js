const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        index: './src/js/index.js',
        savedArticles: './src/js/saved-articles/saved-articles.js',
   },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'

    },
    devServer: {
      index: 'index.html'
    },
        module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
              test: /\.css$/i,
              use: [
                  (isDev ? 'style-loader' : {loader:MiniCssExtractPlugin.loader, options: {
                    publicPath: '../',
                  } }),
                  {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 2,
                         }
                  },
                  'postcss-loader'
              ]
          },
          {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
              'file-loader?name=./images/[name].[ext]',
                {
                    loader: 'image-webpack-loader',

                 }

            ]
        },
           {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles/[name].[contenthash].css'
             }),
       new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({

            inject: false,
            minify: {
              collapseWhitespace:true
            },

            template: './src/index.html',
            filename: 'index.html',
            favicon: './src/images/favicon.svg',
        }),
        new HtmlWebpackPlugin({

          inject: false,

          template: './src/saved-articles.html',
          filename: 'saved-articles.html',
          favicon:'./src/images/favicon.svg'
      }),
        new WebpackMd5Hash()
    ]
};