//import * as tabs from './tabs.js'
import * as menus from './menus.js'
import { admin_perm } from './admin.js';
// import { setColorTheme } from './color.js'

function set_event() {
    loadCache();

    document.getElementById('tools-selector').querySelectorAll('.icon-menu-span').forEach(span => {
        span.addEventListener('click', () => {
            const value = (String(span.dataset.name)).toLowerCase();
            if(value == "home") {
                menus.loadmenu('tools/calendar/main.html');
            }

        })
    })


    document.getElementById('settings-selector').querySelectorAll('.icon-menu-span').forEach(span => {
        span.addEventListener('click', () => {
            const value = (String(span.dataset.name)).toLowerCase();
            menus.loadmenu(value+'.html');
        })
    })

}

set_event();