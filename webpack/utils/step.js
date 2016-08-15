'use strict';

class StepTask {
    constructor(...task) {
        this.task = task;
    }
    resolve(handler) {
        let curr = 0,
            task = this.task;

        return new Promise((resolve, reject) => {
            (function next() {
                if (curr in task) {
                    let currTask = task[curr ++],
                        res = handler(currTask, next);

                    if (res === false) {
                        reject(currTask);
                    } else if (res !== undefined) {
                        next();
                    }
                } else {
                    resolve();
                }
            })();
        });
    }
}

module.exports = (...arr) => {
    return new StepTask(...arr);
};
