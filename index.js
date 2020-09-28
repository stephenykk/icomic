const config = require("./config/index.js");
const helper = require("./helper/index.js");
const { match } = require("../cdown/url.js");

// node index.js <action: list | download>
let action = process.argv[2] || "download";

class IComic {
  async start() {
    this[action]();
  }

  configList() {
    var myconfig = require('./config/myindex')
    helper.log(Object.keys(myconfig))
  }
  
  // 获取目标链接列表
  async list() {
    let { top, isReverse, snList } = config.listPage;
    let links = await helper.getList();
    if (isReverse) {
      links.reverse();
    }

    let needLinks = [];
    if (snList && snList.length) {
      
      snList = snList.map(v => v*1)

      links = links.filter((arr) => {
        let [link, text = ""] = arr;
        let matched = text.match(/\d+/);
        if (!matched) return false;

        let sn = matched[0] * 1;
        return snList.includes(sn);
      });

      needLinks = links.map((arr) => arr[0]);
    } else {
      links = links.map((arr) => arr[0]);
      needLinks = links.slice(0, top);
    }

    return needLinks;
  }
  // 下载目标链接页面 和 想要的网络请求资源
  async download() {
    let downUrls = [];
    let { url } = config.detailPage;
    if (url) {
      downUrls = [url];
    } else {
      downUrls = await this.list();
    }

    helper.log2('downUrls:', downUrls)

    for (let url of downUrls) {
      await helper.downPage(url);
    }
  }
}

const icomic = new IComic();
icomic.start();
