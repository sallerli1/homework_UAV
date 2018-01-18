
const { FIRST_RECORD_FORMAT,
    RECORD_FROMAT,
    _calc,
    _check }
    = require("../config.js")

const resultStackLength = 10

const RESULT_NOT_FOUND = 0

const RESULT_ERROR = 4

const RESULT_NOT_FOUND_MSG = "Cannot find "

const RESULT_ERROR_MSG = "Error: "


const globalCmdOptions = {
    file: {
        oper: "file",
        params: {
            shouldCache: "c"
        }
    },
    query: {
        oper: "query",
        params: {}
    }
}

const globalCompilerOptions = {
    format: RECORD_FROMAT,
    formatFirst: FIRST_RECORD_FORMAT,
    resultError: RESULT_ERROR,
    check: _check,
    calc: _calc,
    seperater: " "
}

module.exports.resultStackLength = resultStackLength
module.exports.RESULT_NOT_FOUND = RESULT_NOT_FOUND
module.exports.RESULT_ERROR = RESULT_ERROR
module.exports.RESULT_NOT_FOUND_MSG = RESULT_NOT_FOUND_MSG
module.exports.RESULT_ERROR_MSG = RESULT_ERROR_MSG
module.exports.FIRST_RECORD_FORMAT = FIRST_RECORD_FORMAT
module.exports.RECORD_FROMAT = RECORD_FROMAT
module.exports._check = _check
module.exports._calc = _calc
module.exports.globalCmdOptions = globalCmdOptions
module.exports.globalCompilerOptions = globalCompilerOptions