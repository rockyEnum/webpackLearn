//webpack.config.js 这个文件名是定死的，如果不按这个命名，需要通过--config conf.js来修改(webpack.conf.js);
//如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。
var path = require('path');
function rewriteUrl(replaceUrl) {
    return function (req, opt) {
        console.log(replaceUrl)
        console.log(req)
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : '';
        req.url = req.path.replace(opt.path, replaceUrl) + query;
    }
}
module.exports = {
    //打包的入口文件
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {//输出打包结果
        //输出的文件路径
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'//指定打包文件名字
    },
    module: {
        loaders: [ //定义一系列加载器
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        stats: {color: true},
        port: 8080,
        contentBase: 'build',//指定静态文件的根目录
        proxy: [
            {
                //替换符合此正则的接口路径
                path: /^\/api\/(.*)/,
                //目标域名端口
                target: "http://localhost:8080/",
                //重新定向到新的地址
                //$1取自path正则匹配到的真实路径的第一个分组
                rewrite: rewriteUrl('/$1\.json'),
                //修改来源地址
                changeOrigin: true
            }
        ]
    }
}