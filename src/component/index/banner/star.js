'use strict';

class Star {
    constructor(rect) {
        this.rect = rect;
        this.radian = 120 * Math.PI / 180;
        this.radianX = Math.cos(this.radian);
        this.radianY = Math.sin(this.radian);
        this.reset();
    }
    reset() {
        let rect = this.rect;

        this.x = rect.x + Math.random() * rect.width;
        this.y = rect.y + Math.random() * rect.height;
        this.length = 100 + Math.random() * 50;
        this.delay = parseInt(Math.random() * 200);
        this.speed = Math.random() * 3 + 2;
        this.count = 0;
        this.curr = 0;
    }
    renderTo(canvas) {
        this.count ++;

        if (this.count < this.delay) {
            return this;
        }

        if (this.curr < this.length) {

            let end = this.getEndPoint();

            canvas
                .begin()
                .opacity((this.length - this.curr) / this.length)
                .line(this.x, this.y, end.x, end.y)
                .stroke();

            this.curr += this.speed;
        } else {
            this.reset();
        }

        return this;
    }
    getEndPoint() {
        return {
            x: this.x + this.curr * this.radianX,
            y: this.y + this.curr * this.radianY
        };
    }
}

export default Star;
