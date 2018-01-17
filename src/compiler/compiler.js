const { convertType, seperaterRecord } = require("../shared/util.js")
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
        ID = false

    for (const rule of options.formatFirst) {

        // if the length of the msg doesn't match 
        //  the rule, it's thought to be an error
        if (msg.length < 1) {
            result = options.resultError
            break
        }

        // convert from string to a pre-defined type and check
        if (!(result[rule["name"]] = convertType(msg.shift(), rule["type"]))) {
            result = options.resultError
            break
        }
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
        ID = false

    for (const rule of options.format) {
        if (msg.length < 1 || lasts[ID] === options.resultError) {
            result = options.resultError
            break
        }

        if (!(result[rule["name"]] = convertType(msg.shift(), rule["type"]))) {
            result = options.resultError
            break
        }

        if (result.ID && !ID) {
            ID = result.ID
        }
    }

    // custom check
    if (result === options.resultError || !options.check(result, lasts[ID])) {
        result = options.resultError
    } else {
        options.calc(result)
    }

    return {
        result,
        ID
    }
}

module.exports = Compiler