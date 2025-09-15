const { BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs')
const { colortheme } = require('./config')

let main_app;

const ext = {
    "md": "Markdown",
    "txt": "Text",
    "cc": "C++",
    "js": "JavaScript",
    "py": "Python",
    "html": "Html",
    "json": "Json",
    "ts": "TypeScript",
    "png": "Image",
    "jpeg": "Image",
    "jpg": "Image",
    "bit": "Image",
}

var bgcolor = colortheme == 'dark' ? '#2d2d2d' : '#ffffff'


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        backgroundColor: bgcolor,
        icon: path.join(__dirname, 'assets/icons/icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });

    win.loadFile('src/tools/calendar/main.html');
    win.setMenuBarVisibility(false);
    win.webContents.on('did-finish-load', () => {
        win.show(); // <-- la fenêtre ne s'affiche qu'une fois tout prêt
    });
    main_app = win;
}

const createChildWindow = (namefile, block, size, resizeable = true, iconname = 'icon.ico') => {
    
    if (!size) {
        size = {
            width: 400,
            height: 300
        }
    }
    const childWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        backgroundColor: bgcolor,
        modal: block || true,
        resizable: resizeable,
        icon: path.join(__dirname, 'assets/icons/'+iconname),
        parent: BrowserWindow.getFocusedWindow(),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });

    childWindow.loadFile('src/' + namefile + '.html');
    childWindow.setMenuBarVisibility(false);
    return childWindow;
}

const closeWindow = () => {
    let win_focus = BrowserWindow.getFocusedWindow();
    if (win_focus) {
        win_focus.close();
    }
}

function loadfile(namemenu) {
    main_app.loadFile('src/' + namemenu);
}

async function saveFile(content, typefile) {
    const options = {
        title: 'Save file',
        defaultPath: 'newfile' + '.' + typefile,
        buttonLabel: 'Save',
        filters: [
            { name: `${ext[typefile]} Files`, extensions: [typefile] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };

    const result = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), options);

    if (result.canceled) {
        return { ok: true, canceled: true };
    } else if (!result.filePath) {
        return { ok: false, canceled: false };
    } else {
        fs.writeFileSync(result.filePath, content)
        return { ok: true, canceled: false };
    }
}

async function openFile(typefile) {
    const options = {
        title: 'Open file',
        buttonLabel: 'Open',
        openDirectory: false,
        multiSelections: false,
        showHiddenFiles: true,
        filters: [
            { name: `${ext[typefile]} Files`, extensions: [typefile] },
            { name: 'All Files', extensions: ['*'] }
        ]
    };

    const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), options);

    if (result.canceled) {
        return { ok: true, canceled: true };
    } else if (!result.filePaths) {
        return { ok: false, canceled: false };
    } else {
        const ext_give = result.filePaths[0].split('.')
        if (ext_give[ext_give.length - 1] === typefile) {
            return { ok: true, canceled: false, content: fs.readFileSync(result.filePaths[0], 'utf-8'), filepath: result.filePaths[0] };
        } else {
            return { ok: false, canceled: false };
        }
    }
}

const mainApp = () => main_app;

module.exports = { createWindow, createChildWindow, mainApp, closeWindow, loadfile, saveFile, openFile };