const fs = require("fs-extra");
const urlTool = require("url");
const path = require("path");
const configModule = require("../config/index.js");
const config = configModule.data;
const { runCommand, spawnCommand } = require("./runCommand.js");
const {
    isStream,
    isUrl,
    log,
    log2,
    logWithLines,
    sleep,
    setCacheList,
    getCacheList,
    axios,
    download,
    output,
} = require("./common.js");
const helper = require("./common.js");
const puppeteer = require("puppeteer");

// yarn d junmoxie 9
const MY_DEBUG = {
    isLogEachResponse: false,
    downTimeoutSeconds: 22,
};

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
    const resourceUrl = getResourceUrl(resUrl, resourcePath);
    const res = await axios.get(resourceUrl); // 若发生重定向，axios会获取重定向后的请求的结果
    const headers = res.headers || {};
    const location = headers.location || headers.Location;
    log2("got location:", location);
    return location;
}

async function getNewM3u8By302(resData, resUrl) {
    const lines = resData.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/#EXTINF/.test(line)) {
            lines[i + 1] =
                (await getRedirectUrl(resUrl, lines[i + 1])) || lines[i + 1];
        }
    }

    const newResData = lines.join("\n");
    log2("-----------> getNewM3u8By302 newResData:", newResData);
    return newResData;
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
    const outputOneCallback = async (msg) => {
        // outputListeners.forEach(cb => cb())
        if (outputCount >= expectCount) {
            log2(
                "[outputOneCallback]",
                msg,
                "before close browser and resolve download promise"
            );
            await sleep(2);
            // await browser.close();
            // await closeBrowser();
            await closeBrowser();
            resolve(true);
        } else {
            log2(`outputCout: ${outputCount}, expectCount: ${expectCount}`);
            for (const cb of outputListeners) {
                await cb();
            }
        }
    };

    const closeBrowser = async () => {
        log2("WILL CLOSE BROWSER, gotoDone:", gotoDone);

        await sleep(3);

        try {
            if (gotoDone) {
                await browser.close();
                log2("BROWSER CLOSE FINISHED!");
            } else {
                closeBrowser();
            }
        } catch (err) {
            log2("close browser error::", err);
        }
    };

    const browser = await puppeteer.launch({
        // product: 'firefox',

        // executablePath: '/usr/lib/chromium-browser/chromium-browser',
        executablePath:
            "C:\\Users\\pan\\AppData\\Local\\google\\Chrome\\Application\\chrome.exe",
        userDataDir:
            "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\Default",

        // headless: true,

        headless: "new",
        // headless: false,

        devtools: true,
    });

    let gotoDone = false;
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 800 });

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

    // page.on("console", (msg) => log("console:", msg.text()));
    page.on("pageerror", (error) => log2("on page error:", error));

    // page.on("framenavigated", (frame) => {

    let hasJumpFrame = false;
    page.on("frameattached", (frame) => {
        log2("FRAME ATTACHED CALLBACK~~, page.hasOutput:", page.hasOutput);

        // return;

        if (page.hasOutput) return;

        const frmPage = frame.page();
        const frameUrl = frame.url() || "";

        log2("FRAME URL is:", frameUrl);

        if (!frameUrl) return;

        frmPage.on("response", async (resp) => {
            if (page.hasOutput) return;

            if (!hasJumpFrame && frameUrl.startsWith("http")) {
                hasJumpFrame = true;
                await sleep(1);
                log2(
                    "====> TEMP STOP GOTO FRAME:",
                    frame.url(),
                    "isIframe:",
                    isIframe
                );
                // isIframe && (await page.goto(frame.url(), { waitUntil: "load" }));
                // await page.goto(frame.url(), { waitUntil: "load" });

                // KK: temp disable goto new page
                await page.goto(frame.url(), { waitUntil: "domcontentloaded" });
            }
        });
    });

    if (reList.length) {
        // listen response , capture wanted
        const doneSet = new Set();
        const linksOf302 = [];
        page.on("response", async (response) => {
            if (page.hasOutput) return;
            if (outputCount >= expectCount) return;

            let resUrl = response.url();
            const status = response.status();
            const contentType = response.headers()["content-type"];
            if (status === 302) {
                const location = response.headers()["location"];
                log2(
                    "got 302 response:",
                    "location:",
                    location,
                    "\n",
                    "resUrl:",
                    resUrl
                );
                linksOf302.push(resUrl);
            }
            let normalResUrl = decodeURIComponent(resUrl.split("?")[0]);
            let resFile = path.basename(normalResUrl);
            // log static file response
            // if(/\.\w{3,5}$/.test(resFile)) {
            //   log('on response file:', resFile)
            // }

            // log('on response file:', resFile)
            let isM3u8Mode = false;
            if (typeof checkIsM3u8 === "function") {
                isM3u8Mode = checkIsM3u8(response);
            }

            // :: log every response url and status
            MY_DEBUG.isLogEachResponse &&
                log(
                    "MAIN-RESPONSE:",
                    status,
                    contentType,
                    "isM3u8Mode:",
                    isM3u8Mode,
                    resUrl
                );

            if (resUrl.includes(".m3u8")) {
                log2("=========>>>> ON RESPONSE M3U8 resUrl:", resUrl);
            }

            let wanted = false;
            if (isMp4 && /mp4/.test(contentType)) {
                wanted = status === 206 || reList.some((re) => re.test(resUrl));
            } else {
                wanted = reList.some((re) => re.test(normalResUrl));
            }

            if (isM3u8Mode) {
                isM3u8 = true;
                isMp4 = false;
            }

            if (wanted) {
                log2("wanted ==>", wanted, "isMp4 =>", isMp4);
                // const status = response.status();
                if (isMp4) {
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

                // parse sn from title

                let title = "";
                try {
                    await Promise.race[
                        (new Promise((resolveFn) =>
                            setTimeout(() => resolveFn(""), 1000)
                        ),
                        page.title())
                    ];
                } catch (err) {
                    log("get page.title() error:", err);
                }

                let sn =
                    urlInfo.sn ||
                    (title.match(/\d+/g) ? title.match(/\d+/g)[0] : "");
                sn = sn + "";
                response.sn = sn;
                let outDir = path.resolve(config.output, sn);

                log2("====>>> GOT WANTED,", status, normalResUrl);

                if (status === 302 || status === 301) {
                    wanted = false;
                    const location = response.headers()["location"];
                    outputCount += 1;
                    fs.ensureDirSync(outDir);
                    const outFile = `${outDir}${path.sep}index.m3u8`;
                    page.hasOutput = true;
                    log2(
                        "1===------------> 302 location:",
                        location,
                        "outFile:",
                        outFile
                    );
                    await spawnCommand("curl", ["-o", outFile, location]);

                    outputOneCallback(`REDIRECT status: ${status}`);
                    return false;
                }

                log("on reponse file, getting buffer:", resFile);
                // let buf = isMp4 ? false : await response.buffer();
                let buf = null;
                if (isMp4) {
                    buf = false;
                } else {
                    try {
                        buf = await response.buffer();
                    } catch (err) {
                        log2("response.buffer() got some error::", err);
                    }
                }
                // log(resFile, 'CONTENT:', buf.toString('utf8'))
                const defConCheck = function (con) {
                    return (
                        /X-ENDLIST/im.test(con) && con.split(/\n/).length > 50
                    );
                };
                conCheck = conCheck || defConCheck;
                if (!isMp4 && buf && conCheck) {
                    // check content, ensure it is wanted response
                    let conOK = conCheck(buf.toString("utf8"));
                    if (!conOK) {
                        buf = "URL IS:" + "\n" + resUrl + "\n" + buf.toString();
                        wanted = false;
                        log2("m3u8 content not ok..., and will close browser");
                        closeBrowser();
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
                    page.hasOutput = true;
                    await spawnCommand("curl", ["-o", outFile, resUrl]);
                    // await spawnCommand('curl', [`-o ${sn}.mp4`, `${resUrl}`])
                    // await runCommand(`curl -o ${outDir}${path.sep}index.mp4 "${resUrl}"`)
                } else {
                    if (!buf) {
                        log2("GET BUF FAIL, NOT WANTED", buf);
                        wanted = false;
                        return;
                    }

                    page.hasOutput = true;
                    log2("2===-------> before output:", resUrl, outDir);
                    await output(resUrl, buf, outDir);
                }

                if (callback && typeof callback === "function") {
                    const needRedirect = false;
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
                                const location = await getRedirectUrl(
                                    resUrl,
                                    firstTsLine
                                );
                                const shouldRedirect =
                                    linksOf302.includes(firstTsLine);
                                if (shouldRedirect) {
                                    log2("开始执行重定向更新索引文件..");
                                    const newResData = await getNewM3u8By302(
                                        resData,
                                        resUrl
                                    );
                                    // update m3u8 file
                                    log2("3===----------->", resUrl, outDir);
                                    await output(resUrl, newResData, outDir);
                                }
                            }
                        }
                    }
                    await callback({ response, page, browser, helper, outDir });
                }

                outputOneCallback(
                    `AT END , wanted: ${wanted}, isM3u8: ${isM3u8}`
                );

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
            waitUntil: "domcontentloaded",
            // waitUntil: "networkidle0",
            // waitUntil: "load",
            timeout: 30 * 1000,
            // timeout: 10 * 1000,
        })
        .catch((err) => {
            log2("goto timeout error:", url, err.message);
        });

    gotoDone = true;
    // await sleep(2);
    log2("goto done!!");

    // ensure close browser
    // setTimeout(closeBrowser, 1000 * 50);
    setTimeout(() => {
        log2("======> TIME OUT, AND RESOLVE THE DOWNLOAD PROMISE");
        resolve(false);
    }, 1000 * MY_DEBUG.downTimeoutSeconds);

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
        const frameEles = Array.from(
            document.querySelectorAll("iframe")
        ).filter(
            (frame) =>
                frame.getAttribute("src") &&
                frame.getAttribute("src").match(/^(http|\/)/)
        );
        console.log(
            "🚀 ~ file: index.js:541 ~ jsResult ~ frameEles.length:",
            window.frames.length
        );

        const vidDiv = document.querySelector("#playbox");
        let frameSrc =
            frameEles?.[0]?.getAttribute("src") ??
            "https://tup.yinghua8.tv/?vid=" + vidDiv?.getAttribute("data-vid");

        if (isIframe && frameSrc) {
            let newHref = location.href;
            if (frameSrc.match(/^(https?:)?\/\//)) {
                newHref = frameSrc;
            } else {
                let oUrl = new URL(location.href);
                if (frameSrc.startsWith("/")) {
                    newHref = oUrl.origin + frameSrc;
                } else {
                    newHref =
                        oUrl.origin +
                        oUrl.pathname.replace(/\/\w+$/, "/") +
                        frameSrc.replace(/^\.\//, "");
                }
            }

            location.href = newHref;
            frameSrc = newHref;

            return { frameSrc };
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

    log2("after page evaluate, jsResult:", jsResult);

    if (jsResult && jsResult.frameSrc) {
        log2("重定向到新的地址 ", jsResult.frameSrc);
        await page.goto(jsResult.frameSrc, {
            waitUntil: "networkidle0",
            timeout: 60 * 1000,
        });
    }

    // closeBrowserTimer = setTimeout(async() => {
    //   log2('at last before close browser...');
    //   await browser.close();
    // }, 5000);

    log2("=====> before return download promise");
    return downPromise;
}

module.exports = downPage;
