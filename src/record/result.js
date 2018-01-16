
const constants = require("../shared/constants.js")

class Result {
    UAVID;
    value = [];

    constructor (ID) {
        this.UAVID = ID
        this.query = createQueryFn()
    }

/*     query(index) {

        let value = this.value[index]
        switch (value) {
            case constants.RESULT_ERROR:
                return constants.RESULT_ERROR_MSG + index
                break

            case constants.RESULT_NOT_FOUND:
                return constants.RESULT_NOT_FOUND_MSG + index
                break

            default:
                if (Array.isArray(value)) {
                    let result = this.UAVID

                    for (const axis of value) {
                        result += axis
                    }
                    return result
                }
                break
        }
    } */
}

function createQueryFn() {
    const cache = {}

    return function (index) {
        if (cache[index]) {
            return cache[index]
        }

        let value = this.value[index],
            result
        switch (value) {
            case constants.RESULT_ERROR:
                result = constants.RESULT_ERROR_MSG + index
                break

            case constants.RESULT_NOT_FOUND:
                result = constants.RESULT_NOT_FOUND_MSG + index
                break

            default:
                if (Array.isArray(value)) {
                    result = this.UAVID
                    for (const axis of value) {
                        result += axis
                    }
                }
                break
        }

        return cache[index] = result
    }
}

const resultCache = {}

function pushResult (result) {
    if (resultCache.length >= stackLength-1) {
        resultCache.shift()
    }

    resultCache.push(result)

}

function createResult (_calculate, options) {
    const hash = options && options.hash,
        shouldCache = options && options.shouldCache

    if (hash && resultCache[hash]) {
        return resultCache[hash]
    }

    let result = new Result(ID)
    result.value = _calculate()

    if (shouldCache && hash) {
        resultCache[hash] = result
    }

    return result
}

module.exports.Result = Result
module.exports.createResult = createResult