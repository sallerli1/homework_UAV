
const { strIsType,
    getType,
    convertType,
    seperaterRecord,
    digitNumCheck,
    patternCheck,
    numRangeCheck } 
    = require("../shared/util.js")
const { globalCompilerOptions } = require("../shared/constants.js")

class Compiler {

    constructor(options) {
        if (!options) {
            this.options = globalCompilerOptions
        } else {
            this.options = {}
            this.options.formatFirst = options && options.formatFirst
            this.options.format = options && options.format
            this.options.resultError = options && options.resultError
            this.options.check = options && options.check
            this.options.calc = options && options.calc
            this.options.seperater = options && options.seperater
        }

    }

    // return a function to compile the record
    //   which will run after cache check
    compileToFunction(record) {

        let options = this.options

        return function () {
            let results = [],
                lasts = {},
                IDs = new Set()

            let _record = seperaterRecord(record, options.seperater)

            for (const msg of _record) {

                // check if the msg is the first by its length
                if (msg.length < options.format.length) {
                    var { result, ID } = compileFirst(msg, IDs, lasts, options)
                } else {
                    var { result, ID } = compileRest(msg, IDs, lasts, options)
                }

                if (ID) {
                    lasts[ID] = result
                }
                results.push(result)
            }

            return {
                ID: IDs,
                lasts: lasts,
                value: results
            }
        }
    }
}

// compile the first msg of a record
function compileFirst(msg, IDs, lasts, options) {
    let result = {},
        value,
        ID = false

    for (const rule of options.formatFirst) {

        // if the length of the msg doesn't match 
        //  the rule, it's thought to be an error
        if (msg.length < 1) {
            result = options.resultError
            break
        }

        // convert from string to a pre-defined type and check
        if ((value = getValue(msg, rule, options)) === options.resultError) {
            result = options.resultError
            break
        }

        result[value["name"]] = value["value"] 

        if (result.ID && !ID) {
            ID = result.ID
        }
    }

    // check if it should be the first
    if (ID && !IDs.has(result.ID)) {
        IDs.add(result.ID)
    } else {
        result = options.resultError
    }

    // custom check
    if (result === options.resultError || !options.check(result, lasts[ID])) {
        result = options.resultError
    }

    return {
        result,
        ID
    }
}

// compile msgs of a record except the first
function compileRest(msg, IDs, lasts, options) {
    let result = {},
        value,
        ID = false

    for (const rule of options.format) {
        if (msg.length < 1 || lasts[ID] === options.resultError) {
            result = options.resultError
            break
        }

        if ((value = getValue(msg, rule, options)) === options.resultError) {
            result = options.resultError
            break
        }

        result[value["name"]] = value["value"]       

        if (result.ID && !ID) {
            ID = result.ID
        }
    }

    // custom check
    if (result === options.resultError 
        || !lasts[ID] 
        || !options.check(result, lasts[ID])) {
        result = options.resultError
    } else {
        options.calc(result)
    }

    return {
        result,
        ID
    }
}

// convert from string to a pre-defined type and check
function getValue(msg, rule, options) {
    let strValue = msg.shift(),
        typeStr = getType(rule["type"]),
        result = {
            name: rule["name"]
        }

        if (strIsType(strValue, typeStr)) {
            result.value = convertType(strValue, rule["type"])
        } else {
            return options.resultError
        }

        // pattern check
        if (typeStr === "String"
            && isType(rule["pattern"], RegExp)
            && !rule["pattern"].test(result.value)) {
            return options.resultError
        }

        // Number check
        if ((typeStr === "Integer"
            || typeStr === "Decimal"
            || typeStr === "Number")) {
            if (rule["range"]
                && !numRangeCheck(result.value,
                    rule["range"][0],
                    rule["range"][1])) {
                return options.resultError
            }
            if (rule["digitNum"]
                && !digitNumCheck(result.value,
                    rule["digitNum"][0],
                    rule["digitNum"][1],
                    rule["digitNum"][2],
                    rule["digitNum"][3])) {
                return options.resultError
            }
        }

    return result
}

module.exports = Compiler