const path = require("path");
const fs = require("fs-extra");

// const backupRootDir = path.resolve(__dirname, "../backup");
const backupRootDir = "J:\\cartoon";
const cartoonRootDir = path.resolve(__dirname, "../cartoon");

function getCartoonDir(name) {
    return path.join(cartoonRootDir, name);
}

function getSubDirs(root) {
    const subFolders = fs.readdirSync(root).filter((fname) => {
        return (
            !fname.startsWith(".") &&
            fs.statSync(path.join(root, fname)).isDirectory()
        );
    });

    return subFolders;
}

function walkDir(dir, cb) {
    const sublist = fs.readdirSync(dir);
    const files = sublist.filter(
        (fname) =>
            !fname.startsWith(".") &&
            fs.statSync(path.join(dir, fname)).isFile()
    );
    files.forEach((file) => cb(path.join(dir, file)));
    const folders = sublist.filter(
        (fname) =>
            !fname.startsWith(".") &&
            fs.statSync(path.join(dir, fname)).isDirectory()
    );
    for (const folder of folders) {
        walkDir(path.join(dir, folder), cb);
    }
}

function checkExistMp4(dir) {
    let exists = false;
    const cb = (fpath) => {
        if (/mp4$/.test(fpath.replace(/\?.*$/, ""))) {
            exists = true;
        }
    };

    walkDir(dir, cb);

    return exists;
}

function getCartoonData() {
    const cartoonNames = getSubDirs(cartoonRootDir);
    // const cartoonNames = getSubDirs(cartoonRootDir).filter((name) =>
    //     /heizi/.test(name)
    // );

    const cartoonData = cartoonNames.reduce((data, name) => {
        const dir = getCartoonDir(name);
        const all = getSubDirs(dir);
        data[name] = {
            name,
            dir,
            all,
            done: all.filter((sn) => checkExistMp4(path.join(dir, sn))),
        };
        return data;
    }, {});

    // console.log(
    //     "🚀 ~ file: copy.js:29 ~ getCartoons ~ cartoonData:",
    //     cartoonData
    // );
    return cartoonData;
}

function getSubFiles(root) {
    return fs
        .readdirSync(root)
        .filter(
            (name) =>
                !name.startsWith(".") &&
                fs.statSync(path.join(root, name)).isFile()
        );
}

function delNoMp4SnFolder(root) {
    const cartoonNames = getSubDirs(root);
    for (const cartoonName of cartoonNames) {
        const snFolders = getSubDirs(path.join(root, cartoonName));
        for (const sn of snFolders) {
            const snDir = path.join(root, cartoonName, sn);
            const existsMp4 = checkExistMp4(snDir);
            if (!existsMp4) {
                console.log(
                    "\n =================> REMOVING SN DIR WITHOUT MP4:",
                    snDir,
                    "\n"
                );
                // fs.rmdirSync(snDir); // default not recursive
                fs.rmSync(snDir, { recursive: true, force: true });
            }
        }
    }
}

function handleBackup() {
    delNoMp4SnFolder(backupRootDir);

    const cartoonData = getCartoonData();
    const needDownData = {};

    for (const cartoon of Object.values(cartoonData)) {
        // console.log(cartoon);
        for (const sn of cartoon.done) {
            const backDir = path.join(backupRootDir, cartoon.name, sn);
            const srcDir = path.join(cartoonRootDir, cartoon.name, sn);
            const existsBackSnDir = fs.existsSync(backDir);
            if (mode === "back") {
                if (!existsBackSnDir) {
                    fs.ensureDirSync(backDir);
                    console.log("COPYING SN:", srcDir, " --> ", backDir);
                    fs.copySync(srcDir, backDir);
                }
            } else if (mode === "clear") {
                if (existsBackSnDir) {
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
        // find out download filed sn list of each cartoon
        for (const sn of cartoon.all) {
            const backDir = path.join(backupRootDir, cartoon.name, sn);
            const srcDir = path.join(cartoonRootDir, cartoon.name, sn);
            const existsBackSnDir = fs.existsSync(backDir);
            if (mode === "back") {
                if (!existsBackSnDir) {
                    needDownData[cartoon.name] = needDownData[cartoon.name] || { name: cartoon.name, dir: cartoon.dir, needs: []}
                    needDownData[cartoon.name].needs.push(sn)

                    console.log(
                        "\n ==========> NEED TO DOWN SN:",
                        srcDir,
                        "\n"
                    );
                }
            }
        }
    }

    const needDownJsonFile = path.join(cartoonRootDir, '../comic/needDown.json')
    fs.outputJsonSync(needDownJsonFile, needDownData);
    console.log('\n=====>OUTPUT NEED DOWN DATA TO: ', needDownJsonFile , '\n\n')
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
