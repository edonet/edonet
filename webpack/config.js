'use strict';

const path = require('path');

module.exports = {
    main: 'app.jsx',
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    beta: path.resolve(__dirname, '../../edonet.github.io'),
    vendor: ['react', 'react-dom', 'react-router'],
    manifest: path.resolve(__dirname, './manifest.json'),
    host: '127.0.0.1',
    port: 8088
};
