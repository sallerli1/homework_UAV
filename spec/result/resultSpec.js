

describe("Result", () => {

    const Compiler = require("../../src/compiler/compiler.js")
    const { createResult } = require("../../src/record/result.js")
    const {EOL} = require("os")

    var compiler = new Compiler()
    var record = `plane1 1 1 1${EOL}
                plane1 1 1 1 1 2 3${EOL}
                plane1 2 3 4 1 1 1${EOL}
                plane1 3 4 5${EOL}
                plane1 1 1 1 1 2 3`
    var obj

    beforeEach(() => {
        obj = {
            fn: compiler.compileToFunction(record)
        }

        spyOn(obj, "fn").and.callThrough()
    });

    it("should be cached", () => {
        createResult(obj.fn, {
            hash: 111,
            shouldCache: true
        })

        createResult(obj.fn, {
            hash: 111,
            shouldCache: true
        })

        expect(obj.fn).toHaveBeenCalledTimes(1)
    });
});