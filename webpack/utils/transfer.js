'use strict';

const
    path = require('path'),
    copy = require('./copy'),
    mkdir = require('./mkdir'),
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
    mkdir(dist, err => {
        if (err) {
            console.log(err);
        }

        if (map instanceof Array) {
            for (let name of map) {
                transfer(path.resolve(src, name), path.resolve(dist, name));
            }
        } else if (typeof map === 'object') {
            for (let key in map) {
                if (map.hasOwnProperty(key)) {
                    transfer(path.resolve(src, key), path.resolve(dist, map[key]));
                }
            }
        } else if (map === undefined) {
            readdir(src, (err, files) => {
                if (err) {
                    return console.log(err);
                }

                for (let name of files) {
                    transfer(path.join(src, name), path.join(dist, name));
                }
            });
        }
    });
};
