const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const config = require("../config/index.js");

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
async function download(url, outDir = '', responseType = "stream", outputCallback) {
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
  outDir = outDir || config.output
  fs.ensureDirSync(outDir)

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
        if(typeof outputCallback === 'function') {
          outputCallback(outFile)
        }
        resolve(true);
      });
    } else {
      let err = fs.writeFileSync(outFile, con, { encoding: "utf8" });
      if (err) {
        log2("output err:", err);
        resolve(false);
      } else {
        log("output file:", fname);
        
        if(typeof outputCallback=== 'function') {
          outputCallback(outFile)
        }

        resolve(true);
      }
    }
  });
}

function listJsonFilePath() {
  var downName = process.argv[3] || 'hello'
  var fpath = path.resolve(__dirname, '../output', downName, 'list.json')

  return fpath
}

function getCacheList() {
  var fpath = listJsonFilePath()
  let exists = fs.existsSync(fpath)
  return exists ? fs.readJsonSync(fpath) : false
}

function setCacheList(data) {
  var fpath = listJsonFilePath()

  fs.outputJSON(fpath, data)
}

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

async function getList(skipCache) {
  if(!config.nocache && !skipCache) {
    let cached = getCacheList()
    if(cached) {
      helper.log('GET LIST FROM CACHE', cached)
      return cached
    }

  }

  const browser = await puppeteer.launch({ headless: true, args: ['--lang=zh-CN'] });
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log("PAGE CONSOLE:", msg.text());
  });

  let { url , top } = config.listPage;
  log("GOING TO LIST PAGE:", `'${url}'`);

  // await page.goto(url, { waitUntil: "networkidle0", timeout: 80 * 1000 });
  // await page.goto(url, { waitUntil: "networkidle2", timeout: 80 * 1000 });
  // await page.goto(url, { waitUntil: "load", timeout: 80 * 1000 });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20 * 1000 });

  }catch(e) {
    log('OPEN PAGE ERR :(  ', e)
  }
  log('OPEN PAGE DONE:', url)

  // await client render finish
  await sleep(5)
  
  // evaluate callback
  // 页面打开后，执行自定义回调，并传入config对象
  const links = await page.evaluate((config) => {
    // console.log('========', JSON.stringify(config))
    let root = document;
    let selector = config.listPage.selector;
    if (Array.isArray(config.listPage.selector)) {
      let [rootSelector, linkSelector] = config.listPage.selector;

      root = document.querySelector(rootSelector);
      if(!root) {
        console.warn('\n[ERR]:', `找不到元素 ${rootSelector} \n`);
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
    let an = parseInt(a[1].replace(/\D/g, '') || 0)
    let bn = parseInt(b[1].replace(/\D/g, '') || 0)
    return bn - an
  });

  log2(`get links ${top ? 'of top ' + top : ''}:`, top ? links.slice(0, top) : links);
  await browser.close();

  printLatestDown();
  setCacheList(links)
  
  return links;
}

function printLatestDown() {
  let files = fs.readdirSync(config.output);
  // skip dot files
  var names = files.filter(fname => !/^\./.test(fname)).map(val => val * 1)
  names.sort((a, b) => b - a);
  log2(`${config.output} latest down: `, names.slice(0, 3));
}

var closeBrowserTimer;
async function downPage(url, urlInfo = {}) {
  // if(closeBrowserTimer) clearTimeout(closeBrowserTimer)

  log2("downloading page:", url, urlInfo);
  const totalOfChapter = urlInfo.total || 1
  let { reList = [], downContent: isDownContent, callback , conCheck, expectCount = 1 } = config.detailPage;
  let outputCount = 0
  if (totalOfChapter) {
    expectCount = totalOfChapter
  }


  const outputListeners = []
  const listenOutputOne = (cb) => {
    if (!outputListeners.includes(cb)) outputListeners.push(cb)
  }
  const outputOneCallback = () => {
    outputListeners.forEach(cb => cb())
    if (outputCount >= expectCount) {
      helper.log2('before close browser!')
      setTimeout(async () => {
        await browser.close();

      }, 2000)
    }
  }

  const browser = await puppeteer.launch({
    // product: 'firefox',

    // executablePath: '/usr/lib/chromium-browser/chromium-browser', 
    // headless: true,
    headless: "new",
    devtools: true, 
  });
  const page = await browser.newPage();

  const clickNextBtn = async function() {
    const { root = '', nextBtn = ''} = config.detailPage.selector
    const selector = (root + ' ' + nextBtn).trim()
    if (!selector) return
    await page.click(selector)
  }

  listenOutputOne(clickNextBtn)

  page.on('console', msg => log('console:', msg.text()))
  page.on('pageerror', error => log2('error:', error))

  if (reList.length) {
    // listen response , capture wanted
    const doneSet = new Set()
    page.on("response", async (response) => {
      if (outputCount >= expectCount) return

      let resUrl = response.url();
      let normalResUrl = resUrl.split('?')[0]
      let resFile = path.basename(normalResUrl)
      // log static file response
      // if(/\.\w{3,5}$/.test(resFile)) {
      //   log('on response file:', resFile)
      // }
      log('on response file:', resFile)

      let wanted = reList.some((re) => re.test(normalResUrl));
      if (wanted) {
        log2('got wanted,', normalResUrl)
        
        // parse sn from title
        
        let title = await page.title()
        let sn =  urlInfo.sn || (title.match(/\d+/g) ? title.match(/\d+/g)[0] : '') 
        sn = sn + ''
        response.sn = sn
        let outDir = path.resolve(config.output, sn)
        
        log('on reponse file, getting buffer:', resFile)
        let buf = await response.buffer();
        // log(resFile, 'CONTENT:', buf.toString('utf8'))
        
        if(conCheck) {
          // check content, ensure it is wanted response
          let conOK = conCheck(buf.toString('utf8'))
          if(!conOK) {
            buf = 'URL IS:' + '\n' + resUrl + '\n' + buf.toString()
            wanted = false;
            log2('m3u8 content not ok...')
          }
        }
        
        if(!wanted) return
        if (doneSet.has(normalResUrl)) return
        doneSet.add(normalResUrl)
        outputCount += 1
        log2(`outputing url ${outputCount}/${expectCount}:`, resUrl);

        await output(resUrl, buf, outDir);

        if (callback && typeof callback === "function") {
          await callback(response, page, browser, helper);
        }

        outputOneCallback()

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
  await page.goto(url, {referer: config.listPage.url, waitUntil: 'networkidle0' , timeout: 200 * 1000}).catch(err => {
    log2('goto timeout error:', url, err.message)
  });
  
  // await sleep(2);
  log2("goto done!!");

  isDownContent = isDownContent == null ? true : isDownContent;

  if (isDownContent) {
    const con = await page.content();
    // log('=====', con)
    await output(url, con);

    if(!reList.length) {
      await browser.close();
    }
  }

  await page.evaluate(config => {
    let root = document
    let selector = config.detailPage.selector
    if (!selector) return


    root = selector.root && document.querySelector(selector.root) || root
    const nextBtn = root.querySelector(selector.nextBtn)

    const goNext = () => {
      nextBtn.click()
    }

   // goNext()
   console.log('detail config:', config)

  }, config)

  // closeBrowserTimer = setTimeout(async() => {
  //   log2('at last before close browser...');
  //   await browser.close();
  // }, 5000);

}

function sleep(seconds = 1) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
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
