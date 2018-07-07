const Discord = require('discord.js')
const EventEmitter = require('events')

const THOTHelpers = require('./helpers')
const THOTStore = require('./store')
const THOTCommands = require('./commands')

class THOT extends EventEmitter {
    constructor (token, options) {
        super(token, options)

        this.commands = {}
        this.aliases = {}
        
        this.prefix = options.prefix || '$'

        this.client = new Discord.Client()
        this.client.on("ready", () => {
            this.emit('ready')
        })

        this.client.on("message", (msg) => {
            if (!msg.content.startsWith(this.prefix)) return

            const firstWord = msg.content.toLowerCase().split(' ')[0].substr(this.prefix.length)
            let action

            if (this.commands[firstWord]) {
                action = this.commands[firstWord].action
            } else if (this.aliases[firstWord]) {
                action = this.commands[this.aliases[firstWord]].action
            }

            if (action) {
                try {
                    action(THOTHelpers.parseArguments(msg.content.substr(firstWord.length + this.prefix.length)), msg, this)
                } catch (e) {
                    console.error(e)
                }
            }
        });

        this.client.login(token)

        this.store = options.storePath ? new THOTStore(options.storePath) : null
        this.commandFinder = options.commandsPath ? new THOTCommands(this, options.commandsPath) : null
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