var path = require('path')
var resolve = dir => path.resolve(__dirname, dir)
var downName = process.argv[2] || 'hello'

var config = {
    hello: {
        output: resolve('../output/hello'),
        listPage: {
            url: 'https://www.cnblogs.com/',
            selector: 'a.post-item-title',
            top: 5 // 取顶部几个链接
        },
        detailPage: {
            url: 'https://www.cnblogs.com/lookroot/p/13645736.html',
            downContent: true, // 下载页面内容
            reList: [/news\.aspx/, /wechat\.png/] // 匹配 response.url() 导出资源

        }
    }
}

function getConfig(name) {
    return config[name] || {}
}


module.exports = getConfig(downName)