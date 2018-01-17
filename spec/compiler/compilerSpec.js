

describe("Complier", () => {
    const { FIRST_RECORD_FORMAT, RECORD_FROMAT, RESULT_ERROR, _check, _calc } = require("../../src/shared/constants.js")
    const Compiler = require("../../src/compiler/compiler.js")
    const {EOL} = require("os")


    var compiler = new Compiler()
    var record = `plane1 1 1 1${EOL}
                plane1 1 1 1 1 2 3${EOL}
                plane1 2 3 4 1 1 1${EOL}
                plane1 3 4 5${EOL}
                plane1 1 1 1 1 2 3`

    it("should return the right compiled value", () => {
        let fn = compiler.compileToFunction(record)

        let value = [
            {
                ID: "plane1", x: 1, y: 1, z: 1
            },
            {
                ID: "plane1", x: 2, y: 3, z: 4, ox: 1, oy: 2, oz: 3
            },
            {
                ID: "plane1", x: 3, y: 4, z: 5, ox: 1, oy: 1, oz: 1
            },
            RESULT_ERROR,
            RESULT_ERROR
        ]
        expect(fn().value).toEqual(value);
    })
})