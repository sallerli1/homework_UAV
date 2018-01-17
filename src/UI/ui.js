
const EventEmitter = require("events")
const readline = require("readline")
const Core = require("../core/core.js")
const { seperateStr, convertType, isType } = require("../shared/util.js")
const { globalCmdOptions } = require("../shared/constants.js")

class UI extends EventEmitter {

    constructor(options) {
        super()
        if (!options) {
            this.cmdOptions = globalCmdOptions
        } else {
            this.cmdOptions = resolveGlobalOption(options)
        }
        this.core = new Core()
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.initRL(this.rl)
        this.init()
    }

    init() {
        this.on("exec", (cmdStr) => {
            this.rl.pause()
            this.execute(this.parse(cmdStr))
        })

        this.on("complete", (ret) => {
            if (ret) {
                console.log(ret)
            }
            this.rl.resume()
        })
    }

    initRL(rl) {
        rl.on("line", (line) => {
            this.emit("exec", line)
        })
    }

    parse(cmdStr) {
        let cmd = {}
        let cmdStrArr = seperateStr(cmdStr, " ")
        cmd.oper = cmdStrArr.shift()
        cmd.dst = cmdStrArr.pop()
        cmd.params = new Set(
            cmdStrArr.map((value) => {
                return value.replace("-", "")
            })
        )

        return cmd
    }

    execute(cmd) {
        let ret;
        switch (cmd.oper) {
            case this.cmdOptions.file["oper"]:
                let shouldCache = false
                if (cmd.params.has(
                    this.cmdOptions.file["params"]["shouldCache"]
                    )
                ) {
                    shouldCache = true
                }
                ret = this.core.collect(cmd.dst, shouldCache)
                break;
        
            case this.cmdOptions.query["oper"]:
                let index = convertType(cmd.dst, "Integer")
                ret = this.core.query(index)
                break;

            default:
                break;
        }

        this.emit("complete", ret)
    }
}

function resolveGlobalOption(options) {
    return {
        file: {
            oper: options.file["oper"]
                && isType(options.file["oper"], String) ?
                options.file["oper"] : globalCmdOptions.file["oper"],
            params: {
                shouldCache: options.file["params"]["shouldCache"]
                    && isType(options.file["params"]["shouldCache"], String) ?
                    options.file["params"]["shouldCache"] : globalCmdOptions.file["params"]["shouldCache"]
            }
        },
        query: {
            oper: options.query["oper"]
                && isType(options.query["oper"], String) ?
                options.query["oper"] : globalCmdOptions.query["oper"],
            params: {}
        }
    }
}

module.exports = UI