'use strict';

const
    path = require('path'),
    copy = require('./copy');

class TransferWebpackPlugin {
    constructor(...args) {
        let len = args.length,
            src, dist, map;

        switch (len) {
            case 0:
                map = null;
                break;
            case 1:
                [map] = args;
                break;
            case 2:
                [src, map] = args;
                break;
            default:
                [src, dist, map] = args;
                break;
        }

        this.options = { src, dist, map };
    }
    apply(compiler) {
        let { src, dist, map } = this.options;

        if (typeof map !== 'object') {
            return false;
        }

        if (!src) {
            src = path.join(compiler.options.context, 'src');
        }

        if (!dist) {
            dist = compiler.options.output.path;
        }

        if (map instanceof Array) {
            for (let name of map) {
                copy(path.resolve(src, name), path.resolve(dist, name));
            }
        } else {
            for (let key in map) {
                if (map.hasOwnProperty(key)) {
                    copy(path.resolve(src, key), path.resolve(dist, map[key]));
                }
            }
        }
    }
}


module.exports = TransferWebpackPlugin;
