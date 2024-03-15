const fs = require("fs-extra");
const path = require("path");
const { dirName } = require("./parseArgv");
const axios = require("axios");

axios.defaults.timeout = 40 * 1000;
axios.defaults.headers["User-Agent"] =
    "Mozilla/5.0 (X11; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0";

function isStream(result) {
    return result && typeof result.pipe === "function";
}

function isUrl(str) {
    return /^(https?:)?\/\//.test(str);
}

function ts() {
    const time = new Date().toLocaleString();
    return `[${time.replace(/^\d+:/, "")}]`;
}

function log(...args) {
    console.log(":::", ts(), ...args);
}

function log2(...args) {
    console.log("\n", ts(), ...args, "\n");
}

function logWithLines(...args) {
    const content = args.map((arg) => arg.toString()).join("");
    const conLines = content.split("\n");
    const maxLength = Math.max(...conLines.map((con) => con.length));
    const line = Array.from({ length: maxLength + 5 }, () => "-").join("");
    console.log(line);
    console.log(...args);
    console.log(line);
}

function listJsonFilePath() {
    var fpath = path.resolve(__dirname, "../output", dirName, "list.json");

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

module.exports = {
    download,
    output,
    axios,
    sleep,
    listJsonFilePath,
    setCacheList,
    getCacheList,
    isStream,
    isUrl,
    log,
    log2,
    logWithLines,
};
