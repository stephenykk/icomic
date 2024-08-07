const fs = require("fs-extra");
const path = require("path");
const { spawnCommand } = require("./runCommand");

const needJsonFile = path.resolve(__dirname, "needDown.json");

const isExists = fs.pathExistsSync(needJsonFile);

function toChunks(list, chunkSize) {
    const chunks = [];
    if (!list.length) return chunks;

    for (let i = 0; i < list.length; i = i + chunkSize) {
        chunks.push(list.slice(i, i + chunkSize));
    }

    return chunks;
}

async function handleChunk(chunk) {
    try {
        await Promise.allSettled(
            chunk.map((cartoon) =>
                spawnCommand("bash", [
                    "./comic/autoCartoonNeed.sh",
                    cartoon.name,
                    cartoon.needs.join(","),
                ])
            )
        );
    } catch (err) {
        console.log("============> HANDLE CHUNK ERROR: ", err);
    }
}

async function main() {
    if (!isExists) {
        console.log("===========> no needDown.js:", needJsonFile);
        return;
    }

    const needDownData = fs.readJsonSync(needJsonFile);

    const needCartoons = Object.values(needDownData);

    if (needCartoons.length === 0) {
        console.log(
            "==============> there is no any need to down :)",
            needDownData
        );
        return;
    }

    const CONCURRENT_COUNT = 3;

    const chunks = toChunks(needCartoons, CONCURRENT_COUNT);
    for (const chunk of chunks) {
        await handleChunk(chunk);
    }
}

main();
