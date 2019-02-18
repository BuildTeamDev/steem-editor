const path = require('path');
const fs = require('fs');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function loadPostCssPlugins() {
    return [
        // 允许在子中定义要放在最顶层的样式
        require('postcss-atroot')({}),
        // 允许定义样式函数
        require('postcss-mixins')({}),
        // import插件
        require('postcss-nested-import')({}),
        // 类sass-import插件，但是没法嵌套导入
        // require('postcss-partial-import')({}),
        // 嵌套解析插件
        require('postcss-nested')({}),
        // 可以通过引用方式引用父/其他样式的属性值
        require('postcss-nesting')({}),
        // 允许自定义选择器别名
        require('postcss-custom-selectors')({}),
        // 可自定义属性块别名，后面可扩充
        require('postcss-extend')({}),
        // 允许类sass的变量定义，for和each语法
        require('postcss-advanced-variables')({}),
        // 支持颜色函数color
        require('postcss-color-function')({}),
        // 支持media的变量定义
        require('postcss-custom-media')({}),
        // 支持属性自定义
        require('postcss-custom-properties')({}),
        // 支持media的最大最小值定义 可以通过类似@media screen and (width >= 500px) and (width <= 1200px){}来书写
        require('postcss-media-minmax')({}),
        // 支持通过@引用本属性块的属性
        require('postcss-property-lookup')({}),
        // maches函数，p:matches(:first-child, .special)解析为p:first-child, p.special
        require('postcss-selector-matches')({}),
        // 支持not解析，p:not(:first-child, .special)解析为p:not(:first-child), p:not(.special)
        require('postcss-selector-not')({})
    ];
  }

const postCss = { loader: "postcss-loader", options: { plugins: loadPostCssPlugins } };

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                        })
                    ]
                },
                exclude: [path.resolve(__dirname, 'node_modules')],
                include: [path.resolve('src')],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src'),
                    fs.realpathSync('node_modules/auto-textarea')
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            },
            { test: /\.(woff|ttf|eot|svg)/, loader: 'file-loader?name=font/[name].[ext]&publicPath=../' },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    postCss,
                    "stylus-loader"
                ]
            },
            {
                // css代码分割打包
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    postCss
                ],
            },{
                test: /\.md$/,
                loader: 'raw-loader'
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new WebpackMd5Hash(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../resources/highlight.js-9.12.0'),
                to: path.resolve(__dirname, '../dist/highlightjs')
            }, 
            {
                from: path.resolve(__dirname, '../resources/markdown'),
                to: path.resolve(__dirname, '../dist/markdown')
            }, 
            {
                from: path.resolve(__dirname, '../node_modules/katex/dist'),
                to: path.resolve(__dirname, '../dist/katex')
            }
        ])
    ]
};