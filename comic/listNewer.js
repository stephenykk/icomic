const path = require("path");
const fs = require("fs-extra");

const outputRootDir = path.resolve(__dirname, "../output");

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

function getCartoonData() {
    const cartoonNames = getSubFolders(outputRootDir);

    const cartoonData = cartoonNames.reduce((data, name) => {
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

    return cartoonData;
}

function getSubFiles(root) {
    return fs.readdirSync(root).filter((name) => !name.startsWith("."));
}

function listNewer() {
    const cartoonData = getCartoonData();
    console.log(
        "🚀 ~ file: listNewer.js:47 ~ listNewer ~ cartoonData:",
        cartoonData
    );
}
listNewer();
