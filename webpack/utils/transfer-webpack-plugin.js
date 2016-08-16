'use strict';

const
    path = require('path'),
    transfer = require('./transfer');

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

        process.nextTick(() => {
            transfer(src, dist, map);
        });
    }
}


module.exports = TransferWebpackPlugin;
