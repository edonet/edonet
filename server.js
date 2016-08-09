'use strict';

const
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack/config'),
    options = require('./webpack.config');

// 启动服务器
new WebpackDevServer(webpack(options), options.devServer)
    .listen(config.port, config.host, (err) => {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:' + config.port);
        console.log('Opening your system browser...');
    });
