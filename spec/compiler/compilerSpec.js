

describe("Complier", () => {
    const { FIRST_RECORD_FORMAT, RECORD_FROMAT, RESULT_ERROR, _check, _calc } = require("../../src/shared/constants.js")
    const Compiler = require("../../src/compiler/compiler.js")
    const {EOL} = require("os")


    var compiler = new Compiler()

    it("should return the right compiled value", () => {
        var record = `plane1 1 1 1${EOL}
                plane1 1 1 1 1 2 3${EOL}
                plane1 2 3 4 1 1 1${EOL}
                plane1 3 4 5${EOL}
                plane1 1 1 1 1 2 3`

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

    it("0 should be fine", () => {
        var record = `plane5 1 1 1${EOL}
                plane5 1 1 1 1 2 3${EOL}
                plane5 2 3 4 0 0 0${EOL}
                plane5 3 4 5 1 1 1`

        let fn = compiler.compileToFunction(record)

        let value = [
            {
                ID: "plane5", x: 1, y: 1, z: 1
            },
            {
                ID: "plane5", x: 2, y: 3, z: 4, ox: 1, oy: 2, oz: 3
            },
            {
                ID: "plane5", x: 2, y: 3, z: 4, ox: 0, oy: 0, oz: 0
            },
            RESULT_ERROR
        ]
        expect(fn().value).toEqual(value);
    })

    it("ID with letters only is an error", () => {
        var record = `plane 1 1 1${EOL}`

        let fn = compiler.compileToFunction(record)

        let value = [
            RESULT_ERROR
        ]
        expect(fn().value).toEqual(value);
    });

    it("ID with integers is an error", () => {
        var record = `111 1 1 1${EOL}`

        let fn = compiler.compileToFunction(record)

        let value = [
            RESULT_ERROR
        ]
        expect(fn().value).toEqual(value);
    });

    it("decimal axis value is an error", () => {
        var record = `plane1 1.11 1 1${EOL}`

        let fn = compiler.compileToFunction(record)

        let value = [
            RESULT_ERROR
        ]
        expect(fn().value).toEqual(value);
    });

    it("minus axis value should be fine", () => {
        var record = `plane1 -1 1 1${EOL}`

        let fn = compiler.compileToFunction(record)

        let value = [
            {
                ID: "plane1", x: -1, y: 1, z: 1
            }
        ]
        expect(fn().value).toEqual(value);
    });

    it("records without first is an error", () => {
        var record = `plane1 1 1 1 1 1 1${EOL}
                      plane1 2 2 2 1 1 1${EOL}`

        let fn = compiler.compileToFunction(record)

        let value = [
            RESULT_ERROR,
            RESULT_ERROR
        ]
        expect(fn().value).toEqual(value);
    });

})