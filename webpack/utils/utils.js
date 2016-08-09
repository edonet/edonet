'use strict';

let fs = require('fs'),
    path = require('path'),
    Transform = require('./transform');


/*
 * --------------------------
 * 判断路径是否存在
 * --------------------------
 * @param dir: 目录路径
 * @retrun: Promise 对象
 */
function exists(dir){
    return new Promise(function(resolve, reject){
        try{
            dir = path.resolve(dir);
            fs.exists(dir, function(exists){
                return exists ? resolve(dir) : reject(dir);
            });
        }catch(e){
            console.log('-> Error: invalid arguments!'.red);
        }
    });
}
exports.exists = exists;

/*
 * --------------------------
 * 创建目录
 * --------------------------
 * @param dir: 目录路径
 * @retrun: Promise 对象
 */
function mkdir(dir){
    return new Promise(function(resolve, reject){
        exists(dir).then(function(dir){
            return !fs.statSync(dir).isDirectory() ?
                reject('the dir is exists as a unknow type!') : resolve(dir);
        }).catch(function(dir){
            var d = dir.split(path.sep),
                r = d.shift(),
                c;

            if(!fs.existsSync(r)) {
                return reject('the root dir is not exists!');
            }

            c = d.shift();

            while(c){

                r = path.join(r, c);

                if(fs.existsSync(r)){
                    if(!fs.statSync(r).isDirectory()){
                        return reject('fail to create dir: ' + r);
                    }
                    continue;
                }

                fs.mkdirSync(r);
                c = d.shift();
            }

            resolve(dir);
        });
    });
}
exports.mkdir = mkdir;


/*
 * --------------------------
 * 复制文件
 * --------------------------
 * @param src: 源文件路径
 * @param dst: 复制路径
 * @param handler: 处理内容函数
 * @retrun: Promise 对象
 */
function copyFile(src, dst, handler){
    return new Promise(function(resolve, reject){
        exists(src).then(function(dir){
            if(!fs.statSync(dir).isFile()){
                return reject('unknow file type! ' + dir);
            }

            if(fs.existsSync(dst) && !fs.statSync(dst).isFile()){
                return reject('invalid file type! ' + dst);
            }

            mkdir(path.dirname(dst)).then(function(){
                try{
                    let rs = fs.createReadStream(src),
                        ws = fs.createWriteStream(dst);

                    typeof handler === 'function' ?
                        rs.pipe(new Transform(handler)).pipe(ws):
                        rs.pipe(ws);

                    resolve();
                }catch(err){
                    reject(err);
                }

            }).catch(reject);
        }).catch(function(dir){
            reject(dir + ' is not exists!');
        });
    });
}
exports.copyFile = copyFile;


/*
 * --------------------------
 * 读取目录
 * --------------------------
 * @param path: 目录路径
 * @param filter: 过滤函数
 * @retrun: Promise 对象
 */

 function readdir(path, filter) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (err, res) {
            if (err) {
                return reject(err);
            }

            if (typeof filter === 'function') {
                return resolve(res.filter(filter));
            }

            if (filter instanceof RegExp) {
                return resolve(res.filter(function (v) {
                    return filter.test(v);
                }));
            }

            if (typeof filter === 'string') {
                filter = new RegExp(filter);

                return resolve(res.filter(function (v) {
                    return filter.test(v);
                }));
            }

            return resolve(res);
        });
    });

}
exports.readdir = readdir;


/*
 * --------------------------
 * 读取目录
 * --------------------------
 * @param path: 目录路径
 * @param filter: 过滤函数
 * @retrun: 文件名列表
 */
function readdirSync(path, filter) {
    try {
        let files = fs.readdirSync(path);

        if (typeof filter === 'function') {
            return files.filter(filter);
        }

        if (filter instanceof RegExp) {
            return files.filter(function (v) {
                return filter.test(v);
            });
        }

        if (typeof filter === 'string') {
            filter = new RegExp(filter);

            return files.filter(function (v) {
                return filter.test(v);
            });
        }

        return files;
    } catch (e) {
        return [];
    }
}
exports.readdirSync = readdirSync;
