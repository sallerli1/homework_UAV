
const { RESULT_ERROR, RESULT_NOT_FOUND, RESULT_NOT_FOUND_MSG, RESULT_ERROR_MSG } = require("../shared/constants.js")
const { isType } = require("../shared/util.js")

class Result {
    constructor (IDs, lasts) {
        this.UAVIDs = IDs
        this.lasts = lasts
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

    // cache query results
    const cache = {}

    return function (index) {
        if (cache[index]) {
            return cache[index]
        }

        let value = this.value[index] || RESULT_NOT_FOUND,
            result
        switch (value) {
            case RESULT_ERROR:
                result = RESULT_ERROR_MSG + index
                break

            case RESULT_NOT_FOUND:
                result = RESULT_NOT_FOUND_MSG + index
                break

            default:
                if (isType(value, Object)) {
                    result = `${value.ID} ${index} ${value.x} ${value.y} ${value.z}`
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

    // if the record has been calculated get it from cache
    if (hash && resultCache[hash]) {
        return resultCache[hash]
    } else {
        
    }

    if (!_calculate) {
        return null
    }

    let { IDs, lasts, value } = _calculate()
    let result = new Result(IDs, lasts)
    result.value = value

    if (shouldCache && hash) {

        // cache results
        resultCache[hash] = result
    }

    return result
}

module.exports.Result = Result
module.exports.createResult = createResult