var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname, "js/app/index.js"),
    output: {
        path: path.join(__dirname, "../public/js"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'js/lib/jquery-3.2.1.min.js'),
            mod: path.resolve(__dirname, 'js/mod'),
            less: path.resolve(__dirname, 'less')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            //为所有模块添加jquery
            $: "jquery"
        })
    ],

}