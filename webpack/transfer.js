'use strict';

const
    config = require('./config'),
    transfer = require('./utils/transfer');

transfer(config.dist, config.beta);
