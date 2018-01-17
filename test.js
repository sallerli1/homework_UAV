const Jasmine = require("jasmine")

var jasmine = new Jasmine()

jasmine.loadConfigFile("spec/config/jasmine.json")

jasmine.execute()