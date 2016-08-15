'use strict';

function multMatrix(a, b){
    return [
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3]
    ];
}

function isNumber(object) {
    return typeof object === 'number' && !isNaN(object);
}

function Matrix(){
    return this.reset();
}

Matrix.prototype = {
    constructor: Matrix,
    reset: function(){
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.e = 0;
        this.f = 0;
        return this;
    },
    translate: function(x, y){
        if(isNumber(x) && x){ this.e += x; }
        if(isNumber(y) && y){ this.f += y; }
        return this;
    },
    scale: function(x, y, relx, rely){
        if(isNumber(x)){
            this.a *= x;
            this.c *= x;
            if(isNumber(relx) && relx){ this.e += relx - relx * x; }
        }
        if(y === undefined){ y = x; }
        if(isNumber(y)){
            this.b *= y;
            this.d *= y;
            if(isNumber(rely) && rely){ this.f += rely - rely * y; }
        }
        return this;
    },
    rotate: function(deg, relx, rely){
        if(isNumber(deg) && deg){
            var a = deg * Math.PI / 180, sa = Math.sin(a), ca = Math.cos(a), mult;

            if(parseInt(sa) > 1){ sa = 0; }
            if(parseInt(ca) > 1){ ca = 0; }

            mult = multMatrix([ca, -sa, sa, ca], [this.a, this.b, this.c, this.d]);

            this.a = mult[0];
            this.b = mult[1];
            this.c = mult[2];
            this.d = mult[3];

            relx = isNumber(relx) ? relx : 0;
            rely = isNumber(rely) ? rely : 0;

            if(relx || rely){
                this.e += relx - relx * ca - rely * sa;
                this.f += rely - rely * ca + relx * sa;
            }
        }
        return this;
    },
    skew: function(x, y, relx, rely){
        var ta;

        if(isNumber(x) && x){
            ta = Math.tan(x * Math.PI / 180);
            this.a = this.a + this.b * ta;
            this.c = this.c + this.d * ta;
            if(isNumber(rely) && rely){ this.e -= rely * ta; }
        }
        if(isNumber(y) && y){
            ta = Math.tan(y * Math.PI / 180);
            this.b = this.b + this.a * ta;
            this.d = this.d + this.c * ta;
            if(isNumber(relx) && relx){ this.f -= relx * ta; }
        }
        return this;
    },
    reflex: function(deg, relx, rely){
        if(isNumber(deg) && deg){
            var a = deg * Math.PI / 180, sa = Math.sin(a), ca = Math.cos(a), mult, v;

            if(parseInt(sa) > 1){ sa = 0; }
            if(parseInt(ca) > 1){ ca = 0; }

            v = 2 * ca * sa;
            mult = multMatrix([2 * ca * ca - 1, v, v, 2 * sa * sa - 1], [this.a, this.b, this.c, this.d]);

            this.a = mult[0];
            this.b = mult[1];
            this.c = mult[2];
            this.d = mult[3];

            relx = isNumber(relx) ? relx : 0;
            rely = isNumber(rely) ? rely : 0;

            if(relx || rely){
                this.e += 2 * relx - 2 * relx * ca * ca - 2 * rely * ca * sa;
                this.f += 2 * rely - 2 * rely * sa * sa - 2 * relx * ca * sa;
            }
        }
        return this;
    },
    matrix: function(){
        return this.transform().matrix;
    },
    transform: function(x, y){
        x = isNumber(x) ? x : 0;
        y = isNumber(y) ? y : 0;

        return {
            x: this.a * x + this.c * y + this.e,
            y: this.b * x + this.d * y + this.f,
            matrix: 'matrix(' + this.a + ', ' + this.b + ', ' + this.c + ', ' + this.d + ', ' + this.e + ', ' + this.f + ')'
        };
    }
};

module.exports = function () {
    return new Matrix();
};
