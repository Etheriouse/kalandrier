const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { app } = require('electron')

var admin_pwd;
var config;
var colortheme;

if (!fs.existsSync(path.join(app.getPath('userData'), 'password'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'password'), { recursive: true });
}
if (!fs.existsSync(path.join(app.getPath('userData'), 'clipboard'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'clipboard'), { recursive: true });
}
if (!fs.existsSync(path.join(app.getPath('userData'), 'calendar'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'calendar'), { recursive: true });
}
if (!fs.existsSync(path.join(app.getPath('userData'), 'search'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'search'), { recursive: true });
}
if (!fs.existsSync(path.join(app.getPath('userData'), 'Cache'))) {
    fs.mkdirSync(path.join(app.getPath('userData'), 'Cache'), { recursive: true });
}

try {
    fs.readFileSync(path.join(app.getPath('userData'), 'clipboard/history.json'), 'utf-8');
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'clipboard/history.json'), JSON.stringify([]));
}

try {
    fs.readFileSync(path.join(app.getPath('userData'), 'calendar/event.json'), 'utf-8');
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'calendar/event.json'), JSON.stringify([]));
}

try {
    fs.readFileSync(path.join(app.getPath('userData'), 'calendar/ics.json'), 'utf-8');
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'calendar/ics.json'), JSON.stringify({}));
}

try {
    fs.readFileSync(path.join(app.getPath('userData'), 'calendar/color_event.json'), 'utf-8');
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'calendar/color_event.json'), JSON.stringify({}));
}

try {
    fs.readFileSync(path.join(app.getPath('userData'), 'search/bdd.json'), 'utf-8');
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'search/bdd.json'), JSON.stringify({
        length: 0,
        files: [],
        words: {}
    }));
}

const cache_none = {
    "tools": {
        "clipboard": {
            "refresh_interval": "0"
        },
        "calendar": {
            "time-travel": 0
        },
        "markdown": {
            "input": ""
        }
    },
    "menu": {
        "games": false
    }
}

try {
    fs.readFileSync(path.join(app.getPath('userData') ,'Cache/cache.json'), 'utf-8');
} catch(err) {
    fs.writeFileSync(path.join(app.getPath('userData') ,'Cache/cache.json'), JSON.stringify(cache_none));
}

try {
    admin_pwd = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'password/config.json'), 'utf-8')).superpassword;
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'password/config.json'), JSON.stringify({ superpassword: '' }));
    admin_pwd = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'password/config.json'), 'utf-8')).superpassword;
}

try {
    config = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'config.json'), 'utf-8'));
} catch (err) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), JSON.stringify({ "tools": { "clipboard": { "time_ago_s": 300, "speed_clippaper_analyse": 700 }, "password": { "number_try": 3 } }, "colortheme": "dark" }));
    config = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'config.json'), 'utf-8'));
}

colortheme = config.colortheme;

if (!(admin_pwd.substring(0, 7) === '$2b$10$')) {
    const newhash = bcrypt.hashSync(admin_pwd);
    fs.writeFileSync(path.join(app.getPath('userData'), 'password/config.json'), JSON.stringify({ superpassword: newhash }));
    admin_pwd = newhash;
}

function saveconfig() {
    fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), JSON.stringify(config));
}

module.exports = { config, admin_pwd, colortheme, saveconfig };
