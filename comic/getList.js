const fs = require("fs-extra");
const urlTool = require("url");
const path = require("path");
const { intercept, patterns } = require("puppeteer-interceptor");
const configModule = require("../config/index.js");
const config = configModule.data;
const { runCommand, spawnCommand } = require("./runCommand.js");
const {
    isStream,
    isUrl,
    log,
    log2,
    sleep,
    setCacheList,
    getCacheList,
    axios,
    download,
    output,
} = require("./common.js");
const puppeteer = require("puppeteer");

async function getList(skipCache) {
    if (!config.nocache && !skipCache) {
        let cached = getCacheList();
        if (cached) {
            log("GET LIST FROM CACHE", cached);
            return cached;
        }
    }

    const headless = "new";
    // const headless = false;
    const browser = await puppeteer.launch({
        executablePath:
            "C:\\Users\\pan\\AppData\\Local\\google\\Chrome\\Application\\chrome.exe",

        // headless: "new",
        // headless: false,
        headless,

        // headless: true,

        userDataDir:
            "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\Default",

        // devtools: true,
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

    // !!! change response
    // intercept(page, patterns.Script("*huadong*"), {
    //     onResponseReceived(event) {
    //         log2(
    //             "INTERCEPT SCRIPT:",
    //             event.request.url,
    //             typeof event.response.body
    //         );
    //         // event.response.body = event.response.body.replace(
    //         //     /new SliderTools/m,
    //         //     " window._slider = $&"
    //         // );
    //         event.response.body =
    //             'console.log("KK GGGG");' + event.response.body;
    //         return event.response;
    //     },
    // });

    try {
        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 20 * 1000,
        });

        // !!! set cookies
        // await page.setCookie({
        //     name: "56f12a26f4f750a844bf4f904a371079",
        //     value: "d846c1016732002e7ff57f25d4bda8c3",
        //     secure: true,
        //     url,
        //     domain: "www.cz01.pro",
        //     path: "/",
        //     expires: Date.now() + 3600 * 1000,
        // });

        // const cookies = await page.cookies("www.cz01.pro");
        // console.log("🚀 ~ file: getList.js:57 ~ getList ~ cookies:", cookies);

        // await page.reload({
        //     waitUntil: "domcontentloaded",
        //     timeout: 20 * 1000,
        // });
    } catch (e) {
        log("OPEN PAGE ERR :(  ", e);
    }
    log("OPEN PAGE DONE:", url);

    // await client render finish
    await sleep(5);

    // evaluate callback
    // 页面打开后，执行自定义回调，并传入config对象
    let links = await page.evaluate((config) => {
        // console.log('========', JSON.stringify(config))
        console.log(
            "=====> KKK",
            JSON.stringify(config),
            "selector: ",
            config.listPage.selector
        );
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
        console.log("links.length:::", links.length);

        if (!links.length) {
            console.log(
                "==> KK: 获取不到sn链接, 可能有反爬, 可尝试设置 headless: new, body html:",
                document.body.innerHTML,
                "cookie::",
                document.cookie
                // "typeof window._slider::",
                // typeof window._slider
            );
        }
        links = Array.from(links);
        links = links.map((link) => [link.href, link.textContent]);
        console.log("links:::", JSON.stringify(links));
        return links;
        // return document.title
    }, config);

    links = links || [];

    // make sure desc order
    links.sort((a, b) => {
        let an = parseInt(a[1].replace(/\D/g, "") || 0);
        let bn = parseInt(b[1].replace(/\D/g, "") || 0);
        return bn - an;
    });

    log2(
        `===>>> GOT LINKS ${top ? "of top " + top : ""}:`,
        top ? links.slice(0, top) : links
    );

    log2("WILL CLOSE BROWSER, headless:", headless);
    if (headless) {
        await browser.close();
    }

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

module.exports = getList;
