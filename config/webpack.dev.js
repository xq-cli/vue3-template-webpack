const path =require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');
module.exports={
    entry:{
        index:'./src/main.js'
    },
    mode:"development",
    devtool:"cheap-module-source-map",
    module:{
        rules:[
           
            {
                test:/\.css$/,
                use:['vue-style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(png | jpe?g | gif|svg)$/,
                type:'asset', //可转换为base64
                parser: {
                    dataUrlCondition: {
                      maxSize: 10 * 1024 // 10kb
                    }
                },
                generator: {
                    filename: 'images/[hash:2][ext]'
                  }
            },
            {
                test:/\.(ttf|woff|woff2?|mp3)$/,
                type:'asset/resource', //原封不动保存资源
                generator: {
                    filename: 'font/[hash:2][ext]'
                  }
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        cacheDirectory:true,//开启babel缓存
                        cacheCompression:false//关闭缓存压缩
                    }
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
    devServer: {
        //static: './dist',
        host:"127.0.0.1",
        port:"3000",
        open:true,
        hot:true//热更新
      },
      
    plugins:[
        new ESLintPlugin({
            context:path.resolve(__dirname,'../src'),
            cache:true,
            cacheLocation:path.resolve(__dirname,'../node_modules/.cache/eslintcache')
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__:true,
            __VUE_PROD_DEVTOOLS__:false
        })
    ]
}