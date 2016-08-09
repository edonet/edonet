'use strict';

let path = require('path'),
    utils = require('./utils');


// 定义 Template 插件
function TemplateWebpackPlugin(options) {
    this.options = options || {};
}

// 定义插件 apply 属性
TemplateWebpackPlugin.prototype.apply = function(compiler) {
    let output = compiler.options.output,
        options = this.options,
        src = options.src || 'src',
        dist = options.dist || output.path,
        copy = options.copy;

    // 添加预设样式文件
    if (options.styles && !Array.isArray(options.styles)) {
        options.styles = utils.readdirSync(dist, options.styles);
    }


    // 添加预设脚本文件
    if (options.scripts && !Array.isArray(options.scripts)) {
        options.scripts = utils.readdirSync(dist, options.scripts);
    }

    // 复制文件
    if (copy) {

        if (Array.isArray(copy)) {
            for (let name of copy) {
                utils.copyFile(path.resolve(src, name), path.resolve(dist, name));
            }
        } else if (typeof copy === 'object') {
            for (let name in copy) {
                if (copy.hasOwnProperty(name)) {
                    utils.copyFile(path.resolve(src, name), path.resolve(dist, copy[name]));
                }
            }
        }
    }


    // 生成模板
    compiler.plugin('emit', function(compilation, callback) {
        let styles = options.styles || [],
            scripts = options.scripts || [],
            srcTpl, distTpl;

        Object.keys(compilation.assets).forEach(function (key) {
            if (/\.css$/.test(key)) {
                styles.push(key);
            } else if (/\.js$/.test(key)) {
                scripts.push(key);
            }
        });

        styles = styles.length ? `${styles.map(createStyle).join('\n')}\n</head>` : '';
        scripts = scripts.length ? `\t${scripts.map(createScript).join('\n\t')}\n</body>` : '';

        if (styles || scripts) {

            // 设置模板路径
            if (typeof options.name === 'string') {

                // 添加 html 扩展名
                if (/.html$/.test(options.name)) {
                    options.name += '.html';
                }

                srcTpl = path.join(src, options.name);
                distTpl = path.join(dist, options.name);
            } else {
                srcTpl = path.join(__dirname, 'index.html');
                distTpl = path.join(dist, 'index.html');
            }

            // 生成模板文件
            utils.copyFile(srcTpl, distTpl, function (chunk) {
                let str = chunk.toString();

                if (styles) {
                    str = str.replace('</head>', styles);
                }

                if (scripts) {
                    str = str.replace('</body>', scripts);
                }

                return str;
            });
        }

        callback();
    });
};


// 创建 script 标签
function createScript(url) {
    return `<script type="text/javascript" src="./${url}"></script>`;
}

// 创建 style 标签
function createStyle(url) {
    return `<link type="text/css" rel="stylesheet" href="./${url}">`;
}

// 抛出接口
module.exports = TemplateWebpackPlugin;
