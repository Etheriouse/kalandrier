const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    loadmenu: async (namemenu) => {
        return await ipcRenderer.invoke('load-page', namemenu)
    },

    getobjectpwd: async () => {
        return ipcRenderer.invoke('get-objectpwd')
    },

    loadpwds: async () => {
        return ipcRenderer.invoke('load-pwds')
    },

    confirmedpasswordadmin: async (entered_password) => {
        return ipcRenderer.invoke('confirmed-password', entered_password);
    },

    decryptpassword: async (pwd) => {
        return ipcRenderer.invoke('decrypt-password', pwd);
    },

    savepsd: async (psd_object) => {
        return ipcRenderer.invoke('save-psd', psd_object);
    },

    addpsd: async (psd_object) => {
        return ipcRenderer.invoke('register-password', psd_object);
    },

    deletepsd: async (psd_to_delete) => {
        console.log(psd_to_delete);
        return ipcRenderer.invoke('delete-password', psd_to_delete);
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

    gethistorypaper: async () => {
        return await ipcRenderer.invoke('get-history-paper');
    },

    settopaper: (text) => {
        ipcRenderer.invoke('set-to-paper', text);
    },

    deletetohistory: (date) => {
        return ipcRenderer.invoke('delete-to-history', date);
    },

    putincache: async (path, value) => {
        ipcRenderer.invoke('put-in-cache', path, value);
    },

    getcache: async (path) => {
        return await ipcRenderer.invoke('get-cache', path)
    },

    clearcache: async () => {
        return ipcRenderer.invoke('clear-cache');
    },

    getpossibletypefor: async (type) => {
        return ipcRenderer.invoke('get-possible-type-for', type);
    },

    fromconvertto: async (section, fromType, value, toType) => {
        return await ipcRenderer.invoke('from-convert-to', section, fromType, value, toType);
    },

    registerevent: async (when) => {
        ipcRenderer.invoke('register-event', when);
    },

    getevent: async () => {
        return await ipcRenderer.invoke('get-event');
    },

    confirmaddevent: async (event) => {
        return await ipcRenderer.invoke('confirm-event', event);
    },

    geteventday: async (year, month, day) => {
        return await ipcRenderer.invoke('get-event-day', year, month, day);
    },

    confirmmodifyevent: async (event) => {
        return await ipcRenderer.invoke('confirm-modify-event', event);
    },

    deleteevent: async (event) => {
        return await ipcRenderer.invoke('delete-event', event);
    },

    resetsuperpsd: async (nsp) => {
        return await ipcRenderer.invoke('reset-super-psd', nsp)
    },

    getobservmenu: async () => {
        return await ipcRenderer.invoke('get-observ-menu')
    },

    getusedcpu: async () => {
        return await ipcRenderer.invoke('get-used-cpu');
    },

    openfile: async (extention) => {
        return await ipcRenderer.invoke('open-file', extention);
    },
    
    savefile: async (content, extention) => {
        return await ipcRenderer.invoke('save-file', content, extention);
    },

    getcolortheme: async () => {
        return await ipcRenderer.invoke('get-color-theme');
    },

    changetheme: async (theme) => {
        return await ipcRenderer.invoke('change-theme', theme);
    },

    search: async (words) => {
        return await ipcRenderer.invoke('search-in-index-base', words);
    },

    fetchbdd: async (path) => {
        return await ipcRenderer.invoke('fetch-bdd', path);
    },

    exporttoics: () => {
        return ipcRenderer.invoke('export-ics-confirm');
    },
    
    importfromics: () => {
        return ipcRenderer.invoke('import-from-ics');
    },
    
    setUrlIcs: (url) => {
        return ipcRenderer.invoke('url-ics', url);
    },

    getEventIcs: () => {
        return ipcRenderer.invoke("url-get-event");
    },

    getColorOfEventByName: async (name) => {
        return await ipcRenderer.invoke('get-color-of-event-by-name', name);
    }
})

contextBridge.exposeInMainWorld('window_', {
    passwordmodify: async (password_id) => {
        return await ipcRenderer.invoke('password-modify', password_id)
    },

    passwordadd: async () => {
        return await ipcRenderer.invoke('password-add');
    },

    adminpassword: async () => {
        return await ipcRenderer.invoke('admin-password');
    },

    addevent: async (event) => {
        return await ipcRenderer.invoke('add-event', event);
    },

    modifyevent: async (event) => {
        return await ipcRenderer.invoke('modify-event', event);
    },

    close: async () => {
        return await ipcRenderer.invoke('close-window');
    }
})

// contextBridge.executeInMainWorld('mine', {
    
// })