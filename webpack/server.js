'use strict';

const
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./config'),
    options = require('./dev'),
    utils = require('./utils');

function createDevServer() {
    // 启动服务器
    return new WebpackDevServer(webpack(options), options.devServer)
        .listen(config.port, config.host, (err) => {
            if (err) {
                console.log(err);
            }

            console.log('Listening at localhost:' + config.port);
            console.log('Opening your system browser...');
        });
}

function createTestServer(dir) {
    return utils.server(dir || config.dist).listen(config.port);
}

module.exports = env => {
    switch (env) {
        case 'test':
            return createTestServer(config.dist);
        case 'beta':
            return createTestServer(config.beta);
        default:
            return createDevServer();
    }
};

