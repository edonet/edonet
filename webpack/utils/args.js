'use strict';

let argv = process.argv.splice(2),
    args = { _: [] };

if (argv.length) {
    for (let arg of argv) {
        if (/^--[\w\-]+(=[\w\-]+)?$/.test(arg)) {
            arg = arg.slice(2).split('=');
            args[arg[0]] = arg[1] || true;
        } else {
            args._.push(arg);
        }
    }
}

module.exports = args;
