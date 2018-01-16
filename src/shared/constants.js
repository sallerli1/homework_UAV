
const resultStackLength = 10

const RESULT_NOT_FOUND = 0

const RESULT_ERROR = 4

const RESULT_NOT_FOUND_MSG = "Cannot find "

const RESULT_ERROR_MSG = "Error: "

const FIRST_RECORD_FORMAT = [{
    name: "ID",
    type: String
}]
const RECORD_FROMAT = ["ID", "x", "y", "z", "ox", "oy", "oz"]

function _calc (record) {
    record.x += record.ox
    record.y += record.oy
    record.z += record.oz
}

function _check (record, last) {
    let typeCheck,
        valueCheck

    typeCheck = Number.isInteger(record.x)
        && Number.isInteger(record.y)
        && Number.isInteger(record.z)

    if (last) {
        valueCheck = last.x === record.x
            && last.y === record.y
            && last.z === record.z

        typeCheck = typeCheck
            && Number.isInteger(record.ox)
            && Number.isInteger(record.oy)
            && Number.isInteger(record.oz)
    } else {
        valueCheck = true
    }
    
    return typeCheck && valueCheck
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