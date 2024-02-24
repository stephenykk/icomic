var fs = require("fs-extra");
var path = require("path");
const { dirName } = require("../comic/parseArgv");
const { log, log2 } = require("../comic/common");

var resolve = (dir) => path.resolve(__dirname, dir);
// node index.js down yaojing
var downName = (dirName || "hello").split("/").shift();

var myconfig = {};
if (fs.existsSync(resolve("./myindex.js"))) {
    myconfig = require("./myindex.js");
}

var yoconfig = {};
if (fs.existsSync(resolve("./yoindex.js"))) {
    yoconfig = require("./yoindex.js");
}

var config = {
    hello: {
        output: resolve("../output/hello"),
        listPage: {
            url: "https://www.cnblogs.com/",
            selector: "a.post-item-title",
            top: 5, // 取顶部几个链接
            isReverse: false, // 倒序
        },
        detailPage: {
            url: "https://www.cnblogs.com/lookroot/p/13645736.html",
            downContent: true, // 下载页面内容
            reList: [/BlogPostInfo\.aspx/, /wechat\.png/], // 匹配 response.url() 导出资源
            wantedCount: 1,
            callback: false,
        },
    },
};

function getConfig(name) {
    let realConfig = { ...config, ...myconfig, ...yoconfig };
    let nameList = Object.keys(realConfig);

    // log2(nameList, name);

    if (!nameList.includes(name)) {
        log2("===> BAD NAME:", name);
        throw new Error("name invalid, please check config/index.js");
    }
    let comicConf = realConfig[name] || {};
    const srcDir = path.resolve(__dirname, "..");
    fs.ensureDirSync(path.resolve(srcDir, comicConf.output));
    return comicConf;
}

module.exports = {
    data: getConfig(downName),
    getConfig,
};
