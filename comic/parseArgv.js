// node index.js <action: list | download | ...> <dirName> [skipCache]
let action = process.argv[2] || "download";
const dirName = process.argv[3];

let skipCache = false;

function range(start, end) {
    return Array.from({ length: end - start + 1 }).map((v, i) => start + i);
}

function parseDownSn(downSn, endSn) {
    const numRe = /^\d+$/;
    if (numRe.test(downSn) && numRe.test(endSn)) {
        const startSn = downSn;
        downSn = `${startSn}-${endSn}`;
    }

    if (!downSn) return false;
    // 1,5
    if (downSn.includes(",")) {
        return downSn.split(",").map((val) => val.trim() * 1);
    } else if (downSn.includes("-")) {
        // 1-3
        const [start, end] = downSn
            .replace(/\s/g, "")
            .split("-")
            .map((val) => val * 1);
        return range(start, end);
    } else {
        // 12
        return [downSn * 1];
    }
}

let downSn = false;
if (action === "download") {
    skipCache = false;
    // node index.js download <dirName> [downSn]
    // downSn:  1-3  or  1,5
    // downSn:  1 5 == 1-5
    downSn = parseDownSn(process.argv[4], process.argv[5]);
} else {
    skipCache = process.argv[4] ? JSON.parse(process.argv[4]) : false;
}

const args = {
    action,
    dirName,
    skipCache,
    downSn,
};

console.log("-".repeat(60));
console.log("PARSE ARGS:", args);
console.log("-".repeat(60));

module.exports = args;
