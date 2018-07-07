const THOT = require('./lib')

const bot = new THOT(process.argv[2], { commandsPath: process.cwd() + '/commands' })