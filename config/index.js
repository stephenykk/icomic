var fs = require('fs-extra')
var path = require('path')
var resolve = dir => path.resolve(__dirname, dir)
var downName = process.argv[2] || 'hello'

var myconfig = {}
if(fs.existsSync(resolve('./myindex.js'))) {
    myconfig = require('./myindex.js')
}

var config = {
    hello: {
        output: resolve('../output/hello'),
        listPage: {
            url: 'https://www.cnblogs.com/',
            selector: 'a.post-item-title',
            top: 5, // 取顶部几个链接
            isReverse: false // 倒序
        },
        detailPage: {
            url: 'https://www.cnblogs.com/lookroot/p/13645736.html',
            downContent: true, // 下载页面内容
            reList: [/news\.aspx/, /wechat\.png/], // 匹配 response.url() 导出资源
            callback: false
        }
    }
}

function getConfig(name) {
    let confMap = {...config, ...myconfig}
    let conf = confMap[name] || {}
    fs.ensureDirSync(conf.output)
    return conf
}


module.exports = getConfig(downName)