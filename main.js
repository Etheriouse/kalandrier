const { app, BrowserWindow } = require('electron');
const { createWindow } = require('./window');
const { save_event, save_ics_url, save_color_event } = require('./tools/calendar');
const { Handler } = require('./ipcHandler');
const utils = require('./utils')
const {saveconfig} = require('./config')

/** Artorias App 
 * /todo list -
 * - moai🗿
 * - createur template projet 💾🧱
 * - Quand on lance l'app on arrive sur un dashboard
 * - faire ma propre library de grand nombre
 * - faire un mini language de script !important 
*/

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
        save_event();
        save_ics_url();
        save_color_event();
        utils.savecache();
        saveconfig()
    }
})