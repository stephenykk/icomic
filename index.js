const config = require('./config/index.js')
const helper = require('./helper/index.js')

// node index.js comicName <action: list | download>
let action = process.argv[3] || 'download'

class IComic {
    async start() {
        this[action]()
    }
    // 获取目标链接列表
    async list() {
       let links =  await  helper.getList()
       links = link.map(arr => arr[0])
       return links.slice(0, config.listPage.top);
    }
    // 下载目标链接页面 和 想要的网络请求资源
    async download() {
        let downUrls = []
        let {url} = config.detailPage
        if(url) {
            downUrls = [url]
        } else {
            downUrls = await this.list()
        }

        for(let url of downUrls) {
            await helper.downPage(url)
        }
    }
}


const icomic = new IComic()
icomic.start()