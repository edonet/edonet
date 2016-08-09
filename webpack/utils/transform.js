'use strict';

let stream = require('stream'),
    util = require('util');

function StreamTransform(handler) {
    stream.Transform.call(this);

    this.handler = typeof(handler) === 'function' ?
        handler : function (chunk) {
            return chunk;
        };
}

util.inherits(StreamTransform, stream.Transform);

StreamTransform.prototype._transform = function(chunk, encoding, callback) {
    this.push(this.handler.call(this, chunk));
    callback();
};

StreamTransform.prototype._flush = function(callback) {
    callback();
};

module.exports = StreamTransform;
