const path = require("path");
const fs = require("fs-extra");

// const backupRootDir = path.resolve(__dirname, "../backup");
const backupRootDir = "K:\\cartoon";
// console.log("🚀 ~ file: copy.js:6 ~ backupRootDir:", backupRootDir);
const cartoonRootDir = path.resolve(__dirname, "../cartoon");

function getCartoonDir(name) {
    return path.join(cartoonRootDir, name);
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
    const cartoonNames = getSubFolders(cartoonRootDir);
    // const cartoonNames = getSubFolders(cartoonRootDir).filter((name) =>
    //     /heizi/.test(name)
    // );

    const cartoonData = cartoonNames.reduce((data, name) => {
        const dir = getCartoonDir(name);
        data[name] = { name, dir, done: getSubFolders(dir) };
        return data;
    }, {});

    // console.log(
    //     "🚀 ~ file: copy.js:29 ~ getCartoons ~ cartoonData:",
    //     cartoonData
    // );
    return cartoonData;
}

function getSubFiles(root) {
    return fs.readdirSync(root).filter((name) => !name.startsWith("."));
}

function delEmptySnFolder(root) {
    const cartoonNames = getSubFolders(root);
    for (const cartoonName of cartoonNames) {
        const snFolders = getSubFolders(path.join(root, cartoonName));
        for (const sn of snFolders) {
            const snDir = path.join(root, cartoonName, sn);
            const files = getSubFiles(snDir);
            if (!files.length) {
                console.log("REMOVING EMPTY SN DIR:", snDir);
                fs.rmdirSync(snDir);
            }
        }
    }
}

function handleBackup() {
    delEmptySnFolder(backupRootDir);

    const cartoonData = getCartoonData();

    for (const cartoon of Object.values(cartoonData)) {
        // console.log(cartoon);
        for (const sn of cartoon.done) {
            const backDir = path.join(backupRootDir, cartoon.name, sn);
            const srcDir = path.join(cartoonRootDir, cartoon.name, sn);
            const existsInBackup = fs.existsSync(backDir);
            if (mode === "back") {
                if (!existsInBackup) {
                    fs.ensureDirSync(backDir);
                    console.log("COPYING SN:", srcDir, " --> ", backDir);
                    fs.copySync(srcDir, backDir);
                }
            } else if (mode === "clear") {
                if (existsInBackup) {
                    const ok = rmMp4(srcDir);
                    if (!ok) {
                        const decDir = path.join(srcDir, "dec");
                        if (fs.existsSync(decDir)) {
                            rmMp4(decDir);
                        }
                    }
                }
            }
        }
    }
}

function rmMp4(srcDir) {
    let mp4Fname = fs
        .readdirSync(srcDir)
        .filter((name) => name.match(/mp4$/))[0];
    if (mp4Fname) {
        const mp4File = path.join(srcDir, mp4Fname);
        console.log("DELETING CARTOON FILE:", mp4File);
        fs.removeSync(mp4File);
        return true;
    }
    return false;
}

// node backup.js <mode:back|clear>
const mode = process.argv[2] || "back";
if (["clear", "back"].includes(mode)) {
    handleBackup();
} else {
    console.log("MODE IS INVALID:", mode);
}
