const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'resources/assets/');

const extractLess = new ExtractTextPlugin({
    filename: `../css/app.css`
});

const config = {
    entry: [`${APP_DIR}/js/index.jsx`, `${APP_DIR}/less/app.less`, `${APP_DIR}/less/print.less`],
    output: {
        path: `${BUILD_DIR}/js`,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                })
            },
            {
                test: /\.jsx?/,
                include: `${APP_DIR}/js`,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    plugins: [
        extractLess
    ]
};

module.exports = config;
