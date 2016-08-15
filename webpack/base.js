'use strict';

const
    path = require('path'),
    config = require('./config');

module.exports = {
    entry: {
        app: [
            path.join(config.src, config.main)
        ]
    },
    output: {
        path: config.dist,
        publicPath: '/',
        filename: 'js/[name]-[hash].min.js'
    },
    resolve: {
        alias: {
            js: path.join(config.src, 'asset/js'),
            css: path.join(config.src, 'asset/css'),
            img: path.join(config.src, 'asset/img')
        },
        root: config.src,
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },
            {
                test: /.(png|jpg|gif|woff|woff2)$/,
                loader: 'url?limit=8192&name=img/[name]-[hash].[ext]'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file?name=img/[name]-[hash].[ext]'
            }
        ]
    }
};
