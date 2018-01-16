const crypto = require("crypto")
const RecordManager = require("./recordManager.js")



class RecordCollector {

    constructor() {
        this.rm = new RecordManager()
    }

    collect(record, shouldCache) {
        let hash = createHash(record)
        this.rm.emit("caculate", record, {
            hash: hash,
            shouldCache: shouldCache
        })
    }

    query(index) {
        return RecordManager.result && RecordManager.result.query(index)
    }
}

function createHash(str) {
    let hasher = crypto.createHash("sha256")
    hasher.update(str)
    return hasher.digest("base64")
}

module.exports = RecordCollector