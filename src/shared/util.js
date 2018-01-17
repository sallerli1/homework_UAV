const { EOL } = require("os")
const typeRegExp = /^(Function|Array|RegExp)$/

// get the type in the form of string
function getType (fn) {
    if (typeof fn === "string") {
        return fn
    }

    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ""
}

// check all types
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

// convert a string to a certain type
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

// split a string into an array by a seperater
function seperateStr(str, seperater) {
    let values = str.trim().split(seperater)

    // clean space and empty strings 
    //    stored in the array
    values = values.filter((value) => {
        return value != "" 
            && value != " "
            && value != seperater
    })
    return values
}

// split a record
function seperaterRecord(record, seperater) {
    return seperateStr(record, EOL)
        .map((value) => {
            return seperateStr(value, seperater)
        })
}

module.exports.getType = getType
module.exports.isType = isType
module.exports.convertType = convertType
module.exports.seperateStr = seperateStr
module.exports.seperaterRecord = seperaterRecord