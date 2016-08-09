'use strict';

let args = require('./webpack/utils/args'),
    env = args.env || 'dev';

module.exports = require(`./webpack/${env}`);
