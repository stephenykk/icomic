const http = require("http");
const path = require("path");
const url = require("url");
const axios = require("axios");

console.log("starting...");


const port = 8080;

const site = "https://manhua.fzdm.com";

function getPicUrl(html) {
  var imgSite = "http://www-mipengine-org.mipcdn.com/i/p3.manhuapan.com/";
  var mhurlRe = /var\s+mhurl\s*=\s*.*$/m;
  var matched = html.match(mhurlRe);
  var pic = false; // "http://www-mipengine-org.mipcdn.com/i/p3.manhuapan.com/2020/12/01142033158154.jpg";
  if (matched) {
    eval(matched[0]);
    pic = (imgSite + mhurl).replace(/(\w\/)\//, "$1");
  }

  var mhurlRe2 = /var\s+mhurl1\s*=\s*.*$/m;
  var m2 = html.match(mhurlRe2);
  var pic2 = false;
  if (m2) {
    eval(m2[0]);
    pic2 = (imgSite + mhurl1).replace(/(\w\/)\//, "$1");
  }

  const nextChapterRe = /最后一页了(.*)?<a[^>]*>.*?<\/a>/m;
  const m3 = html.match(nextChapterRe);

  return { pic, pic2, nextChapter: m3 ? m3[0] : false };
}

function getHtml(picUrl, pic2Url, nextChapter) {
  const con = picUrl
    ? `<img class="mhpic" src="${picUrl}" referrerpolicy="no-referrer" />${
        pic2Url
          ? `<img class="mhpic2" width="0" height="0" src="${pic2Url}" referrerpolicy="no-referrer" />`
          : ""
      }${nextChapter || ""}`
    : "<h1> no pic, next chapter?</h1>";

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
    function goto(next) {
      location.pathname = location.pathname.replace(/(\\d+)\\.html/, (m, n) => {
        var n2 = n * 1 + (next ? 1 : -1);
        return n2 + '.html';
      })
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
  if (["/", "favicon.ico"].includes(req.url)) {
    res.end("welcome to fzdm");
    return;
  }
  if (req.url.includes("html") === false) {
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
    comicRes = await axios.get(comicUrl, {
      "content-type": "text/html",
    });
    log("comicRes", comicRes);
  } catch (e) {
    console.warn("axios error:", e);
    res.end("axios error");
    return;
  }

  const { pic, pic2, nextChapter } = getPicUrl(comicRes.data);
  const html = getHtml(pic, pic2, nextChapter);
  res.end(html);
});

server.listen(port, () => {
  console.log("listening at port ", port);
});
