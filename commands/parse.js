const handle = async (args, msg) => {
    let str = ''
    str += `parsed arguments: [\n`

    args.forEach(arg => {
        str += ` (${typeof(arg)}) ${JSON.stringify(arg)},\n`
    });

    str += ']'

    msg.channel.createMessage(str)
}

module.exports = {
    command: 'parse',
    description: 'A command to demonstrate argument parsing',
    usage: ['"arguments go"','here'],
    action: handle
}