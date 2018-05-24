const THOT = require('./lib')

const bot = new THOT(process.argv[2])

bot.register({name: 'parse', description: 'A command to demonstrate argument parsing', usage: ['"arguments go"','here']}, (args, msg) => {
    let str = ''
    str += `parsed arguments: ${JSON.stringify(args)}`

    msg.channel.createMessage(str)
})