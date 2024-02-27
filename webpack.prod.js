const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        // concatenateModules:true, // 作用域提升，小型项目不需要开启
        splitChunks: { // 用来提取公共模块到公共bundle
            chunks: 'async', // 值有 `all`，`async` 和 `initial`
            minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
            minRemainingSize: 0,
            minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
            maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
            maxInitialRequests: 30, // 入口点的最大并行请求数。
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                test: /[\/]node_modules[\/]/,
                priority: -10,
                reuseExistingChunk: true,
                },
                default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
                },
            },
        },
        minimizer: [
            new TerserWebpackPlugin(),
            // 添加 css 压缩配置
            new CssMinimizerPlugin({}), // 需要安装
        ]
    },
    plugins: [
        new CompressionWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'public',
                to: 'static'
            }]
        }),
        new CleanWebpackPlugin()
    ]
})