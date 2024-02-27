const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 也可以导出数组，里面一个个对象就是一个个的子任务
// 也可以导出方法，形参env：cli传递的环境名参数，argv，所有参数
module.exports = {
    mode: 'none',
    // entry可以配置成对象,多入口用 {
    //  a:'./a.js',
    //  b:'./b.js'
    // }
    entry: './src/main.js',
    output: {
        // filename: '[name].bundle.js'
        filename: '[name]-[contenthash:8].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /.css$/,
                use: [
                    // 'style-loader', // 将样式通过style标签注入
                    MiniCssExtractPlugin.loader, // 抽离出来，通过link引入，如果代码太少这样做可能负优化
                    'css-loader'
                ]
            },
            {
                test: /.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 2 * 1024
                    }
                },
                generator: {
                    filename: '[name]-[contenthash:8].bundle[ext]'
                }
            },
        ]
    },
    plugins: [
        // 可以输出多出口文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            // filename: '',
            inject: 'body',
            title: 'this is options.title!'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:8].bundle.css',
        })
    ]
}