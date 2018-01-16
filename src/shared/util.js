const { EOL } = require("os")
const typeRegExp = /^(Function|Array|RegExp)$/

function getType (fn) {
    if (typeof fn === "string") {
        return fn
    }

    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ""
}

function isType (value, type) {
    if (typeof value !== "object") {
        return typeof value === getType(type).toLowerCase()
    }

    if (type === "Integer") {
        return isType(value, Number) && Number.isInteger(value)
    } else if (type === "Float") {
        return isType(value, Number) && !Number.isInteger(value)
    } else if (typeRegExp.test(getType(type))) {
        return Object.prototype.toString.call(value) === `[object ${getType(type)}]`
    } else {
        return value instanceof type
    }
}

function convertType (value, type) {
    let desType = getType(type)
    if (desType === "String") {
        return value
    } else if (desType === "Number") {
        return Number(value)
    } else if (desType === "Integer") {
        return parseInt(value)
    } else if (desType === "Float") {
        return parseFloat(value)
    } else {
        return false
    }
}

function seperateStr(str, seperater) {
    let strArr = str.split(EOL),
        record = []

    for (const str of strArr) {
        let values = str.trim().split(seperater)
        values = values.filter((value) => {
            return value != "" && value != " "
        })
        record.push(values)
    }

    return record
}

module.exports.getType = getType
module.exports.isType = isType
module.exports.convertType = convertType
module.exports.seperateStr = seperateStr