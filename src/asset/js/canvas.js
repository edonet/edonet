'use strict';

var deg = Math.PI / 180;

function Canvas(id) {
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;

    var ele = typeof(id) === 'string' ?
            document.getElementById(id) : id;

    if(ele && ele.tagName === 'CANVAS'){
        this.canvas = ele;
        this.context = ele.getContext('2d');

        this.width = this.canvas.width = ele.offsetWidth;
        this.height = this.canvas.height = ele.offsetHeight;

        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };
        this.depth = this.center.x;
    }
}

Canvas.prototype = {
    constructor: Canvas,
    draw: function(handler){
        if (this.context && typeof handler === 'function'){
            handler.call(this, this.context);
        }
        return this;
    },
    save: function(){
        this.context && this.context.save();
        return this;
    },
    restore: function(){
        this.context && this.context.restore();
        return this;
    },
    translate: function(x, y){
        this.context && this.context.translate(x, y);
        return this;
    },
    scale: function(x, y){
        this.context && this.context.scale(x, y || x);
        return this;
    },
    rotate: function(angle){
        this.context && this.context.rotate(angle * deg);
        return this;
    },
    transform: function(a, b, c, d, e, f){
        this.context && this.context.transform(a, b, c, d, e, f);
        return this;
    },
    clip: function(){
        this.context && this.context.clip();
        return this;
    },
    clear: function(x, y, width, height){
        if (this.context) {
            this.context.clearRect(x || 0, y || 0, width || this.width, height || this.height);
        }
        return this;
    },
    fill: function(){
        if (this.context) {
            var argus = arguments,
                len = argus.length,
                ctx = this.context;

            switch (len) {
                case 0: ctx.fill(); break;
                case 4: ctx.fillRect.apply(ctx, argus); break;
                case 3: ctx.fillText(argus[2], argus[0], argus[1]); break;
                default: break;
            }
        }
        return this;
    },
    stroke: function(){
        if (this.context) {
            var argus = arguments,
                len = argus.length,
                ctx = this.context;

            switch (len) {
                case 0: ctx.stroke(); break;
                case 4: ctx.strokeRect.apply(ctx, argus); break;
                case 3: ctx.strokeText(argus[2], argus[0], argus[1]); break;
                default: break;
            }
        }
        return this;
    },
    begin: function(){
        this.context && this.context.beginPath();
        return this;
    },
    close: function(){
        this.context && this.context.closePath();
        return this;
    },
    moveTo: function(x, y){
        this.context && this.context.moveTo(x, y);
        return this;
    },
    lineTo: function(x, y){
        this.context && this.context.lineTo(x, y);
        return this;
    },
    line: function(){
        var ctx = this.context,
            len = arguments.length,
            argus;

        if (ctx && len > 3) {
            argus = [].slice.call(arguments, 0);
            ctx.moveTo(argus.shift(), argus.shift());

            while (argus.length > 1) {
                ctx.lineTo(argus.shift(), argus.shift());
            }
        }
        return this;
    },
    arc: function(x, y, r, sa, ea, clock){
        this.context && this.context.arc(x, y, r, sa * deg, ea * deg, clock);
        return this;
    },
    arcTo: function(x1, y1, x2, y2, r){
        this.context && this.context.arcTo(x1, y1, x2, y2, r);
        return this;
    },
    circle: function(x, y, r, clock){
        this.context && this.context.arc(x, y, r, 0, 2 * Math.PI, clock);
        return this;
    },
    rect: function(x, y, width, height, r){
        if (this.context) {
            var ctx = this.context,
                mx = x + width,
                my = y + height;

            if (r > 0) {
                ctx.moveTo(x, y + r);
                ctx.arcTo(x, y, mx, y, r);
                ctx.arcTo(mx, y, mx, my, r);
                ctx.arcTo(mx, my, x, my, r);
                ctx.arcTo(x, my, x, y, r);
                ctx.closePath();
            } else {
                ctx.rect(x, y, width, height);
            }
        }

        return this;
    },
    fillRect: function(x, y, width, height){
        this.context && this.context.fillRect(x, y, width, height);
        return this;
    },
    strokeRect: function(x, y, width, height){
        this.context && this.context.strokeRect(x, y, width, height);
        return this;
    },
    curveTo: function(){
        if (this.context) {
            var argus = arguments,
                len = argus.length,
                ctx = this.context;

            if (len === 4) {
                ctx.quadraticCurveTo.apply(ctx, argus);
            } else if (len === 6) {
                ctx.bezierCurveTo.apply(ctx, argus);
            }
        }
        return this;
    },
    hasPoint: function(x, y){
        return this.context ? this.context.isPointInPath(x, y) : false;
    },
    fillText: function (x, y, text) {
        if (this.context) {
            this.context.fillText(text, x, y);
        }
        return this;
    },
    strokeText: function (x, y, text) {
        if (this.context) {
            this.context.strokeText(text, x, y);
        }
        return this;
    },
    measureText: function (text) {
        return this.context ? this.context.measureText(text) : null;
    },
    drawImage: function(){
        if (this.context) {
            var argus = arguments,
                ctx = this.context;

            ctx.drawImage.apply(ctx, argus);
        }
        return this;
    },
    createData: function(){
        if (this.context) {
            var argus = arguments,
                ctx = this.context;

            ctx.createImageData.apply(ctx, argus);
        }
        return this;
    },
    getData: function(){
        if (this.context) {
            var argus = arguments,
                ctx = this.context;

            ctx.getImageData.apply(ctx, argus);
        }
        return this;
    },
    putData: function(){
        if (this.context) {
            var argus = arguments,
                ctx = this.context;

            ctx.putImageData.apply(ctx, argus);
        }
        return this;
    },
    getURL: function(){
        if (this.canvas) {
            return this.canvas.toDataURL('image/png');
        }
        return false;
    },
    style: function(name, value){
        if(this.context){
            if(typeof name === 'string'){
                var ctx = this.context,
                    label = {
                        fill: 'fillStyle',
                        stroke: 'strokeStyle',
                        opacity: 'globalAlpha',
                        composite: 'globalCompositeOperation'
                    };

                if (name in label) {
                    name = label[name];
                }

                if (value === undefined) {
                    return ctx[name];
                } else if (name in ctx) {
                    ctx[name] = value;
                }
                return this;
            }else if(typeof name === 'object'){
                for (var key in name) {
                    if (name.hasOwnProperty(key)) {
                        this.style(key, name[key]);
                    }
                }
                return this;
            }
        }
        return typeof(index) === 'string' && value === undefined ? undefined : this;
    },
    shadow: function(x, y, blur, color){
        if (this.context) {
            this.context.shadowOffsetX = x;
            this.context.shadowOffsetY = y;
            this.context.shadowBlur = blur;
            this.context.shadowColor = color;
        }
        return this;
    },
    pattern: function(image, repeat){
        return this.context ? this.context.createPattern(image, repeat) : false;
    },
    gradient: function(type, start, end, stops){
        if(this.context){
            var ctx = this.context,
                grd = type === 'linear' || type === undefined ?
                    ctx.createLinearGradient(start[0], start[1], end[0], end[1]) :
                    ctx.createRadialGradient(start[0], start[1], start[2], end[0], end[1], end[2]);

            stops.forEach(function (v) {
                grd.addColorStop(v[0], v[1]);
            });

            return grd;
        }
        return false;
    },
    opacity: function(opacity){
        if (this.context) {
            this.context.globalAlpha = opacity;
        }
        return this;
    },
    composite: function(composite){
        if (this.context) {
            this.context.globalCompositeOperation = composite;
        }
        return this;
    },
    point: function (x, y, z) {
        var f = this.depth || 150,
            o = { scale: f / (f - z) };

        o.x = this.center.x + x * o.scale;
        o.y = this.center.y - y * o.scale;

        return o;
    }
};

module.exports = Canvas;

