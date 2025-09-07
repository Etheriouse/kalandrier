const { app, BrowserWindow } = require('electron');
const { createWindow } = require('./window');
//const { runClipboard, saveClipboardHistory } = require('./tools/clipboard');
//const { save_event, save_person, save_color_event } = require('./tools/calendar');
const { Handler } = require('./ipcHandler');
//const utils = require('./utils')
//const {saveconfig} = require('./config')


console.log(app.getPath('userData'))

app.whenReady().then(async () => {
    Handler();
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})