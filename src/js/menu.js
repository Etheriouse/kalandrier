const tools = [
];

const games = [
]

const settings = [
    // { icon: "🗿", label: "Profil" },
    { icon: "⚙️", label: "Settings" }
]
var gamesHidden = true;

async function loadCache() {
    gamesHidden = await window.api.getcache('menu/games');
    if (!gamesHidden) {
        const gameIcons = document.querySelectorAll('.games-icons');
        gameIcons.forEach(e => {
            e.style.opacity = '1';
            e.style.transform = 'translateY(0px)';
        })
    }
}

window.onbeforeunload = () => {
    window.api.putincache('menu/games', gamesHidden);
}


function createMenu() {
    const iconss = document.getElementById('icon-selector');

    const home = document.createElement('div');
    home.id = 'tools-selector';

    const divh = document.createElement('div');
    const spanh = document.createElement('span');
    spanh.innerHTML = '🗓️';
    spanh.className = 'icon-menu-span'
    spanh.dataset.name = "home";
    const h3 = document.createElement('h3');
    h3.innerHTML = "home";
    h3.style.display = 'none'
    divh.appendChild(spanh);
    divh.appendChild(h3);
    home.appendChild(divh);

    const settingss = document.createElement('div');
    settingss.id = 'settings-selector';

    settings.forEach(menu_ => {
        const div = document.createElement('div');
        const span = document.createElement('span');
        span.innerHTML = menu_.icon;
        span.className = 'icon-menu-span'
        span.dataset.name = menu_.label;
        const h3 = document.createElement('h3');
        h3.innerHTML = menu_.label;
        h3.style.display = 'none'
        div.appendChild(span);
        div.appendChild(h3);
        settingss.appendChild(div);
    })


    iconss.appendChild(home);
    iconss.appendChild(settingss)
}

createMenu();