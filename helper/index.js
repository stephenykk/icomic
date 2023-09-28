const fs = require("fs-extra");
const urlTool = require("url");
const path = require("path");
const axios = require("axios");
const config = require("../config/index.js");
const { runCommand, spawnCommand } = require("./runCommand.js");

const puppeteer = require("puppeteer");

axios.defaults.timeout = 40 * 1000;
axios.defaults.headers["User-Agent"] =
    "Mozilla/5.0 (X11; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0";

function isStream(result) {
    return result && typeof result.pipe === "function";
}

function isUrl(str) {
    return /^(https?:)?\/\//.test(str);
}

function log(...args) {
    console.log(":::", ...args);
}

function log2(...args) {
    console.log("\n", ...args, "\n");
}

// download comic pic
async function download(
    url,
    outDir = "",
    responseType = "stream",
    outputCallback
) {
    log("downloading :", url);
    let fname = path.basename(url);
    // res is object, res.data is stream
    let res = await axios.get(url, { responseType }).catch((err) => {
        log2("DOWN FAIL:", fname, err.message);
        return false;
    });
    // debugger;

    if (!res) {
        return false;
    }

    let outResult = await output(url, res.data, outDir, outputCallback);
    return outResult;
}

function output(fname, con, outDir, outputCallback) {
    if (isUrl(fname)) {
        fname = path.basename(fname);
        fname = fname.replace(/\?.*$/, "");
    }
    outDir = outDir || config.output;
    fs.ensureDirSync(outDir);

    let outFile = path.resolve(outDir, fname);
    // if exists , rename new file
    /* if (fs.existsSync(outFile)) {
    outFile = outFile.replace(/\.\w+$/, "_" + 2 + "$&");
  } */

    return new Promise((resolve) => {
        if (isStream(con)) {
            let ws = fs.createWriteStream(outFile, { flags: "w" });
            let rs = con;
            rs.pipe(ws);
            ws.on("finish", () => {
                log("output ok:", fname);
                if (typeof outputCallback === "function") {
                    outputCallback(outFile);
                }
                resolve(true);
            });
        } else {
            let err = fs.writeFileSync(outFile, con, { encoding: "utf8" });
            if (err) {
                log2("output err:", err);
                resolve(false);
            } else {
                log("output file:", fname, outFile);

                if (typeof outputCallback === "function") {
                    outputCallback(outFile);
                }

                resolve(true);
            }
        }
    });
}

function listJsonFilePath() {
    var downName = process.argv[3] || "hello";
    var fpath = path.resolve(__dirname, "../output", downName, "list.json");

    return fpath;
}

function getCacheList() {
    var fpath = listJsonFilePath();
    let exists = fs.existsSync(fpath);
    return exists ? fs.readJsonSync(fpath) : false;
}

function setCacheList(data) {
    var fpath = listJsonFilePath();

    fs.outputJSON(fpath, data);
}

function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function getList(skipCache) {
    if (!config.nocache && !skipCache) {
        let cached = getCacheList();
        if (cached) {
            helper.log("GET LIST FROM CACHE", cached);
            return cached;
        }
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--lang=zh-CN"],
    });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    page.on("console", (msg) => {
        console.log("PAGE CONSOLE:", msg.text());
    });

    let { url, top } = config.listPage;
    log("GOING TO LIST PAGE:", `'${url}'`);

    // await page.goto(url, { waitUntil: "networkidle0", timeout: 80 * 1000 });
    // await page.goto(url, { waitUntil: "networkidle2", timeout: 80 * 1000 });
    // await page.goto(url, { waitUntil: "load", timeout: 80 * 1000 });
    try {
        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 20 * 1000,
        });
    } catch (e) {
        log("OPEN PAGE ERR :(  ", e);
    }
    log("OPEN PAGE DONE:", url);

    // await client render finish
    await sleep(5);

    // evaluate callback
    // 页面打开后，执行自定义回调，并传入config对象
    const links = await page.evaluate((config) => {
        // console.log('========', JSON.stringify(config))
        let root = document;
        let selector = config.listPage.selector;
        if (Array.isArray(config.listPage.selector)) {
            let [rootSelector, linkSelector] = config.listPage.selector;

            root = document.querySelector(rootSelector);
            if (!root) {
                console.warn("\n[ERR]:", `找不到元素 ${rootSelector} \n`);
                root = document;
            }
            selector = linkSelector;
        }

        var links = root.querySelectorAll(selector);
        links = Array.from(links);
        links = links.map((link) => [link.href, link.textContent]);
        return links;
        // return document.title
    }, config);

    // make sure desc order
    links.sort((a, b) => {
        let an = parseInt(a[1].replace(/\D/g, "") || 0);
        let bn = parseInt(b[1].replace(/\D/g, "") || 0);
        return bn - an;
    });

    log2(
        `get links ${top ? "of top " + top : ""}:`,
        top ? links.slice(0, top) : links
    );
    await browser.close();

    printLatestDown();
    setCacheList(links);

    return links;
}

