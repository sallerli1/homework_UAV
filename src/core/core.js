const RecordCollector = require("../record/recordCollector")
const fs = require("fs")

class Core {
    constructor() {
        this.collector = new RecordCollector()
        this.fs = fs
    }

    // collect record from a file
    collect(pathToRecord, shouldCache) {
        fs.readFile(pathToRecord, "utf8", (err, data) => {
            if (err) {
                console.log(err)
                return
            }

            this.collector.collect(data, shouldCache)
        })
    }

    query(index) {
        return this.collector.query(index)
    }
}

module.exports = Core