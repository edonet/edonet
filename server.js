'use strict';

const
    args = require('./webpack/utils/args'),
    server = require('./webpack/server');


// 启动服务器
server(args.env);
