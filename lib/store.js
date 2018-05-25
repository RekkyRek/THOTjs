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

	set (path, value) {
		let dirs = path.split('/')
		dirs.forEach(dir => console.log(dir))
	}
}

module.exports = THOTStore