function printLatestDown() {
    let files = fs.readdirSync(config.output);
    // skip dot files
    var names = files
        .filter((fname) => !/^\./.test(fname))
        .map((val) => val * 1);
    names.sort((a, b) => b - a);
    log2(`${config.output} latest down: `, names.slice(0, 3));
}

function getResourceUrl(refUrl, resourcePath) {
    let isUrl = /^http/.test(resourcePath);

    if (isUrl) return resourcePath;

    const oUrl = urlTool.parse(refUrl);
    if (resourcePath.startsWith("/")) {
        oUrl.pathname = resourcePath;
    } else {
        oUrl.pathname = oUrl.pathname.replace(/\/[^/]*$/, "/") + resourcePath;
    }

    const resourceUrl = urlTool.format(oUrl);
    return resourceUrl;
}

async function getRedirectUrl(resUrl, resourcePath) {
  const resourceUrl = getResourceUrl(resUrl, resourcePath)
  const res = await axios.get(resourceUrl) // 若发生重定向，axios会获取重定向后的请求的结果
  const headers = res.headers || {}
  const location = headers.location || headers.Location
  log2('got location:', location);
  return location 
}

async function getNewM3u8By302(resData, resUrl) {
  const lines = resData.split('\n')
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/#EXTINF/.test(line)) {
      lines[i + 1] = await getRedirectUrl(resUrl, lines[i + 1]) || lines[ i + 1 ]
    }
  }

  const newResData = lines.join('\n')
  log2('-----------> getNewM3u8By302 newResData:', newResData)
  return newResData
}

