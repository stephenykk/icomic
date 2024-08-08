const path = require("path");
const fs = require("fs-extra");
const isDown = process.argv[2] || 0;

const outputRootDir = path.resolve(__dirname, "../output");
const comicRootDir = path.resolve(__dirname, "../comic");
const favNames = fs
    .readFileSync(path.join(outputRootDir, "fav.txt"), "utf8")
    .split("\n")
    .filter((v) => v);

function getCartoonDir(name) {
    return path.join(outputRootDir, name);
}

function getSubFolders(root) {
    const subFolders = fs.readdirSync(root).filter((fname) => {
        return (
            !fname.startsWith(".") &&
            fs.statSync(path.join(root, fname)).isDirectory()
        );
    });

    return subFolders;
}

// const ls = getSubFolders(backupRootDir);
// console.log("🚀 ~ file: copy.js:25 ~ ls:", ls);

function getNewCartoonData() {
    const cartoonNames = getSubFolders(outputRootDir).filter((name) =>
        favNames.includes(name)
    );

    const newCartoonData = cartoonNames.reduce((data, name) => {
        const dir = getCartoonDir(name);
        const newJsonFile = path.join(dir, "new.json");

        const newer = fs.existsSync(newJsonFile)
            ? fs.readJSONSync(newJsonFile)
            : [];

        if (newer.length) {
            data[name] = { name, dir, newer };
        }
        return data;
    }, {});

    return newCartoonData;
}

function getSubFiles(root) {
    return fs.readdirSync(root).filter((name) => !name.startsWith("."));
}

function listNewer() {
    const newCartoonData = getNewCartoonData();
    console.log("\n=========> listNewer newCartoonData:", newCartoonData, "\n");

    if (isDown) {
        const scripts = [];
        fs.writeFileSync();
    }
}
listNewer();
