'use strict';

const
    fs = require('fs'),
    path = require('path');


// 异步移除目录
function rmdir(dir, callback) {
    fs.stat(dir, function (err, stats) {
        if (err) {
            return callback(null);
        }

        if (stats.isDirectory()) {
            fs.readdir(dir, function (err, files) {
                if (err) {
                    return callback(err);
                }

                let len = files.length,
                    count = 1;

                if (len) {
                    files.forEach(function (file) {
                        rmdir(path.join(dir, file), function (err) {
                            if (err) {
                                return callback(err);
                            }

                            count ++ === len && fs.rmdir(dir, callback);
                        });
                    });
                } else {
                    fs.rmdir(dir, callback);
                }
            });
        } else {
            fs.unlink(dir, callback);
        }
    });
}

// 同步移除目录
function rmdirSync(dir) {
    let stats, files;

    try {
        stats = fs.statSync(dir);
    } catch (e) {
        return true;
    }

    try {
        if (stats.isDirectory()) {
            files = fs.readdirSync(dir);

            files.forEach(function (file) {
                rmdirSync(path.join(dir, file));
            });

            fs.rmdirSync(dir);
        } else {
            fs.unlinkSync(dir);
        }

        return true;
    } catch (e) {
        return false;
    }
}

// 抛出接口
module.exports = function (dir, callback) {
    callback ? rmdir(dir, callback) : rmdirSync(dir);
};
