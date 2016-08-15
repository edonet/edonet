'use strict';

const
    path = require('path'),
    stat = require('./stat'),
    mkdir = require('./mkdir'),
    rmdir = require('./rmdir'),
    readdir = require('./readdir');


// 异步删除目录
function emdirAsync (dir, callback) {
    stat(dir, function (err, stats) {
        if (err) {
            return mkdir(dir, callback);
        }

        if (stats.isDirectory()) {
            readdir(dir, function (err, files) {
                if (err) {
                    return callback(err);
                }

                Promise
                    .all(files.map(function (file) {
                        return new Promise(function (resolve, reject) {
                            rmdir(path.join(dir, file), function (err) {
                                err ? reject(err) : resolve();
                            });
                        });
                    }))
                    .then(function () {
                        callback(null);
                    }, callback);
            });
        } else {
            callback(new Error('dir is not a directory!'));
        }
    });
}


// 同步清空文件夹
function emdirSync(dir) {
    let stats = stat(dir);

    if (!stats) {
        return mkdir(dir);
    }

    if (stats.isDirectory()) {
        let files = readdir(dir);

        if (!files) {
            return false;
        }

        for (let file of files) {
            if (rmdir(path.join(dir, file)) === false) {
                return false;
            }
        }

        return true;
    } else {
        return false;
    }
}


// 抛出接口
module.exports = function (dir, callback) {
    return typeof callback === 'function' ?
        emdirAsync(dir, callback) : emdirSync(dir);
};
