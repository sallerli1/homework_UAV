
const { EOL } = require("os")
const builtTypeRegExp = /^(Function|Array|RegExp)$/
const customTypeRegExp = /^(Integer|Decimal|Int&Alph|Int|Alph)$/

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
    if (typeof value !== "object" && !customTypeRegExp.test(getType(type))) {
        return typeof value === getType(type).toLowerCase()
    }

    if (type === "Integer") {
        return isType(value, Number) && Number.isInteger(value)
    } else if (type === "Decimal") {
        return isType(value, Number) && !Number.isInteger(value)
    } else if (type === "Int&Alph") {
        return /(?!^[0-9]+$)(?!^[a-zA-Z]+$)^[a-zA-Z0-9]+$/.test(value)
    } else if (type === "Int|Alph") {
        return /^[a-z0-9A-Z]+$/.test(value)
    } else if (builtTypeRegExp.test(getType(type))) {
        return Object.prototype.toString.call(value) === `[object ${getType(type)}]`
    } else {
        return value instanceof type
    }
}

function strIsType (str, type) {
    let typeStr = getType(type)

    if (typeStr === "Integer") {
        return /^[-+]?[0-9]+$/.test(str)
    } else if (typeStr === "Decimal") {
        return /^[-+]?[0-9]+\.[0-9]+$/.test(str)
    } else if (typeStr === "Number") {
        return /^[-+]?[0-9]+\.?[0-9]+$/.test(str)
    } else if (typeStr === "Int&Alph") {
        return /(?!^[0-9]+$)(?!^[a-zA-Z]+$)^[a-zA-Z0-9]+$/.test(str)
    } else if (typeStr === "Int|Alph") {
        return /^[a-z0-9A-Z]+$/.test(str)
    } else if (typeStr === "String") {
        return typeof str === "string"
    } else {
        return false
    }
}
// convert a string to a certain type
function convertType (value, type) {
    let desType = getType(type)
    if (desType === "String") {
        return value
    } else if (desType === "Int&Alph") {
        return strIsType(value, "Int&Alph") ? value : false
    } else if (desType === "Int|Alph") {
        return strIsType(value, "Int|Alph") ? value : false
    } else if (desType === "Number") {
        return Number(value)
    } else if (desType === "Integer") {
        return parseInt(value)
    } else if (desType === "Decimal") {
        return parseFloat(value)
    } else {
        return false
    }
}

function patternCheck (str, pattern) {
    if (isType(pattern, RegExp)) {
        return pattern.test(str)
    }
}

function numRangeCheck (value, fl, ul) {
    if (!isType(fl, Number) && !isType(ul, Number)) {
        return true
    } else if (!isType(fl, Number) && isType(ul, Number)) {
        return value <= ul
    } else if (isType(fl, Number) && !isType(ul, Number)) {
        return value >= fl
    } else {
        return value >= fl && value <= ul
    }
}

function digitNumCheck (value, ifl, iul, dfl, dul) {
    ifl = isType(ifl, Number) ? ifl : false
    iul = isType(iul, Number) ? iul : false
    dfl = isType(dfl, Number) ? dfl : false
    dul = isType(dul, Number) ? dul : false

    let intRegStr = `^[+-]?[0-9]{${ifl || "0"},${iul || "100"}}\.?`
    let decimalRegStr = `^[+-]?[0-9]{${ifl || "0"},${iul || "100"}}\.[0-9]{${dfl || "0"},${dul || "100"}}$`

    if (dfl || dul) {
        return RegExp(decimalRegStr).test(value)
    } else {
        return RegExp(intRegStr).test(value)
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
module.exports.strIsType = strIsType
module.exports.patternCheck = patternCheck
module.exports.numRangeCheck = numRangeCheck
module.exports.digitNumCheck = digitNumCheck