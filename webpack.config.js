const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'resources/assets/');

const extractSass = new ExtractTextPlugin({
    filename: "../css/app.css"
});

const config = {
    entry: [`${APP_DIR}/js/index.jsx`,  `${APP_DIR}/scss/app.scss`],
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
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
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
        extractSass
    ]
};

module.exports = config;
