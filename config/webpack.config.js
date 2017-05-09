const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, '..');
const ENTRY_DIR = path.join(context, 'src');
const BUILD_DIR = path.join(context, 'build');
const HTML_TEMPLATE = path.join(BUILD_DIR, 'index.template.html');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        path.join(ENTRY_DIR, '/index.js'),
    ],
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'assets/[hash].[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        'env',
                        'stage-0',
                        'es2015',
                        'react'
                    ],
                },
            },
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: HTML_TEMPLATE,
        }),
    ],
    devtool: 'source-map',
}