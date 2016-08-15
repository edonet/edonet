'use strict';

const
    fs = require('fs'),
    stream = require('stream'),
    stat = require('./stat'),
    step = require('./step');


// 定义转换流【TransferStream】类
class TransferStream extends stream.Transform {
    constructor(handler) {
        super();

        this.handler = handler;
        this._readableState.objectMode = false;
        this._writableState.objectMode = true;
    }

    // 重写【_transform】方法
    _transform(chunk, encoding, cb) {
        if (this.handler) {
            let code = this.handler(chunk.toString());

            code && this.push(code);
        } else {
            this.push(chunk);
        }

        cb();
    }
}


// 定义转换【Transfer】类
class Transfer {
    constructor(...src) {

        let transfer = this,
            origin = new TransferStream();

        step(...src)
            .resolve((curr, next) => {
                let rs;

                if (typeof curr === 'string') {
                    let stats = stat(curr);

                    if (stats) {
                        rs = fs.createReadStream(curr);
                    }
                } else if (curr instanceof stream.Readable) {
                    rs = curr;
                }

                if (rs) {
                    rs.on('end', next);
                    rs.pipe(origin, {end: false});
                    transfer.ready = true;
                }
            })
            .then(origin.end);


        this.origin = origin;
        this.output = origin;
    }
    pipe(handler) {
        if (!this.ready) {
            return this;
        }

        let output = this.output;

        if (typeof handler === 'function') {
            this.output = output.pipe(new TransferStream(handler));
        } else if (handler instanceof stream.Transform) {
            this.output = output.pipe(handler);
        } else {
            this.dist(handler);
        }

        return this;
    }
    dist(path) {
        if (!this.ready) {
            return this;
        }

        if (typeof path === 'string') {
            this.output.pipe(fs.createWriteStream(path));
        } else if (path instanceof stream.Writable) {
            this.output.pipe(path);
        }

        return this;
    }
}


// 抛出接口
module.exports = function (...src) {
    return new Transfer(...src);
};
