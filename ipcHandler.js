const calendar_ = require('./tools/calendar');
const utils = require('./utils');
const path = require('path');
const fs = require('fs');

const { closeWindow, loadfile, openFile, saveFile } = require('./window');
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

    /* ---------------------- Calendar ------------------ */

    ipcMain.handle('register-event', async (event, when) => {
        calendar_.registerevent(when);
    })

    ipcMain.handle('add-event', async (event, event_) => {
        return calendar_.addeventwindow(event_);
    })

    ipcMain.handle('confirm-event', async (event, slot) => {
        calendar_.confirmaddevent(slot);
    })

    ipcMain.handle('get-event', async (event) => {
        return calendar_.getevent_();
    })

    ipcMain.handle('get-event-day', async (event, year, month, day) => {
        return calendar_.geteventday(year, month, day);
    })

    ipcMain.handle('modify-event', async (event, event_) => {
        return await calendar_.modifyeventwindow(event_);
    })

    ipcMain.handle('confirm-modify-event', (event, event_) => {
        return calendar_.confirmmodifyevent(event_);
    })

    ipcMain.handle('delete-event', async (event, event_) => {
        return await calendar_.deleteevent(event_);
    })

    ipcMain.handle('export-ics-confirm', () => {
        return calendar_.exporthasics();
    })

    ipcMain.handle('import-from-ics', () => {
        return calendar_.importfromics();
    })

    ipcMain.handle('url-ics', async (event, url) => {
        return calendar_.setUrlIcs(url);
    })

    ipcMain.handle('url-get-event', async (event) => {
        return await calendar_.UrlIcs();
    })

    ipcMain.handle('get-color-of-event-by-name', (event, name) => {
        return calendar_.getColorOfEventByName(name);
    })

    /* ---------------------- Other --------------------- */

    ipcMain.handle('put-in-cache', async (event, path, value) => {
        utils.putincache(path, value);
    })

    ipcMain.handle('get-cache', async (event, path) => {
        return await utils.getcache(path);
    })

    ipcMain.handle('clear-cache', async (event) => {
        return utils.clearcache();
    })

    ipcMain.handle('reset-super-psd', async (event, nsp) => {
        return password_.resetsuperpsd(nsp);
    })

    ipcMain.handle('get-color-theme', async (event) => {
        return utils.getcolortheme();
    })

    ipcMain.handle('change-theme', async (event, theme) => {
        return utils.changetheme(theme);
    })

    /* Games */

    ipcMain.handle('generate-ground', async (event, size) => {
        return games.minesweeper.generateground(size);
    })

    ipcMain.handle('set-flag-or-dig', async (event, x, y, a) => {
        return games.minesweeper.setflagordig(x, y, a);
    });
}

module.exports = { Handler };