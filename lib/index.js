const Eris = require('eris')
const EventEmitter = require('events')

const THOTHelpers = require('./helpers')
const THOTStore = require('./store')

class THOT extends EventEmitter {
    constructor (token, storePath) {
        super(token, storePath)
        this.commands = {}
        this.aliases = {}
        
        this.prefix = '$'

        this.eris = new Eris(token)
        this.eris.on("ready", () => {
            this.emit('ready')
        })

        this.eris.on("messageCreate", (msg) => {
            if (!msg.content.startsWith(this.prefix)) return

            const firstWord = msg.content.toLowerCase().split(' ')[0].substr(this.prefix.length)
            let action

            if (this.commands[firstWord]) {
                action = this.commands[firstWord].action
            } else if (this.aliases[firstWord]) {
                action = this.commands[this.aliases[firstWord]].action
            }

            if (action) {
                action(THOTHelpers.parseArguments(msg.content.substr(firstWord.length + this.prefix.length)), msg)
            }
        });

        this.eris.connect()

        this.store = new THOTStore(storePath)
    }

    register (meta, action) {
        const name = meta.name || meta
        const description = meta.description || 'No Description'
        const usage = meta.usage || []

        this.commands[name] = {
            description,
            usage,
            action
        }
    }

    alias (alias, action) {
        this.aliases[alias] = action
    }
}

module.exports = THOT