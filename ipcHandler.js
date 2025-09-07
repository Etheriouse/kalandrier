const path = require('path');

const utils = require('./utils');
const ics = require('./ICS');
const { loadfile, openFile, saveFile } = require('./window');
const { ipcMain, shell, app } = require('electron');

function Handler() {

    /* --------------------- Window --------------------- */

    ipcMain.handle('load-page', async (event, namemenu) => {
        loadfile(namemenu);
    })

    ipcMain.handle('open-file', async (event, extention) => {
        return await openFile(extention);
    })

    ipcMain.handle('save-file', async (event, content, extention) => {
        return await saveFile(content, extention);
    })

    /* --------------------- Shell ---------------------- */

    ipcMain.handle('open-website', (event, url) => {
        shell.openExternal(url);
    })

    ipcMain.handle('open-folder', (event, path_) => {
        if (path_.dirname) {
            shell.openPath(path.join(app.getPath('userData'), path_.path));
        } else {
            shell.openPath(path.join(path_.path));
        }
    })

    ipcMain.handle('open-file-folder', (event, path_) => {
        if(path_.dirname) {
            shell.showItemInFolder(path.join(app.getPath('userData'), path_.path));
        } else {
            shell.showItemInFolder(path.join(path_.path));
        }
    })

    /* --------------------- Tools ---------------------- */

    ipcMain.handle('get-ics-event', async (event, url) => {
        return await ics.getICSEvent(url);
    })

}

module.exports = { Handler };