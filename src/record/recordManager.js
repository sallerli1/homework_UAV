
const EventEmitter = require("events")
const { Result, createResult } = require("./result.js")
const { FIRST_RECORD_FORMAT, RECORD_FROMAT, RESULT_ERROR, _calc, _check } = require("../shared/constants.js")

class RecordManager extends EventEmitter {
    static result;
    _check;
    _calc;
    constructor(options) {
        this._check = options? options.check : _check
        this._calc = options? options.calc : _calc
        initRM(this)
    }

    calculate(record, options) {
        function _calculate() {
            let results = [],
                last,
                ID

            for (const msg of record) {
                let result = {}

                if (msg.length < RECORD_FROMAT.length) {
                    for (const key of FIRST_RECORD_FORMAT) {
                        if (msg.length < 1) {
                            result = RESULT_ERROR
                            break
                        }
                        result[key] = Array.prototype.shift.call(msg)

                        if (!ID) {
                            ID = result.ID
                        }
                    }

                    if (result === RESULT_ERROR || !this._check(result)) {
                        result = RESULT_ERROR
                    }
                } else {
                    for (const key of RECORD_FROMAT) {
                        if (msg.length < 1 || last === RESULT_ERROR) {
                            result = RESULT_ERROR
                            break
                        }
                        result[key] = Array.prototype.shift.call(msg)
                    }

                    if (result === RESULT_ERROR || !this._check(result)) {
                        result = RESULT_ERROR
                    } else {
                        this._calc(result)
                    }
                }

                last = result
                results.push(result)
            }

            return results
        }


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