'use strict';

const
    path = require('path'),
    json = require('./json'),
    step = require('./step'),
    stream = require('./stream'),
    config = require('./config');

class HTMLWebpackPlugin {
    constructor(options) {
        this.options = options || {};
    }
    apply(compiler) {
        let options = this.options,
            output = compiler.options.output,
            dist = options.dist || output.path,
            { styles, scripts } = this.assets();

        // 生成模板
        compiler.plugin('emit', (compilation, callback) => {
            let stylesCode = '',
                scriptsCode = '',
                src = options.src || path.join(__dirname, './html-webpack-plugin.tpl');

            Object.keys(compilation.assets).forEach(key => {
                if (/\.css$/.test(key)) {
                    styles.push(key);
                } else if (/\.js$/.test(key)) {
                    scripts.push(key);
                }
            });

            if (styles.length) {
                stylesCode = `${styles.map(createStyle).join('\n')}\n</head>`;
            }

            if (scripts.length) {
                scriptsCode = `\t${scripts.map(createScript).join('\n\t')}\n</body>`;
            }

            // 生成模板文件
            stream(src).pipe(code => {
                let regexp = /<%-\s*([\w:-]+)\s*%>/g;

                code = code.replace(regexp, (find, $1) => {
                    return options[$1] || '';
                });

                if (stylesCode) {
                    code = code.replace('</head>', stylesCode);
                }

                if (scriptsCode) {
                    code = code.replace('</body>', scriptsCode);
                }

                return code;
            }).pipe(path.join(dist, 'index.html'));

            callback();
        });
    }
    assets() {
        let vendor = this.options.assets,
            styles = [],
            scripts = [];

        if (vendor) {
            let map = json(config.assetsMap);

            if (! (vendor instanceof Array)) {
                vendor = [vendor];
            }

            step(...vendor).resolve(v => {
                if (v in map) {
                    let list = map[v],
                        styleRegExp = /\.css$/,
                        scriptRegExp = /\.js$/;

                    for (let name of list) {
                        if (styleRegExp.test(name)) {
                            styles.push(name);
                        } else if (scriptRegExp.test(name)) {
                            scripts.push(name);
                        }
                    }
                }
            });
        }

        return { styles, scripts };
    }
}


// 创建 script 标签
function createScript(url) {
    return `<script type="text/javascript" src="./${url}"></script>`;
}

// 创建 style 标签
function createStyle(url) {
    return `<link type="text/css" rel="stylesheet" href="./${url}">`;
}

module.exports = HTMLWebpackPlugin;
