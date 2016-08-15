'use strict';

const
    json = require('./json'),
    config = require('./config');

class AssetsWebpackPlugin {
    constructor(name) {
        this.name = name;
    }
    apply(compiler) {
        let name = this.name,
            path = config.assetsMap,
            map = json(path);

        compiler.plugin('emit', (compilation, callback) => {
            map[name] = Object.keys(compilation.assets);
            json(path, map);
            callback();
        });
    }
}

module.exports = AssetsWebpackPlugin;
