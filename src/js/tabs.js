const tabs = [];
const deleted_tab = [];

function _sub_tab(element) {
    const tab_bar = document.getElementById('tab-bar');
    tab_bar.removeChild(element);
}

_add_tab("Hello world")
_add_tab("Hello world")
_add_tab("Hello world")
_add_tab("Hello world")
_add_tab("Hello world")

function _add_tab(type) {
    const tab_bar = document.getElementById('tab-bar');

    const tab = document.createElement('div');
    const div = document.createElement('div');
    const delete_div = document.createElement('div');
    const icon = document.createElement('span');
    const x = document.createElement('span');
    const title = document.createElement('h3');

    div.className = "title-tab";
    delete_div.className = "delete-tab";

    tab.className = 'tab';
    icon.className = 'icon';
    icon.innerHTML = '💥';
    x.className = 'x';
    x.innerHTML = '✖️'

    x.addEventListener('click', () => {
        _sub_tab(tab);
    })

    tab.addEventListener('click', () => {
        Array.from(tab_bar.children).forEach(div_ => {
            if (!(div_.id === 'add-tab'))
                div_.id = '';
        })
        tab.id = 'selected-tab'
    })

    title.innerHTML = type;

    div.appendChild(icon);
    div.appendChild(title);

    delete_div.appendChild(x);
    tab.appendChild(div);
    tab.appendChild(delete_div);
    Array.from(tab_bar.children).forEach(div_ => {
        if (!(div_.id === 'add-tab'))
            div_.id = '';
    })
    tab.id = 'selected-tab'
    tab_bar.insertBefore(tab, document.getElementById('add-tab'));
}