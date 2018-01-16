const { EOL } = require("os")
const crypto = require("crypto")



class RecordCollector {

    constructor(rm) {
        this.rm = rm
    }

    collect(recStr) {
        let hash = createHash(recStr)

        function _processRecStr(recStr) {
            let strArr = recStr.split(EOL),
                record = []

            for (const str of strArr) {
                let values = str.trim().split(" ")
                values = values.filter((value) => {
                    return value != ""
                })
                record.push(values)
            }

            return record
        }

        
    }
}

function createHash(str) {
    let hasher = crypto.createHash("sha256")
    hasher.update(str)
    return hasher.digest("base64")
}

var rc = new RecordCollector(1)
var str = "a   b c 1" + EOL + " c d e 1 2 3"

console.log(rc.collect(str))