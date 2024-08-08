const fs = require("fs-extra");
const path = require("path");

function listNeedDown() {
    const data = fs.readJsonSync(path.join(__dirname, "needDown.json"));
    const needDowns = Object.values(data).map((cartoon) => ({
        name: cartoon.name,
        needs: cartoon.needs,
    }));
    console.log(needDowns);
    return needDowns;
}

listNeedDown();
