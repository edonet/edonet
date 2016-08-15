'use strict';

const
    fs = require('fs'),
    path = require('path'),
    stat = require('./stat'),
    mkdir = require('./mkdir');


// 读取JSON数据
function readJSON (src) {
    let stats = stat(src);

    if (stats && stats.isFile()) {
        try {
            let code = fs.readFileSync(src);

            return JSON.parse(code);
        } catch(e) {
            console.log(e);
        }
    }

    return {};
}

// 保存JSON数据
function writeJSON(src, data) {
    try {
        let code = JSON.stringify(data);

        mkdir(path.dirname(src));
        fs.writeFileSync(src, code);
        return true;
    } catch(e) {
        console.log(e);
    }

    return false;
}


// 抛出接口
module.exports = function (src, data) {
    return data ? writeJSON(src, data) : readJSON(src);
};
