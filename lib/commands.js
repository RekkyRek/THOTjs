const fs = require('fs')
const path = require('path')

class THOTCommands {
    constructor(thot, path = process.cwd() + '/commands') {
        this.thot = thot
        this.path = path

        this.find()
    }

    async find() {
        let files = fs.readdirSync(this.path)
        files.forEach(file => {
            try {
                let { command, aliases, name, description, usage, action } = require(path.resolve(this.path, file))
                if(!command || !action) { return }
                if(!name || command) { name = command }

                this.thot.register({name, description, usage}, action)
                
                !aliases || aliases.forEach(alias => this.thot.alias(alias, command))
            } catch(e) {
                console.error(`Tried parsing "${file}" but encountered an error.`, e)
            }
        });
    }
}

module.exports = THOTCommands
