const electron = require(`electron`)
const {app, BrowserWindow} = electron

/**@type {Electron.BrowserWindow} */
let window

app.on(`ready`, function() {
	window = new BrowserWindow({
		width: 1000, height: 700,
		show: false
	})
	window.loadURL(`file:///${__dirname}/index.html`)
	window.once(`ready-to-show`, window.show)
})