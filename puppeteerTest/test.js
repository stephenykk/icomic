const axios = require("axios");
const puppeteer = require("puppeteer");
const crypto = require("crypto");

// cd puppeteerTest && http-server -p 8899
const testUrl = "http://localhost:8899";

function log(...args) {
    console.log(":::", ...args);
}

log("process.argv:", process.argv);

async function testAxios() {
    log(typeof axios);
    axios.defaults.timeout = 2000;

    // let res = await axios.get('https://news.cnblogs.com/n/672493/')
    // let res = await axios.get('https://pic.cnblogs.com/face/510/20200828135901XX.png')

    log("starting get url");
    let res = await axios
        .get(testUrl)
        .catch((e) => log("bad error:", e.message));
    log("after axios");
    log(res);
}

async function testScreenshot() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 800, deviceScaleFactor: 1 });
    await page.goto(testUrl, { waitUntil: "networkidle2" });
    await page.screenshot({ path: "hello.png" });
    log("output screenshot done.");
    await browser.close();
}

async function testPdf() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(testUrl, { waitUntil: "networkidle2" });
    await page.pdf({ path: "hello.pdf", format: "A4" });
    log("output pdf done.");
    await browser.close();
}

async function testRunScriptInPage() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(testUrl, { waitUntil: "load" });
    const dimesions = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        const height = window.innerHeight;
        const deviceScaleFactor = window.devicePixelRatio;

        return {
            width,
            height,
            deviceScaleFactor,
        };
    });

    log("dimesions", dimesions);

    await browser.close();
}

// 用于调试  listen console event, or launch({ headless: false, slowMo: 250 }) , launch({devtools: true})
// await page.evaluate(() => { debugger })
// env DEBUG="puppeteer:*" node script.js
async function testListenConsole() {
    // const browser = await puppeteer.launch({ headless: 'new'})
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();

    page.on("console", (msg) => log("PAGE LOG:", msg.text()));
    // 页面崩溃时触发
    page.on("error", (msg) => {
        log("PAGE CRASH:", msg);
    });
    // js报错时触发
    page.on("pageerror", (msg) => {
        log("PAGE ERROR:", msg);
    });
    await page.goto(testUrl, { waitUntil: "load" });
    await page.evaluate(() => {
        console.log("ths url is ", location.href);
        console.log("are", "you", "like", "comic?");
        // console.log('some error', badVarName) // 导致page.evaluate错误，node程序终止
        console.log("goodbye");
    });
    // await browser.close()
}

async function testErrorHandle() {
    const { TimeoutError } = require("puppeteer/Errors"); // bad not this Module
    log("TimeoutError", TimeoutError);
}

async function testQuerySelector() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(testUrl, { waitUntil: "load" });
    const ele = await page.$("h1");
    log("ele.textContent", ele, ele.textContent);

    const result = await page.$eval(
        "h1",
        (ele, conf) => {
            const text = ele.textContent;
            return { text, conf };
        },
        "myconfig"
    );

    log("result:", result);
    await browser.close();
}

function md5(text) {
    return crypto.createHash("md5").update(text).digest("hex");
}

async function testExposeFunction() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on("console", (msg) => log(msg.text()));
    await page.exposeFunction("md5", md5);
    await page.goto(testUrl, { waitUntil: "load" });
    const hash = await page.evaluate(() => {
        const con = document.querySelector("h1").textContent;
        const hash = window.md5(con);
        return hash;
    });

    log("exposeFunction call result:", hash);

    await browser.close();
}

async function testWaitForResponse() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on("console", (msg) => log(msg.text()));
    page.on("response", (res) => {
        log("got response:", res.url());
    });

    // await page.goto(testUrl, {waitUntil: 'load'})
    await page.goto(testUrl, { waitUntil: "networkidle0" });
    log("goto page done");
    await page.click(".btn");
    const resp = await page.waitForResponse((res) =>
        res.url().includes("/world.json")
    );
    log("resp: ", resp.ok());
    if (resp.ok()) {
        const data = await resp.json();
        log("data::", data);
    }

    // await page.waitForTimeo`ut(3000)
    // await browser.close()
}

async function testWaitForSelector() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    page.on("console", (msg) => log(msg.text()));
    page.on("pageerror", (error) => log("error::", error));
    page.on("error", (error) => log("crash:", error));
    await page.goto(testUrl, { waitUntil: "load" });
    // const btn = await page.waitForSelector('.submit-btn')
    // log('goto done. btn:', btn)
    // await btn.click()
    const watchSubmitBtn = page.waitForFunction(
        () => !!document.querySelector(".submit-btn")
    );
    await watchSubmitBtn;
    await page.click(".submit-btn");
    await new Promise((resolve) => setTimeout(resolve, 1000, true));
    await browser.close();
}

async function testPageClick() {
    // const browser = await puppeteer.launch({headless: 'new'})
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    // 设置viewport ， 默认 800 *600 会被且切换到移动端页面， 移动端页面有下载app的广告弹层 导致模拟真实点击失败
    // await page.setViewport({width: 1440, height: 1000, deviceScaleFactor: 1})
    // await page.goto(testUrl, {waitUntil: 'load'})

    await page.goto("https://tel.dm5.com/m1436110/", { waitUntil: "load" });
    const pages = await browser.pages();
    const lastPage = pages[pages.length - 1];
    log(pages, "<---pages");
    const btnHandle = await lastPage.$(".userbtn");
    console.log(await btnHandle.jsonValue(), "<-------");
    await new Promise((resolve) => setTimeout(resolve, 10000, 1));
    console.log("before click btn");
    // 先关闭弹层
    await page.click(".lb-win-con a");
    await page.click(".userbtn");
    // await btnHandle.click()
}

function main() {
    log("START MY Test...");
    // testAxios()
    // testScreenshot()
    // testPdf();
    // testRunScriptInPage()
    // testListenConsole()
    // testErrorHandle()
    // testQuerySelector()
    // testExposeFunction()
    // testWaitForResponse()
    // testWaitForSelector()
    testPageClick();
}

main();
