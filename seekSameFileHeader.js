const fs = require('fs')
const path = requir('path')

function seekSameFileHeader(filePath1, filePath2) {
    const buf1 = fs.readFileSync(filePath1)
    const buf2 = fs.readFileSync(filePath2)
    let sameBytes = 0
    for(let i = 0; i < buf1.length; i++) {
        const val1 = buf1[i]
        const val2 = buf2[i]
        if (val1 !== val2) {
            sameBytes = i
            break;
        }
    }
    return sameBytes
}

module.exports = seekSameFileHeader