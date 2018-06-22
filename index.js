const THOT = require('./lib')

const bot = new THOT(process.argv[2])

bot.store.set('some/path/here', 'test')

console.log(bot.store.get('some/path/here'))

bot.register({name: 'parse', description: 'A command to demonstrate argument parsing', usage: ['"arguments go"','here']}, (args, msg) => {
    let str = ''
    str += `parsed arguments: [\n`

    args.forEach(arg => {
        str += ` (${typeof(arg)}) ${JSON.stringify(arg)},\n`
    });

    str += ']'

    msg.channel.createMessage(str)
})

bot.register({name: 'ping', description: 'Test the current ping to Discord API', usage: []}, async (args, msg) => {
	let time = Date.now()
    let message = await msg.channel.createMessage('Pinging...')
    time = Date.now() - time
    message.edit(`**A2R Time:** ${time}ms`)
})

bot.alias('p', 'ping')