var closeBrowserTimer;
async function downPage(url, urlInfo = {}) {
    // if(closeBrowserTimer) clearTimeout(closeBrowserTimer)

    let resolve = null;
    const downPromise = new Promise((res) => (resolve = res));

    log2("downloading page:", url, urlInfo);
    const totalOfChapter = urlInfo.total || 1;
    let {
        reList = [],
        downContent: isDownContent,
        callback,
        conCheck,
        expectCount = 1,
        isMp4,
        isIframe,
        checkIsM3u8,
    } = config.detailPage;
    let outputCount = 0;
    let isM3u8 = false;

    if (totalOfChapter) {
        expectCount = totalOfChapter;
    }

    const outputListeners = [];
    const listenOutputOne = (cb) => {
        if (!outputListeners.includes(cb)) outputListeners.push(cb);
    };
    const outputOneCallback = async () => {
        // outputListeners.forEach(cb => cb())
        if (outputCount >= expectCount) {
            helper.log2("before close browser!");
            await sleep(2);
            // await browser.close();
            await closeBrowser();
            resolve(true);
        } else {
            for (const cb of outputListeners) {
                await cb();
            }
        }
    };

    const closeBrowser = async () => {
        await sleep(2);
        if (gotoDone) {
            return await browser.close();
        } else {
            return await closeBrowser();
        }
    };

    const browser = await puppeteer.launch({
        // product: 'firefox',

        // executablePath: '/usr/lib/chromium-browser/chromium-browser',
        // headless: true,
        headless: "new",
        // headless: false,
        devtools: true,
    });

    let gotoDone = false;
    const page = await browser.newPage();
    await page.setViewport({width: 1400, height: 800})
    const { root = "", nextBtn = "" } = config.detailPage.selector || {};
    const clickNextBtn = async function () {
        const selector = (root + " " + nextBtn).trim();
        if (!selector) return;
        await page.waitForSelector(selector);
        log2("next button selector ready:", selector);
        // 这是在模拟真实的鼠标点击，有遮罩挡着会点击不到目标元素
        // await page.click('.avatar.userbtn')
        // await page.click(selector)
        // 用js的点击，可以无视遮罩覆盖的问题
        await page.evaluate((selector) => {
            const nbtn = document.querySelector(selector);
            nbtn && nbtn.click();
            return true;
        }, selector);
    };

    nextBtn && listenOutputOne(clickNextBtn);

    page.on("console", (msg) => log("console:", msg.text()));
    page.on("pageerror", (error) => log2("error:", error));

    if (reList.length) {
        // listen response , capture wanted
        const doneSet = new Set();
        const linksOf302 = [];
        page.on("response", async (response) => {
            if (outputCount >= expectCount) return;

            let resUrl = response.url();
            const status = response.status();
            const contentType = response.headers()['content-type']
            if (status === 302) {
                log("got 302 response:", resUrl);
                linksOf302.push(resUrl);
            }
            let normalResUrl = decodeURIComponent(resUrl.split("?")[0]);
            let resFile = path.basename(normalResUrl);
            // log static file response
            // if(/\.\w{3,5}$/.test(resFile)) {
            //   log('on response file:', resFile)
            // }

            // log('on response file:', resFile)
            log("on response url:", status, contentType, resUrl);

            if (resUrl.includes('m3u8')) {
                log2('==> on response m3u8 rel:', resUrl)
            }

            let wanted = false;
            if (isMp4 && /mp4/.test(contentType)) {
                wanted = reList.some((re) => re.test(resUrl));
            } else {
                wanted = reList.some((re) => re.test(normalResUrl));
            }

            if (typeof checkIsM3u8 === "function") {
                const isM3u8Mode = checkIsM3u8(response);
                if (isM3u8Mode) {
                    isM3u8 = true;
                    isMp4 = false;
                }
            }

            if (wanted) {
                if (isMp4) {
                    const status = response.status();
                    const headers = response.headers();
                    log2(
                        "content-type status:",
                        headers["content-type"],
                        status
                    );
                    if (
                        status !== 206 ||
                        !/mp4/.test(headers["content-type"])
                    ) {
                        wanted = false;
                    }

                    if (!wanted) return;
                }

                log2("got wanted,", normalResUrl);

                // parse sn from title

                let title = await page.title();
                let sn =
                    urlInfo.sn ||
                    (title.match(/\d+/g) ? title.match(/\d+/g)[0] : "");
                sn = sn + "";
                response.sn = sn;
                let outDir = path.resolve(config.output, sn);

                log("on reponse file, getting buffer:", resFile);
                // let buf = isMp4 ? false : await response.buffer();
                let buf = null 
                if (isMp4) {
                    buf = false
                } else {
                    try {
                        buf = await response.buffer()
                    }catch(err) {
                        log2('response.buffer() got some error::', err)
                    }
                }
                // log(resFile, 'CONTENT:', buf.toString('utf8'))

                if (conCheck) {
                    // check content, ensure it is wanted response
                    let conOK = conCheck(buf.toString("utf8"));
                    if (!conOK) {
                        buf = "URL IS:" + "\n" + resUrl + "\n" + buf.toString();
                        wanted = false;
                        log2("m3u8 content not ok...");
                    }
                }

                if (!wanted) return;
                if (doneSet.has(normalResUrl)) return;
                doneSet.add(normalResUrl);
                outputCount += 1;
                log2(`outputing url ${outputCount}/${expectCount}:`, resUrl);

                if (isMp4) {
                    fs.ensureDirSync(outDir);
                    const outFile = `${outDir}${path.sep}index.mp4`;
                    await spawnCommand("curl", ["-o", outFile, resUrl]);
                    // await spawnCommand('curl', [`-o ${sn}.mp4`, `${resUrl}`])
                    // await runCommand(`curl -o ${outDir}${path.sep}index.mp4 "${resUrl}"`)
                } else {
                    await output(resUrl, buf, outDir);
                }

                if (callback && typeof callback === "function") {
                    const needRedirect = false
                    if (needRedirect && isM3u8 && buf) {
                        const resData = buf.toString();
                        const infLineRe = /#EXTINF/;
                        const lines = resData
                            .split("\n")
                            .filter((l) => l.trim());
                        const firstTsIdx =
                            lines.findIndex((line) => line.match(infLineRe)) +
                            1;
                        if (firstTsIdx) {
                            const firstTsLine = lines[firstTsIdx];
                            const isExpectedType =
                                /\.(ts|png|jpe?g)(\?.*)?$/.test(resUrl);
                                if (!isExpectedType) {
                              // await sleep(20); // wait for 302 happend
                              const location = await getRedirectUrl(resUrl, firstTsLine)
                              const shouldRedirect = linksOf302.includes(firstTsLine)
                              if (shouldRedirect) {
                                log2('开始执行重定向更新索引文件..')
                                    const newResData = await getNewM3u8By302(
                                        resData,
                                        resUrl
                                    );
                                    // update m3u8 file
                                    await output(resUrl, newResData, outDir);
                                }
                            }
                        }
                    }
                    await callback(response, page, browser, helper, outDir);
                }

                outputOneCallback(isM3u8);

                // clearTimeout(closeBrowserTimer);
                // closeBrowserTimer = setTimeout(async() => {
                //   log2('before close browser!')
                //   await browser.close();
                // }, 5000);
            }
        });
    }

    // await page.goto(url, { waitUntil: "networkidle2" });
    // await page.goto(url, { waitUntil: "load" });
    // await page.goto(url, {referer: config.listPage.url, waitUntil: 'networkidle0' , timeout: 10 * 1000}).catch(err => {
    // await page.goto(url, {referer: config.listPage.url, waitUntil: 'domcontentloaded' , timeout: 10 * 1000}).catch(err => {
    await page
        .goto(url, {
            referer: config.listPage.url,
            waitUntil: "networkidle0",
            // waitUntil: "load",
            timeout: 20 * 1000,
            // timeout: 10 * 1000,
        })
        .catch((err) => {
            log2("goto timeout error:", url, err.message);
        });

    gotoDone = true;
    // await sleep(2);
    log2("goto done!!");

    // await page.waitForSelector(".avatar.userbtn");
    // await page.click(".avatar.userbtn");

    isDownContent = isDownContent == null ? true : isDownContent;

    if (isDownContent) {
        const con = await page.content();
        // log('=====', con)
        await output(url, con);

        if (!reList.length) {
            await browser.close();
        }
    }
    // if (config.detailPage.isIframe) {
    //     log2('sleep a while')
    //     await sleep(18)
    // }


    const jsResult = await page.evaluate((config) => {
        console.log("detail config:", JSON.stringify(config));
        let root = document;
        let selector = config.detailPage.selector;
        const isIframe = config.detailPage.isIframe;
        const frameEles = Array.from(document.querySelectorAll('iframe')).filter(frame => frame.getAttribute('src') && frame.getAttribute('src').match(/^(http|\/)/))
        console.log("🚀 ~ file: index.js:541 ~ jsResult ~ frameEles.length:", frameEles.length, window.frames.length)

        const vidDiv = document.querySelector('#playbox')
        let frameSrc = frameEles?.[0]?.getAttribute('src') ?? 'https://tup.yinghua8.tv/?vid=' + vidDiv?.getAttribute('data-vid')
        
        if (isIframe && frameSrc) {
            let newHref = location.href
            console.log("🚀 ~ file: index.js:542 ~ jsResult ~ frameSrc:", frameSrc)
            if (frameSrc.match(/^(https?:)?\/\//)) {
                newHref = frameSrc
            } else {
                let oUrl = new URL(location.href)
                if (frameSrc.startsWith('/')) {
                    newHref = oUrl.origin + frameSrc
                } else {
                    newHref = oUrl.origin + oUrl.pathname.replace(/\/\w+$/, '/') + frameSrc.replace(/^\.\//, '')
                }
            }

            location.href = newHref
            frameSrc = newHref

            return {frameSrc}
        }

        if (!selector) return;

        root = (selector.root && document.querySelector(selector.root)) || root;
        const nextBtn = root.querySelector(selector.nextBtn);

        const goNext = () => {
            nextBtn.click();
        };

        // goNext()
        // console.log("detail config:", config);
    }, config);

    console.log("🚀 ~ file: index.js:561 ~ //awaitpage.goto ~ jsResult:", jsResult)

    if (jsResult && jsResult.frameSrc) {

        log2('重定向到新的地址 ', jsResult.frameSrc)
        await page.goto(jsResult.frameSrc, {waitUntil: 'networkidle0', timeout: 60 * 1000})
    }
    // closeBrowserTimer = setTimeout(async() => {
    //   log2('at last before close browser...');
    //   await browser.close();
    // }, 5000);

    return downPromise;
}

function sleep(seconds = 1) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

var helper = {
    log,
    log2,
    getList,
    output,
    downPage,
    download,
};

module.exports = helper;
