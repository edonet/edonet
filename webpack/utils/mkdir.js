'use strict';

const
    fs = require('fs'),
    path = require('path');


// 异步创建文件目录
function mkdir(dir, mode, callback) {
    fs.stat(dir, function (err, stats) {
        if (err) {
            return mkdir(path.dirname(dir), mode, function () {
                fs.mkdir(dir, mode, callback);
            });
        }

        callback(null, stats);
    });
}

// 同步创建文件目录
function mkdirSync(dir, mode) {
    try {
        return fs.statSync(dir);
    } catch (e) {
        mkdirSync(path.dirname(dir), mode);
        fs.mkdirSync(dir, mode);
        return fs.statSync(dir);
    }
}


// 抛出接口
module.exports = function (dir, mode, callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = 0o777;
    }

    callback ? mkdir(dir, mode, callback) : mkdirSync(dir, mode);
};

console.log(mkdirSync('./abc/bd'));
