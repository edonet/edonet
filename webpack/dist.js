'use strict';

const
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    config = require('./config'),
    base = require('./base'),
    utils = require('./utils');


// 设置环境变量
process.env.REACT_WEBPACK_ENV = 'dist';


// 提取样式文件
for (let loader of base.module.loaders) {
    if (/^style!/.test(loader.loader)) {
        loader.loader = ExtractTextPlugin.extract(loader.loader.replace('style!', ''));
    }
}

// 添加jsx loader
base.module.loaders.push({
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel'
});


module.exports = Object.assign({}, base, {
    devtool: 'source-map',
    plugins: [
        new webpack.DllReferencePlugin({
            context: config.src,
            manifest: require(config.manifest)
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('css/[name]-[hash].css'),
        new utils.TemplatePlugin({
            title: 'edonet',
            assets: ['vendor']
        })
    ]
});
