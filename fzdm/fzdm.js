const http = require("http");
const path = require("path");
const url = require("url");
const axios = require("axios");
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const myAxios = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

const isNew = !!process.argv[2];

console.log("starting... isNew", isNew);

const port = 8080;

const oldSite = "https://manhua.fzdm.com";
const newSite = "https://www.fffdm.com";
const site = isNew ? newSite : oldSite;

function getPicUrl(html, url) {
    // const window = new JSDOM(html, { url, runScripts: "dangerously" }).window;
    const window = new JSDOM(html, { url }).window;
    const dataScripts = Array.from(
        window.document.querySelectorAll("script[type*=json]")
    );
    const dataScript = dataScripts.filter((script) =>
        script.getAttribute("data-url").match(/\/api\/manhua\/\d+/)
    )[0];
    let res = {};
    let imgList = [];
    let pic = "";
    let pic2 = "";
    if (dataScript) {
        res = JSON.parse(dataScript.text);
        if (typeof res.body === "string") {
            const resBody = JSON.parse(res.body);
            imgList = resBody.cont;
        }
        const baseUrl = "https://p1.fffdm.live/";
        imgList = imgList.map(
            (imgPath) => baseUrl + imgPath.replace(/^\//, "")
        );
    }

    const imgEle = window.document.querySelector("#mh img[width='0']");
    if (imgEle) {
        pic = imgEle.getAttribute("src");
    }

    const nextBtn = window.document.querySelector(
        ".navigation .pure-button:last-child"
    );
    const isLast = nextBtn.classList.toString().includes("disable");

    return { pic, pic2, imgList, nextChapter: isLast ? "no" : "yes" };
}

function getHtml({ picUrl, pic2Url, imgList, nextChapter }) {
    let con = picUrl
        ? `<img class="mhpic" src="${picUrl}" referrerpolicy="no-referrer" />${
              pic2Url
                  ? `<img class="mhpic2" width="0" height="0" src="${pic2Url}" referrerpolicy="no-referrer" />`
                  : ""
          }${nextChapter || ""}`
        : "<h1> no pic, next chapter?</h1>";

    if (imgList.length) {
        con = imgList
            .map((imgUrl) => `<img class="mhpic" src="${imgUrl}" />`)
            .join("\n");
    }

    const html = `
  <!DOCTYPE html>
  <html>
  <body>
  <style>
  body {
    position: relative;
  }
  .mhpic {
    width: 100%;
  }
  .mhpic + a {
    display: block;
    line-height: 40px;
    font-size: 30px;
    text-align: center;
    width: 100%;
    background: #eee;
  }
  .prev, .next {
    height: 100%;
    width: 20%;
    position: absolute;
    top: 0;
    cursor: pointer;
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
  </style>
  <script>
    const isListAll = ${imgList.length ? "true" : "false"};
    function goto(next) {
      if (!isListAll) {
        location.pathname = location.pathname.replace(/(\\d+)\\.html/, (m, n) => {
          var n2 = n * 1 + (next ? 1 : -1);
          return n2 + '.html';
        })

      } else {
        location.pathname = location.pathname.replace(/\\/(\\d+)\\/\\D*\\d+\\.html/, (m, n) => {
          var n2 = n * 1 + (next ? 1 : -1);
          return m.replace('/' + n + '/', '/' + n2 + '/')
        })
      }
    }
    function $(s) {
      return document.querySelector(s);
    }
    document.addEventListener('DOMContentLoaded', () => {
      var prev = $('.prev');
      var next = $('.next');
      prev.addEventListener('click', () => goto(false));
      next.addEventListener('click', () => goto(true));
    });

    document.addEventListener('keyup', (event) => {
      if(event.keyCode === 13) {
        goto(true);
      } else if(event.keyCode === 39) {
        goto(true);
      } else if(event.keyCode === 37) {
        goto(false);
      }
    })

  </script>
  <i class="prev"></i>
  <i class="next"></i>
  ${con}
  </body>
  </html>
  `;
    return html;
}

function stringify(data) {
    if (!data) {
        return "1";
    }
    return JSON.stringify(data, null, 2);
}

function log(...args) {
    console.log(":::", ...args);
}

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    log("req.url:", req.url);
    if (["/"].includes(req.url) || req.url.includes("favicon.ico")) {
        res.end("welcome to fzdm");
        return;
    }
    if (req.url.includes("html") === false) {
        log("will redirect to:", req.url + "/index_0.html");
        res.writeHead(301, {
            location: (req.url + "/index_0.html").replace(/\/\//g, "/"),
        });
        res.end("");
        return;
    }

    const comicPath = req.url; // /02/997/index_0.html
    let comicRes = "";
    const comicUrl = site + comicPath;
    log("comicUrl:", comicUrl);
    try {
        comicRes = await myAxios.get(comicUrl, {
            "content-type": "text/html",
        });
        // log("comicRes", comicRes);
    } catch (e) {
        // console.warn("axios error: e.config is ", e.config);
        console.warn("axios error:  ", comicUrl, e);
        res.end(
            "axios error,  " +
                comicUrl +
                " ; can try newSite: " +
                newSite +
                req.url
        );
        return;
    }
    // preview comic with no ads
    const html = getHtml(getPicUrl(comicRes.data, comicUrl));
    res.end(html);
});

// browser visit: http://localhost:8080/24/248/index_0.html
// original visit: https://manhua.fffdm.com/24/248/
server.listen(port, () => {
    console.log("listening at ", `http://localhost:${port}`);
});
