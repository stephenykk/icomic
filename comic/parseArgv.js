// node index.js <action: list | download | ...> <dirName> [skipCache]
let action = process.argv[2] || "download";
const dirName = process.argv[3];

let skipCache = process.argv[4] ? JSON.parse(process.argv[4]) : false;

let downSn = false;
if (action === "download") {
    skipCache = false;
    // node index.js download <dirName> [downSn]
    // downSn:  1-3  or  1,5
    downSn = process.argv[4] || false;
}

module.exports = {
    action,
    dirName,
    skipCache,
    downSn,
};
