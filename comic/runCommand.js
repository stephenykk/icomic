const child_process = require('child_process')



function spawnCommand(cmd, args = []) {
    console.log('\n:::RUN:', cmd, args, '\n');

    return new Promise(resolve => {
        const cp = child_process.spawn(cmd, args, { stderr: process.stderr, stdout: process.stdout })
        cp.stdout.on('data', data => {
            console.log('data:', data.toString())
        })
        cp.stderr.on('data', edata => {
            console.log('error:', edata.toString())
        })
        cp.on('close', code => {
            console.log('cmd done with code:', code)
            resolve(code === 0)
        })
        cp.on('exit', code => {
            console.log('child exit with code:', code)
            resolve(code === 0)
        })
    })    
}

function runCommand(cmd) {
    console.log('\nRUNNING CMD::', cmd, '\n')
    return new Promise(resolve => {
        child_process.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log('cmd has error:', error)
                resolve(false)
            }

            console.log('stdout:', stdout.toString())
            console.log('stderr:', stderr.toString())

            resolve(true)
        })
    })
}

async function test() {
    // await spawnCommand('curl', ['https://www.baidu.com'])
    // await spawnCommand('curl', ['-o /E/icomic/cartoon/wanmei/119/world.mp4 https://free-adsmind.ugdtimg.com/0bc3riabaaaaiyakebvqnvsfbcwdccfaaeaa.f10002.mp4?dis_k=e9ad2a3cae3c6d51906b12f49dc8ec03?dis_k=e9ad2a3cae3c6d51906b12f49dc8ec03'])
    await spawnCommand('curl', ['-o', 'E:\\icomic\\cartoon\\wanmei\\119\\world.mp4', "https://free-adsmind.ugdtimg.com/0bc3riabaaaaiyakebvqnvsfbcwdccfaaeaa.f10002.mp4?dis_k=e9ad2a3cae3c6d51906b12f49dc8ec03?dis_k=e9ad2a3cae3c6d51906b12f49dc8ec03"])
}

// test()

module.exports = { runCommand, spawnCommand }
