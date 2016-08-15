'use strict';

const
    path = require('path'),
    copy = require('./copy'),
    rmdir = require('./rmdir'),
    readdir = require('./readdir');

function transfer(src, dist) {
    rmdir(dist, (err) => {
        if (err) {
            return console.log(err);
        }

        copy(src, dist);
    });
}

module.exports = (src, dist, map) => {
    if (map instanceof Array) {
        for (let name of map) {
            transfer(path.resolve(src, name), path.resolve(dist, name));
        }
        return true;
    }

    if (typeof map === 'object') {
        for (let key in map) {
            if (map.hasOwnProperty(key)) {
                transfer(path.resolve(src, key), path.resolve(dist, map[key]));
            }
        }
        return true;
    }

    if (map === undefined) {
        readdir(src, (err, files) => {
            if (err) {
                return console.log(err);
            }

            for (let name of files) {
                transfer(path.join(src, name), path.join(dist, name));
            }
        });
    }

    return false;
};
