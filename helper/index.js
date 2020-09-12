const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
const config = require('../config/index.js')

const puppeteer = require('puppeteer')

axios.defaults.timeout = 10 * 1000
axios.defaults.headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0'

function isStream(result) {
    return result && typeof result.pipe === 'function'
}

function isUrl(str) {
    return /^(https?:)?\/\//.test(str)
}

function log(...args) {
    console.log(':::', ...args)
}

function log2(...args) {
    console.log('\n', ...args, '\n')
}

async function download(url, responseType = 'stream') {
    log('downloading :', url)
    let fname = path.basename(url)
    // res is object, res.data is stream
    let res = await axios.get(url, {responseType}).catch(err => {
        log2('DOWN FAIL:', fname, err.message)
        return false
    })
    // debugger;

    if(!res) {
        return false
    }

    let outResult = await output(fname, res.data)
    return outResult
}


function output(fname, con) {
    if(isUrl(fname)) {
        fname = path.basename(fname)
        fname = fname.replace(/\?.*$/, '')
    }

    let outFile = path.resolve(config.output, fname)
    if(fs.existsSync(outFile)) {
        outFile = outFile.replace(/\.\w+$/, '_'+(new Date()).getMinutes()+'$&')
    }

    return new Promise((resolve) => {
        if(isStream(con)) {
            let ws = fs.createWriteStream(outFile, {flags: 'w'})
            let rs = con
            rs.pipe(ws)
            ws.on('finish', () => {
                log('output ok:', fname)
                resolve(true)
            })
        } else {
            let err = fs.writeFileSync(outFile, con, {encoding: 'utf8'})
            if(err) {
                log2('output err:' , err)
                resolve(false)
            } else {
                log('output file:', fname)
                resolve(true)
            }
        }

    })
}

async function getList() {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()

    page.on('console', msg => {
        log('PAGE CONSOLE:', msg.text())
    })

    await page.goto(config.listPage.url, {waitUntil: 'networkidle0'})
    const links = await page.evaluate((config) => {
        // console.log('========', JSON.stringify(config))
        var links = document.querySelectorAll(config.listPage.selector)
        links = Array.from(links)
        links = links.map(link => [link.href, link.textContent])
        return links
        // return document.title
    }, config)

    log(links)
    await browser.close()

    return links
}


async function downPage(url) {
    log('downloading page:', url)
    const browser = await  puppeteer.launch({headless: true})
    const page = await browser.newPage()
    let {reList = [], downContent: isDownContent, callback} = config.detailPage

    if(reList.length) {
        page.on('response', async (response) => {
            let url = response.url()
            let wanted = reList.some(re => re.test(url))
            if(wanted) {
                log('outputing url:', url)
                let buf = await response.buffer()
                await output(url, buf)

                if(callback && typeof callback === 'function') {
                    await callback(response, browser, helper)
                }
            }

        })
    }

    await page.goto(url, {waitUntil: 'networkidle2'})
    log('goto done!!')

    isDownContent = isDownContent == null ? true : isDownContent

    if(isDownContent) {
        const con = await page.content()
        // log('=====', con)
        await output(url, con)
        if(!reList.length) {
            await browser.close()
        }
    }
}

var helper = {
    log,
    log2,
    getList,
    output,
    downPage,
    download,
}

module.exports = helper