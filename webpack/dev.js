'use strict';

const
    webpack = require('webpack'),
    config = require('./config'),
    base = require('./base.config');


// 设置环境变量
process.env.REACT_WEBPACK_ENV = 'dev';


// 添加webpack-dev-server
base.entry = [
    `webpack-dev-server/client?http://${config.host}:${config.port}`,
    'webpack/hot/only-dev-server',
    base.entry.app
];

// 添加js|jsx loader
base.module.loaders.push({
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'react-hot!babel'
});


module.exports = Object.assign({}, base, {
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DllReferencePlugin({
            context: config.src,
            manifest: require('./vendor/manifest')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: false,
        publicPath: base.output.publicPath,
        contentBase: config.dist
    }
});