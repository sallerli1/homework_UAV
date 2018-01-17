const crypto = require("crypto")
const RecordManager = require("./recordManager.js")


// this collector is meant to collect string record
//   and create hash for cache check
class RecordCollector {

    constructor() {
        this.rm = new RecordManager()
    }

    collect(record, shouldCache) {
        let hash = createHash(record)
        this.rm.emit("calc", record, {
            hash: hash,
            shouldCache: shouldCache
        })
    }

    query(index) {
        return RecordManager.result && RecordManager.result.query(index)
    }
}

// get the hash of a certain record
function createHash(str) {
    let hasher = crypto.createHash("sha256")
    hasher.update(str)
    return hasher.digest("base64")
}

module.exports = RecordCollector