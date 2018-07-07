const handle = async (args, msg) => {
	let time = Date.now()
    let message = await msg.channel.createMessage('Pinging...')
    time = Date.now() - time
    message.edit(`**A2R Time:** ${time}ms`)
}

module.exports = {
    command: 'ping',
    aliases: ['p'],
    name: 'ping',
    description: 'Test the current ping to Discord API',
    usage: [],
    action: handle
}