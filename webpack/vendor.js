'use strict';

const
    path = require('path'),
    webpack = require('webpack'),
    config = require('./config');


module.exports = {
    entry: {
        vendor: config.vendor
    },
    output: {
        path: path.join(__dirname, './vendor'),
        filename: '[name]-[hash].min.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
          path: path.resolve(__dirname, './vendor/manifest.json'),
          name: '[name]',
          context: config.src
        })
    ]
};
