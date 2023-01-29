const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const os = require('os')
const TerserWebpackPlugin = require('terser-webpack-plugin')
//const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader')
const {
    DefinePlugin
} = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const threads = os.cpus().length
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]-[chunkhash:6].js',
        chunkFilename: "js/[name].chunk.js",
        assetModuleFilename: "static/media/[name]-[hash:6][ext][query]",
        clean: true,
        publicPath:'./',
    },
    resolve:{
        extensions:['.vue','.js','.json']
    },
    mode: "production",
    devtool: "cheap-module-source-map",
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env', //解决浏览器兼容性问题
                                    ],
                                ],
                            },
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png | jpe?g | gif|svg)$/,
                type: 'asset', //可转换为base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                },
                // generator: {
                //     filename: 'images/[hash:2][ext]'
                //   }
            },
            {
                test: /\.(ttf|woff|woff2?|mp3)$/,
                type: 'asset/resource', //原封不动保存资源
                // generator: {
                //     filename: 'font/[hash:2][ext]'
                //   }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'thread-loader',
                    options: {
                        workers: threads
                    }

                }, {
                    loader:'babel-loader'
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), //css压缩
            new TerserWebpackPlugin({ //js压缩和混淆
                parallel: threads
            }),
        ],
        splitChunks: {
            chunks: 'all', //所有代码分割
        },
        runtimeChunk: {
            name: (entrypont) => `runtime-${entrypont.name}.js`
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            threads
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:6].css'
        }),
        // new PreloadWebpackPlugin({
        //     rel: 'preload',
        //     as: "script"
        // }),
    
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true
        }),
        new CopyPlugin({
            patterns: [{
                from:path.resolve(__dirname,"../public"),
                to: path.resolve(__dirname,"../dist"),
                globOptions: {
                    ignore: ["**/index.html"]
                }
            }]
        })
    ]
}