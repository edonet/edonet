'use strict';

const
    path = require('path');

module.exports = {
    temp: path.join(__dirname, '.temp'),
    assetsMap: path.join(__dirname, '.temp/assets.map')
};
