const fs = require('fs')
const path = require('path')
const config = require("./config/index.js");
const helper = require("./helper/index.js");

// node index.js <action: list | download>
let action = process.argv[2] || "download";
const skipCache = process.argv[4] ? JSON.parse(process.argv[4]) : false
const dirName = process.argv[3]
if(dirName.includes('/')) {
  helper.log2('PLEASE INPUT COMIC NAME, NOT PATH')
  process.exit(1)
}


class IComic {
  async start() {
    this[action](skipCache);
  }

  configList() {
    var myconfig = require('./config/myindex')
    helper.log(Object.keys(myconfig))
  }
  
  // 获取目标链接列表
  async list(skipCache) {
    let { top, isReverse, snList, totalRe } = config.listPage;
    let links = await helper.getList(skipCache);
    if (isReverse) {
      links.reverse();
    }

    const getSN = (text) => {
      const matched = text.match(/\d+/)
      return matched ? matched[0] * 1 : null
    }

    const getTotal = (text) => {
      if (!totalRe) {
        return null
      }

      return totalRe.test(text) ? text.match(totalRe)[0] * 1 : null
    }

    const linkInfos = links.reduce((infos, linkData) => {
      let [link, text = ""] = linkData;
      const sn = getSN(text)
      const total = getTotal(text)
      return Object.assign(infos, {[link]: {link, text, sn, total}})
    }, {})

    
    let needLinks = [];
    // need download sn list
    if (snList && snList.length) {
      
      snList = snList.map(v => v*1)
      // link.text parse sn, sn in wanted list , and then put into needLinks
      links = links.filter((arr) => {
        let [link, text = ""] = arr;
        const sn = getSN(text)
        if (sn == null) return false;

        return snList.includes(sn);
      });

      needLinks = links.map((arr) => arr[0]);
    } else {
      // if not specify snList, then use top n
      links = links.map((arr) => arr[0]);
      needLinks = links.slice(0, top);
    }

    return {needLinks, linkInfos};
  }

  // 检查是否有更新的资源
  async checkNewer(skipCache) {
    const {needLinks, linkInfos} = await this.list(true)
    const newestLinkInfo = Object.values(linkInfos).sort((infoA, infoB) => infoA.sn * 1 - infoB.sn * 1).pop()
    helper.log2('newestLinkInfo:', newestLinkInfo)
    const outDir = path.resolve(__dirname, config.output)
    const folderNames = fs.readdirSync(outDir).filter(fname => !/^\./.test(fname)).filter(fname => fs.statSync(path.resolve(outDir, fname)).isDirectory())

    const maxDoneSn = !folderNames.length ? 0 : Math.max.apply(Math, folderNames.map(fname => fname.match(/\d+/)?.[0] || 0).map(val => val * 1))
    helper.log2('maxDoneSn', maxDoneSn)

    if (newestLinkInfo.sn * 1 > maxDoneSn) {
      helper.log2('发现新的资源:', maxDoneSn + 1, '~', newestLinkInfo.sn)
    } else {
      helper.log2('没有新的资源:', newestLinkInfo)
    }
    

  } 
  
  // 下载目标链接页面 和 想要的网络请求资源
  async download(skipCache) {
    let downUrls = [];
    let urlInfos = {}
    let { url } = config.detailPage;
    // if set detailPage.url download one, else download more
    if (url) {
      downUrls = [url];
    } else {
      const { needLinks, linkInfos } = await this.list(skipCache);
      urlInfos = linkInfos
      downUrls = needLinks
    }

    helper.log2('downUrls:', downUrls)

    for (let url of downUrls) {
      helper.log(`------------------------------ downloading ${url} ------------------------------`)
      await helper.downPage(url, urlInfos[url]);
    }
  }
}

const icomic = new IComic();
icomic.start();
