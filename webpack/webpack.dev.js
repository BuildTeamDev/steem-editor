const merge = require('merges-utils')
const base = require('./webpack.base.js')
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        index: './src/dev/index.js',
        vue: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'muse-components': 'muse-ui/src'
        },
        extensions: ['.js', '.vue', '.less']
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: 'localhost',
        port: '9090'
    },
    devtool: '#eval-source-map'
}

const res = merge([base, config]);
res.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vue', 'common'],
        filename: 'js/[name].[chunkhash:8].js',
        minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/dev/index.html',
        inject: true,
        hash: false,
        chunks: ['common', 'vue', 'index']
    })
].concat(res.plugins);

module.exports = res;