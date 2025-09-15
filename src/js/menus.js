export function select_icon(icon_selected_clicked) {
    const icons = document.getElementById('tools-selector');
    icons.childNodes.forEach(icon => {
        if (icon.nodeType === Node.ELEMENT_NODE) {
            icon.classList.remove('icon-selected');
        }
    });
    icon_selected_clicked.classList.add('icon-selected');
}

export async function loadmenu(name) {
    const page = await window.api.loadmenu(name);
    console.log(`result: ${page}`);
}
