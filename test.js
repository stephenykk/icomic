const axios = require('axios')
log(typeof axios)
axios.defaults.timeout = 2000

function log(...args) {
    console.log(':::', ...args)
}

log(process.argv)

async function main() {
    // let res = await axios.get('https://news.cnblogs.com/n/672493/')
    // let res = await axios.get('https://pic.cnblogs.com/face/510/20200828135901XX.png')

    log('starting get url')
    let res = await axios.get('http://localhost:8899').catch(e => log('bad error:', e.message))
    log('after axios')
    log(res)
}

main()