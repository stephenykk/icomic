const fs = require("fs-extra");
const path = require("path");
const configModule = require("./config/index.js");
const config = configModule.data;
const { DEBUG_LIST } = configModule
const {
    listJsonFilePath,
    log,
    log2,
    logWithLines,
} = require("./comic/common.js");
const getList = require("./comic/getList.js");
const downPage = require("./comic/downPage.js");
const { action, dirName, skipCache } = require("./comic/parseArgv.js");


// if (dirName.includes("/")) {
//     log2("PLEASE INPUT COMIC NAME, NOT PATH");
//     process.exit(1);
// }

class IComic {
    usage(action) {
        if (typeof this[`${action}Usage`] === "function") {
            return this[`${action}Usage`](action);
        }
        const isOK = dirName;
        logWithLines(
            `${"Usage".padStart(
                10
            )}: node index.js ${action} <dirName> [skipCache]\n${"Example".padStart(
                10
            )}: node index.js ${action} wanmei `
        );
        return isOK;
    }

    async start() {
        const ok = this.usage(action);
        ok && this[action]();

        log("AT THE END OF comic.start()");
    }

    cartoonListUsage(action) {
        logWithLines(
            `${"Usage".padStart(
                10
            )}: node index.js ${action} \n${"Example".padStart(
                10
            )}: node index.js ${action} `
        );
        return true;
    }

    cartoonList() {
        var myconfig = require("./config/myindex");
        var favConfig = Object.fromEntries(
            Object.entries(myconfig).filter((pair) => {
                const [name, conf] = pair;
                return conf.isFav;
            })
        );
        // log2(Object.keys(myconfig));
        const favList = Object.keys(favConfig).sort().join("\n");
        log2(favList);
        fs.outputFileSync(path.join(__dirname, "output/fav.txt"), favList);
    }

    // 获取目标链接列表
    async list(noCache) {
        const isSkipCache = noCache != null ? noCache : skipCache;

        let { top, isReverse, snList, totalRe } = config.listPage;
        let links = await getList(isSkipCache);
        if (DEBUG_LIST) {
            console.log("🚀 ~ IComic ~ list ~ links:", links, 'isSkipCache:', isSkipCache)
        }
        if (isReverse) {
            links.reverse();
        }

        const getSN = (text, link) => {
            const matched = text.match(/\d+/) || (!text.includes('..') && link.match(/\d+(?=\D*?$)/));
            return matched ? matched[0] * 1 : null;
        };

        const getTotal = (text) => {
            if (!totalRe) {
                return null;
            }

            return totalRe.test(text) ? text.match(totalRe)[0] * 1 : null;
        };

        const linkInfos = links.reduce((infos, linkData) => {
            let [link, text = ""] = linkData;
            const sn = getSN(text, link);
            const total = getTotal(text);
            return Object.assign(infos, { [link]: { link, text, sn, total } });
        }, {});

        let needLinks = [];
        // need download sn list
        if (snList && snList.length) {
            snList = snList.map((v) => v * 1);
            // link.text parse sn, sn in wanted list , and then put into needLinks
            links = links.filter((arr) => {
                let [link, text = ""] = arr;
                const sn = getSN(text, link);
                if (sn == null) return false;

                return snList.includes(sn);
            });

            needLinks = links.map((arr) => arr[0]);
        } else {
            // if not specify snList, then use top n
            links = links.map((arr) => arr[0]);
            needLinks = links.slice(0, top);
        }

        return { needLinks, linkInfos };
    }

    // 检查是否有更新的资源
    async checkNewer() {
        const { needLinks, linkInfos } = await this.list(true);
        // console.log("🚀 ~ IComic ~ checkNewer ~ linkInfos:", linkInfos)
        const newestLinkInfo = Object.values(linkInfos)
            .sort((infoA, infoB) => infoA.sn * 1 - infoB.sn * 1)
            .pop();
        // log2("newestLinkInfo:", newestLinkInfo);

        if (!newestLinkInfo) {
            log2('not any links found')
            return;
        }

        const outDir = path.resolve(__dirname, config.output);
        const folderNames = fs
            .readdirSync(outDir)
            .filter((fname) => !/^\./.test(fname))
            .filter((fname) =>
                fs.statSync(path.resolve(outDir, fname)).isDirectory()
            );

        const doneFolderNames = folderNames
            .map((fname) => fname.match(/\d+/)?.[0] || 0)
            .map((val) => val * 1)
            .sort((a, b) => b - a)
            .slice(0, 10)
            .filter(
                (fname) =>
                    fs.existsSync(
                        path.resolve(outDir, fname + '', "tslist.txt")
                    ) ||
                    fs.existsSync(
                        path.resolve(outDir, fname + '', "dec/tslist.txt")
                    ) ||
                    fs.existsSync(
                        path.resolve(outDir, fname + '', "out.mp4")
                    ) ||
                    fs.existsSync(
                        path.resolve(outDir, fname + '', "index.mp4")
                    )
            )
        const maxDoneSn = !doneFolderNames.length
            ? 0
            : Math.max.apply(
                Math,
                doneFolderNames
            );
        log2("maxDoneSn", maxDoneSn);

        const diff = newestLinkInfo.sn * 1 - maxDoneSn;
        const newJsonFilePath = path.join(listJsonFilePath(), "../new.json");
        if (diff > 0) {
            log2("发现新的资源:", maxDoneSn + 1, "~", newestLinkInfo.sn);
            const newSnList = Array.from(
                { length: diff },
                (_, i) => i + 1 + maxDoneSn
            );
            fs.outputJSON(newJsonFilePath, newSnList);
        } else {
            log2("没有新的资源:", newestLinkInfo);
            fs.outputJSON(newJsonFilePath, []);
        }
    }

    downloadUsage(action) {
        const isOK = dirName;
        logWithLines(
            `${"Usage".padStart(
                10
            )}: node index.js ${action} <dirName> [downSn]\n${"Example".padStart(
                10
            )}: node index.js ${action} wanmei 10-13\n${"Example".padStart(
                10
            )}: node index.js ${action} wanmei 10\n${"Example".padStart(
                10
            )}: node index.js ${action} wanmei 10,13`
        );
        return isOK;
    }
    // 下载目标链接页面 和 想要的网络请求资源
    async download() {
        let downUrls = [];
        let urlInfos = {};
        let { url } = config.detailPage;
        // if set detailPage.url download one, else download more
        if (url) {
            downUrls = [url];
        } else {
            const { needLinks, linkInfos } = await this.list(skipCache);
            urlInfos = linkInfos;

            // needLinks is desc, and downloading should is in asc order
            needLinks.reverse();

            downUrls = needLinks;
        }

        log2("downUrls:", downUrls);

        for (let url of downUrls) {
            log(
                `========= start downloading ${config.output} ${url} =========`
            );
            await downPage(url, urlInfos[url]);
            log(
                `========= finish downloading ${config.output} ${url} =========`
            );
        }
    }
}

const icomic = new IComic();
icomic.start();
