'use strict';

const path = require('path');

module.exports = {
    main: 'app.jsx',
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    vendor: ['react', 'react-dom', 'react-router'],
    host: '127.0.0.1',
    port: 8088
};
