'use strict';

let img = new Image(),
    isImageReady = false,
    imageReadyList = [];

img.src = require('./cloud.png');
img.onload = function () {
    isImageReady = true;
    imageReadyList.forEach((v) => { v(img); });
    imageReadyList = null;
};

export function ready(handler) {
    return isImageReady ? handler(img) : imageReadyList.push(handler);
}

class Cloud {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.z = options.z;
        this.speed = options.speed;
        this.image = img;

        ready((ref) => {
            this.width = ref.width;
            this.height = ref.height;
        });
    }
    renderTo(canvas) {
        if (isImageReady) {
            let p = canvas.point(this.x, this.y, this.z),
                width = this.width * p.scale,
                height = this.height * p.scale,
                x = p.x - width / 2,
                y = p.y - height / 2,
                depth = canvas.depth - 10;


            this.z = this.z > depth ? - 2000 : this.z + this.speed;
            this.opacity = this.z > 0 ? (depth - this.z) / 200 : (this.z + 2000) / 1000;
            this.opacity = this.opacity < 0 ? 0 : this.opacity > 1 ? 1 : this.opacity;

            canvas
                .opacity(this.opacity)
                .drawImage(this.image, x, y, width, height);
        }

        return this;
    }
}

export default Cloud;
