'use strict';

const
    config = require('./config'),
    rmdir = require('./utils/rmdir');

rmdir(config.dist);
