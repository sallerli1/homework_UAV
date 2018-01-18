const Jasmine = require("jasmine")
const { strIsType, convertType } = require("./src/shared/util.js")

var jasmine = new Jasmine()

jasmine.loadConfigFile("spec/config/jasmine.json")

jasmine.execute()
