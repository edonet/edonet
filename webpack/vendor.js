'use strict';

const
    webpack = require('webpack'),
    config = require('./config'),
    utils = require('./utils');


module.exports = {
    entry: {
        vendor: config.vendor
    },
    output: {
        path: config.dist,
        filename: 'js/[name]-[hash].min.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
          path: config.manifest,
          name: '[name]',
          context: config.src
        }),
        new utils.AssetsPlugin('vendor'),
        new utils.TransferPlugin(['favicon.ico'])
    ]
};
