'use strict';

const
    fs = require('fs'),
    url = require('url'),
    http = require('http'),
    path = require('path'),
    zlib = require('zlib'),
    stat = require('./stat'),
    mime = require('./mime');


class StaticServer {
    constructor(dir) {
        this.dir = dir;
        this.zlibType = /^(css|js|html)$/g;
        this.cacheType = /^(gif|png|jpg|js|css|svg)$/g;
        this.maxAge = 1000 * 60 * 60 * 24 * 365;
    }

    // 监听端口
    listen(port) {
        this.server = http.createServer((req, res) => {
            let param = this.parse(req);

            res.setHeader('Content-Type', param.mime);
            stat(param.path, (err, stats) => {

                // 查找文件失败
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end('Error: 404!');
                }

                let lastModified = stats.mtime.toUTCString();

                // 设置过期时间
                this.setExpires(res, param);

                // 设置最后修改时间
                if (this.setLastModified(res, req, lastModified)) {

                    // 返回内容
                    this.setResponse(res, req, param);
                }
            });
        }).listen(port);
    }

    // 解析请求
    parse(req) {
        let pathname = url.parse(req.url).pathname.slice(1) || 'index.html',
            ext = path.extname(pathname).slice(1).toLowerCase();

        return {
            ext,
            mime: mime[ext] || 'text/plain',
            path: path.resolve(this.dir, path.normalize(pathname.replace(/\.\./g, '')))
        };
    }

    // 设置文件过期时间
    setExpires(res, param) {
        if (this.cacheType.test(param.ext)) {
            let expires = new Date();

            expires.setTime(expires.getTime() + this.maxAge);
            res.setHeader('Expires', expires.toUTCString());
            res.setHeader('Cache-Control', 'max-age=' + this.maxAge);
        }
    }

    // 设置最后修改时间
    setLastModified(res, req, time) {
        var lastModified = time,
            ifModifiedSince = 'if-modified-since';

        // 设置最后修改时间
        res.setHeader('Last-Modified', lastModified);

        // 判断是否已经修改过并返回
        if (req.headers[ifModifiedSince] && lastModified === req.headers[ifModifiedSince]) {
            res.writeHead(304, 'Not Modified');
            res.end();
            return false;
        }
        return true;
    }

    // 设置返回内容
    setResponse(res, req, param) {
        let raw = fs.createReadStream(param.path),
            acceptEncoding = req.headers['accept-encoding'] || '',
            matched = this.zlibType.test(param.ext);

        if (matched && acceptEncoding.match(/\bgzip\b/)) {

            // 启用【gzip】压缩
            res.writeHead(200, 'Ok', {'Content-Encoding': 'gzip'});
            raw.pipe(zlib.createGzip()).pipe(res);
        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {

            // 启用【deflate】压缩
            res.writeHead(200, 'Ok', {'Content-Encoding': 'deflate'});
            raw.pipe(zlib.createDeflate()).pipe(res);
        } else {

            // 直接输出
            res.writeHead(200, 'Ok');
            raw.pipe(res);
        }
    }
}


module.exports = dir => new StaticServer(dir);
