'use strict';

import Canvas from 'js/canvas';
import { animate } from 'js/animation';
import Cloud, { ready } from './cloud';
import Star from './star';



class BannerCanvas {
    constructor(id) {
        this.canvas = new Canvas(id);
        this.cloudList = [];
        this.starList = [];
    }
    render() {
        this.createStars();
        this.createCloud();

        animate(() => {
            this.canvas.clear();

            this.renderCloud();
            this.renderStars();

            return this.nextAnimation;
        });

        return this;
    }


    createCloud() {
        let width = this.canvas.width,
            height = this.canvas.height,
            depth = this.canvas.depth + 2000,
            halfWidth = width / 2,
            halfDepth = 2000,
            num = parseInt(this.canvas.width / 10);

        while (num --) {
            this.cloudList.push(new Cloud({
                x: (Math.random() * width - halfWidth) * 1.2,
                y: - Math.random() * height - 50,
                z: Math.random() * depth - halfDepth,
                speed: Math.random() * 2 + 1
            }));
        }
    }
    renderCloud() {
        let canvas = this.canvas,
            cloudList = this.cloudList;

        canvas.save();
        cloudList.sort((a, b) => a.z - b.z).forEach((v) => {
            v.renderTo(canvas);
        });
        canvas.restore();

        return this;
    }


    createStars() {
        let width = this.canvas.width,
            height = this.canvas.height / 4,
            num = parseInt(width / 100);

        while (num --) {
            this.starList.push(new Star({
                x: 0,
                y: 0,
                width: width,
                height: height
            }));
        }
    }
    renderStars() {
        let canvas = this.canvas,
            starList = this.starList;

        canvas
            .save()
            .style({
                fill: 'white',
                stroke: 'white'
            });

        starList.forEach((v) => {
            v.renderTo(canvas);
        });
        canvas.restore();

        return this;
    }

    destroy() {
        this.starList = [];
        this.cloudList = [];
        this.nextAnimation = false;
    }
}

export { ready };
export default function (id) {
    return new BannerCanvas(id);
}
