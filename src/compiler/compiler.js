const {convertType, seperateStr} = require("../shared/util.js")

class Compiler {
    constructor (options) {
        this.formatFirst = options && options.format_first
        this.format = options && options.format
        this.resultError = options && options.resultError
        this.check = options && options.check
        this.calc = options && options.calc
    }
    
    compileToFunction (record) {
        return function() {
            let results = [],
                last,
                ID

            record = seperateStr(record)
            
            for (const msg of record) {
                let result = {}

                if (msg.length < this.format.length) {
                    for (const rule of this.formatFirst) {
                        if (msg.length < 1) {
                            result = this.resultError
                            break
                        }
                        if (!(result[rule["name"]] = convertType(msg.shift(), rule["type"]))) {
                            result = this.resultError
                            break
                        }

                        if (!ID) {
                            ID = result.ID
                        }
                    }

                    if (result === this.resultError || !this.check(result)) {
                        result = this.resultError
                    }
                } else {
                    for (const rule of this.format) {
                        if (msg.length < 1 || last === this.resultError) {
                            result = this.resultError
                            break
                        }
                        
                        if (!(result[rule["name"]] = convertType(msg.shift(), rule["type"]))) {
                            result = this.resultError
                            break
                        }
                    }

                    if (result === this.resultError || !this.check(result)) {
                        result = this.resultError
                    } else {
                        this.calc(result)
                    }
                }

                last = result
                results.push(result)
            }

            return results
        }
    }
}

module.exports = Compiler