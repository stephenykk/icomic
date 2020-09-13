var fs = require('fs-extra')
var path = require('path')
var resolve = dir => path.resolve(__dirname, dir)
var downName = process.argv[3] || 'hello'

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
    let configMap = {...config, ...myconfig}
    let nameList = Object.keys(configMap)
    if(!nameList.includes(name)) {
        throw new Error('name invalid, please check config/index.js')
    }
    let conf = configMap[name] || {}
    fs.ensureDirSync(conf.output)
    return conf
}


module.exports = getConfig(downName)