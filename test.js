const axios = require("axios");
const puppeteer = require("puppeteer");

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
  await page.goto(testUrl, { waitUntil: 'load'});
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
    const browser = await puppeteer.launch({ headless: false, devtools: true})
    const page = await browser.newPage()
    
    page.on('console', msg => log('PAGE LOG:', msg.text()));
    // 页面崩溃时触发
    page.on('error', msg => {
        log('PAGE CRASH:', msg)
    })
    // js报错时触发
    page.on('pageerror', msg => {
        log('PAGE ERROR:', msg);
    })
    await page.goto(testUrl, {waitUntil: 'load'}) 
    await page.evaluate(() => {
        console.log('ths url is ', location.href)
        console.log('are', 'you', 'like', 'comic?');
        // console.log('some error', badVarName) // 导致page.evaluate错误，node程序终止
        console.log('goodbye')
    })
    // await browser.close()

}


async function testErrorHandle() {
    const { TimeoutError } = require('puppeteer/Errors') // bad not this Module
    log('TimeoutError', TimeoutError)
}


async function testQuerySelector() {
    const browser = await puppeteer.launch({ headless: 'new'})
    const page = await browser.newPage()
    await page.goto(testUrl, {waitUntil: 'load'})
    const ele = await page.$('h1')
    log('ele.textContent', ele, ele.textContent)

    const result = await page.$eval('h1', (ele, conf) => {
        const text = ele.textContent
        return {text, conf}
    }, 'myconfig')

    log('result:', result)
    await browser.close()
} 

function main() {
  // testAxios()
  // testScreenshot()
  // testPdf();
  // testRunScriptInPage()
  // testListenConsole()
  // testErrorHandle()
  testQuerySelector()
}

main();
