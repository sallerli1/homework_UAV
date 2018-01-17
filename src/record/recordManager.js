
const EventEmitter = require("events")
const { createResult } = require("./result.js")
const Compiler = require("../compiler/compiler.js")

class RecordManager extends EventEmitter {
    constructor(options) {
        super()
        this.compiler = new Compiler(options)
        initRM(this)
    }

    calculate(record, options) {

        // get a compiled function of the record
        let _calculate = this.compiler.compileToFunction(record)
        RecordManager.result = createResult(_calculate, options)
    }
}

// stores the latest result
RecordManager.result = null

function initRM (rm) {
    if (rm instanceof RecordManager) {
        rm.on("calc", (record, options) => {
            rm.calculate(record, options)
        })
    }
}

exports = module.exports = RecordManager