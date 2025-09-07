const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    loadmenu: async (namemenu) => {
        return await ipcRenderer.invoke('load-page', namemenu)
    },

    openfile: async (extention) => {
        return await ipcRenderer.invoke('open-file', extention);
    },

    savefile: async (content, extention) => {
        return await ipcRenderer.invoke('save-file', content, extention);
    },


    openfolder: async (path) => {
        ipcRenderer.invoke('open-folder', path);
    },

    openfilefolder: async (path) => {
        ipcRenderer.invoke('open-file-folder', path);
    },

    opensite: async (url) => {
        ipcRenderer.invoke('open-website', url);
    },

    getICSevent: async (url) => {
        return await ipcRenderer.invoke('get-ics-event', url);
    }

})

