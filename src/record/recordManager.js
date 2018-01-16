
const EventEmitter = require("events")
const { Result, createResult } = require("./result.js")
const { FIRST_RECORD_FORMAT, RECORD_FROMAT, RESULT_ERROR, _calc, _check } = require("../shared/constants.js")
const Compiler = require("../compiler/compiler.js")
const {convertType} = require("../shared/util.js")

class RecordManager extends EventEmitter {
    static result;
    _check;
    _calc;
    constructor(options) {
        let _check = options? options.check : _check
            _calc = options? options.calc : _calc

        this.compiler = new Compiler({
            format: RECORD_FROMAT,
            formatFirst: FIRST_RECORD_FORMAT,
            resultError: RESULT_ERROR,
            check: _check,
            calc: _calc
        })

        initRM(this)
    }

    calculate(record, options) {
        let _calculate = this.compiler.compileToFunction(record)
        RecordManager.result = createResult(_calculate, options)
    }

    query (index) {
        return RecordManager.result && RecordManager.result.query(index)
    }
}

RecordManager.result = null

function initRM (rm) {
    if (rm instanceof RecordManager) {
        rm.on("calc", (record, options) => {
            rm.calculate(record, options)
        })
    }
}

exports = module.exports = RecordManager