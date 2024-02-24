const child_process = require("child_process");

function spawnCommand(cmd, args = []) {
    console.log("\n:::RUN:", cmd, args, "\n");

    return new Promise((resolve) => {
        const cp = child_process.spawn(cmd, args, {
            stderr: process.stderr,
            stdout: process.stdout,
        });
        cp.stdout.on("data", (data) => {
            console.log("data:", data.toString());
        });
        cp.stderr.on("data", (edata) => {
            console.log("error:", edata.toString());
        });
        cp.on("close", (code) => {
            console.log("cmd done with code:", code);
            resolve(code === 0);
        });
        cp.on("exit", (code) => {
            console.log("child exit with code:", code);
            resolve(code === 0);
        });
    });
}

function runCommand(cmd) {
    console.log("\nRUNNING CMD::", cmd, "\n");
    return new Promise((resolve) => {
        child_process.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log("cmd has error:", error);
                resolve(false);
            }

            console.log("stdout:", stdout.toString());
            console.log("stderr:", stderr.toString());

            resolve(true);
        });
    });
}

async function test() {
    // await spawnCommand('curl', ['https://www.baidu.com'])
}

// test()

module.exports = { runCommand, spawnCommand };
