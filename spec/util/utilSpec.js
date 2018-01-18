
describe("isType", () => {

    const { isType } = require("../../src/shared/util.js")
    const {EOL} = require("os")

    it("isType string", () => {
        let str = "string"
        expect(isType(str, String)).toBe(true)
    });

    it("isType integer", () => {
        let int = 1
        expect(isType(int, "Integer")).toBe(true)
    });

    it("isType decimal", () => {
        let decimal = 1
        expect(isType(decimal, "Decimal")).toBe(false)
    });

    it("isType int&alph", () => {
        let intAlph = "d"
        expect(isType(intAlph, "Int&Alph")).toBe(false)
    });
});

describe("strIsType", () => {
    const { strIsType } = require("../../src/shared/util.js")

    it("strIsType string", () => {
        let str = "string"
        expect(strIsType(str, String)).toBe(true)
    });

    it("strIsType integer", () => {
        let str = "11"
        expect(strIsType(str, "Integer")).toBe(true)
    });

    it("strIsType decimal", () => {
        let str = "11"
        expect(strIsType(str, "Decimal")).toBe(false)
    });

    it("strIsType int&alph", () => {
        let str = "plane1"
        expect(strIsType(str, "Int&Alph")).toBe(true)
    });

    it("strIsType int|alph", () => {
        let str = "111"
        expect(strIsType(str, "Int|Alph")).toBe(true)
    });
});

describe("convertType", () => {

    const { convertType } = require("../../src/shared/util.js")

    it("to string", () => {
        let str = "sss"
        expect(convertType(str, String)).toBe("sss")
    });

    it("to integer", () => {
        let str = "111.1"
        expect(convertType(str, "Integer")).toBe(111)
    });

    it("to decimal", () => {
        let str = "111.1"
        expect(convertType(str, "Decimal")).toBe(111.1)
    });
});

describe("numRangeCheck", () => {

    const { numRangeCheck } = require("../../src/shared/util.js")

    it("with floor", () => {
        let num = 10
        expect(numRangeCheck(num, 1, null)).toBe(true)
    });

    it("with upper", () => {
        let num = 10
        expect(numRangeCheck(num, null, 9)).toBe(false)
    });

    it("with floor and upper", () => {
        let num = 10
        expect(numRangeCheck(num, 1, 11)).toBe(true)
    });
});

describe("digitNumCheck", () => {

    const { digitNumCheck } = require("../../src/shared/util.js")

    it("with before", () => {
        let value = 111.11
        expect(digitNumCheck(value, 1, 3, null, null)).toBe(true)
    });

    it("with after", () => {
        let value = 111.11
        expect(digitNumCheck(value, null, null, 1, 4)).toBe(true)
    });

    it("with before and after", () => {
        let value = 111.11
        expect(digitNumCheck(value, 1, 4, 1, 4)).toBe(true)
    });
});