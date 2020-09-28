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

function getCacheList() {
  var downName = process.argv[3] || 'hello'
  var fpath = path.resolve(__dirname, '../output', downName, 'list.json')
  let exists = fs.existsSync(fpath)
  return exists ? fs.readJsonSync(fpath) : false
}

function setCacheList(data) {
  var downName = process.argv[3] || 'hello'
  var fpath = path.resolve(__dirname, '../output', downName, 'list.json')

  fs.outputJSON(fpath, data)
}

async function getList() {
  if(!config.nocache) {
    let cached = getCacheList()
    if(cached) {
      return cached
    }

  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    // console.log("PAGE CONSOLE:", msg.text());
  });

  let { url } = config.listPage;
  log("going to page:", url);

  // await page.goto(url, { waitUntil: "networkidle0", timeout: 80 * 1000 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 80 * 1000 });
  // await page.goto(url, { waitUntil: "load", timeout: 80 * 1000 });
  const links = await page.evaluate((config) => {
    // console.log('========', JSON.stringify(config))
    var links = document.querySelectorAll(config.listPage.selector);
    links = Array.from(links);
    links = links.map((link) => [link.href, link.textContent]);
    return links;
    // return document.title
  }, config);

  log2('get links:', links);
  await browser.close();

  setCacheList(links)
  
  return links;
}

async function downPage(url) {
  log("downloading page:", url);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let { reList = [], downContent: isDownContent, callback , conCheck} = config.detailPage;

  if (reList.length) {
    page.on("response", async (response) => {
      let url = response.url();
      let resFile = path.basename(url.split('?')[0])
      if(/\.\w{3,5}$/.test(resFile)) {
        // log('on response file:', resFile)
      }

      let normalUrl = url.split('?')[0]
      let wanted = reList.some((re) => re.test(normalUrl));
      if (wanted) {
        
        
        let title = await page.title()
        let sn = title.match(/\d+/g)[0] || ''
        response.sn = sn
        let outDir = path.resolve(config.output, sn)
        
        let buf = await response.buffer();
        log('on reponse file, match reList:', resFile)
        // log(resFile, 'CONTENT:', buf.toString('utf8'))
        
        if(conCheck) {
          let conOK = conCheck(buf.toString('utf8'))
          if(!conOK) {
            buf = 'URL IS:' + '\n' + url + '\n' + buf.toString()
          }
        }
        
        // if(!wanted) return
        
        log2("outputing url:", url);

        await output(url, buf, outDir);

        if (callback && typeof callback === "function") {
          await callback(response, page, browser, helper);
        }
      }
    });
  }

  // await page.goto(url, { waitUntil: "networkidle2" });
  await page.goto(url, { waitUntil: "networkidle0" , timeout: 80 * 1000}).catch(err => {
    log2('goto ', url, err.message)
  });

  log("goto done!!");

  isDownContent = isDownContent == null ? true : isDownContent;

  if (isDownContent) {
    const con = await page.content();
    // log('=====', con)
    await output(url, con);

    if(!reList.length) {
      await browser.close();
    }
  }

  setTimeout(async() => {
    await browser.close();

  }, 4000)

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
