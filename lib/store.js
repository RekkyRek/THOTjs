const fs = require('fs')

class THOTStore {
	constructor (path = process.cwd() + '/store') {
		this.path = path
		this.data = {}

		console.log(this.path)

		if (fs.existsSync(this.path)) {
			const files = fs.readdirSync(this.path)
			files.forEach(file => {
				if (file.split('.').pop() !== 'json') return
				try {
					this.data[file.split('.')[0]] = JSON.parse(fs.readFileSync(`${this.path}/${file}`))
 				} catch (e) {
					console.warn(`[Warning] Failed to parse ${file}`)
				}
			})
		} else {
			fs.mkdirSync(this.path)
		}

		console.log(this.data)
	}

	resolve(path) {
		let dirs = path.split('/')
		let str = ''
		dirs.forEach(dir => {
			str += `['${dir}']`
			eval(`this.data${str} === undefined ? this.data${str} = {} : ''`)
		})
		return str
	}

	set (path, value) {
		eval(`this.data${this.resolve(path)} = value`)
	}

	get (path) {
		return eval(`this.data${this.resolve(path)}`)
	}
}

module.exports = THOTStore