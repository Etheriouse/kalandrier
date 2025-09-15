const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var time_travel = 0;
var today, week, week_number;
let slot_clicked;
let event_clicked;

function WhatIsToday() {
    return new Date();
}

function WhatIsThisWeek() {
    const week = [];

    const dayOfWeek = today.getDay();
    const mondayOffset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        week.push(d);
    }

    return week;

}

async function setup() {

    today = WhatIsToday();
    week = WhatIsThisWeek();

    setup_calendar();

    document.getElementById('calendar').style.display = 'flex';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('grid').scrollTop = (new Date().getHours() * 100 + ((new Date().getMinutes() / 60) * 100))
    document.getElementById('time-now').style.height = `${(new Date().getHours() * 100 + ((new Date().getMinutes() / 60) * 100))}px`;

}

async function getEventIcsUrl() {
    const result = await window.api.getEventIcs();
    if (result.ok) {
        const events = result.content;
        const today = sameWeek(new Date());
        const weekEvent = events.filter(event => {
            const start = sameWeek(parseCompactIso(event.start));
            return start.year == today.year && start.week == today.week;
        })
        return weekEvent;
    } else {
        return [];
    }
}

function sameWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const years = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d - years) / 86400000) + 1) / 7);
    return { year: d.getUTCFullYear(), week: week };

}

function parseCompactIso(str) {
    if (!/^\d{8}T\d{6}Z$/.test(str)) {
        throw new Error("Format invalide. Exemple attendu: 20251117T084500Z");
    }

    const year = parseInt(str.slice(0, 4), 10);
    const month = parseInt(str.slice(4, 6), 10);
    const day = parseInt(str.slice(6, 8), 10);
    const hour = parseInt(str.slice(9, 11), 10);
    const minute = parseInt(str.slice(11, 13), 10);
    const second = parseInt(str.slice(13, 15), 10);

    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

setup()

async function setupEvent() {

    const events = await getEventIcsUrl();

    calculateEventRender(events).forEach(event => {
        render_event(event);
    })
}

function calculateEventRender(events) {
    events.forEach(event => {
        event.startDate = parseCompactIso(event.start);
        event.endDate = parseCompactIso(event.end);
        event.totalColumns = 1;
    });

    const sortedEvents = [...events].sort((a, b) => a.startDate - b.startDate);

    const columns = [];

    sortedEvents.forEach(event => {
        let placed = false;

        for (let col = 0; col < columns.length; col++) {
            const lastInCol = columns[col][columns[col].length - 1];
            if (event.startDate >= lastInCol.endDate) {
                columns[col].push(event);
                event.offset = col;
                placed = true;
                break;
            }
        }

        if (!placed) {
            columns.push([event]);
            event.offset = columns.length - 1;
        }
    });

    events.forEach(event => {
        const overlapGroup = new Set();

        function dfs(e) {
            if (overlapGroup.has(e)) return;
            overlapGroup.add(e);

            events.forEach(other => {
                if (e === other) return;

                const overlap =
                    !(e.endDate <= other.startDate || e.startDate >= other.endDate);

                if (overlap) {
                    dfs(other);
                }
            });
        }

        dfs(event);

        const maxOffset = Math.max(...[...overlapGroup].map(e => e.offset));
        const widthRatio = 1 / (maxOffset + 1);

        event.widthRatio = parseFloat(widthRatio.toFixed(2));
        event.totalColumns += maxOffset;

    });



    return events;
}

function setup_calendar() {

    const titleday = document.getElementById('day-title');

    week.forEach(d => {
        const dayDiv = document.createElement('div');

        dayDiv.className = "day";
        if (d.getDay() === (today.getDay())) {
            dayDiv.id = 'today';
        }

        for (let i = 7; i < 22; i++) {
            const demi_hour = document.createElement('div');
            demi_hour.className = "bothour";
            const demi_hour2 = document.createElement('div');
            demi_hour2.className = "tophour"

            dayDiv.appendChild(demi_hour)
            dayDiv.appendChild(demi_hour2)

        }
        document.getElementById('content').appendChild(dayDiv);

        const divday = document.createElement('div');
        const divtitle = document.createElement('div');
        divtitle.className = 'day-title-div'
        if (d.getDay() === (today.getDay())) {
            divday.id = 'today';
        }
        const day_week = document.createElement('h3');
        day_week.innerHTML = days[d.getDay()];
        const day_date = document.createElement('h3');
        if (d.getDate() < 10) {
            day_date.innerHTML += '0';
        }
        day_date.innerHTML += d.getDate();
        divtitle.appendChild(day_week)
        divtitle.appendChild(day_date)
        divday.appendChild(divtitle)
        titleday.appendChild(divday);
    })

    for (let i = 7; i < 22; i++) {
        const divhour = document.createElement('div');
        const hour = document.createElement('h3');
        if (i < 10) {
            hour.innerHTML = '0';
        }
        hour.innerHTML += i;
        divhour.appendChild(hour)
        document.getElementById('side-content').appendChild(divhour)
    }

    document.getElementById('bar').appendChild(titleday)
    setupEvent();
    document.getElementById('time-now').style.pointerEvents = 'none';
}

function hexToRgb(hex) {
    if (!hex) {
        return '0, 0, 0'
    }
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}

async function render_event(event) {
    if (typeof event === 'string') {
        event = JSON.parse(event).data;
    }
    const event_div = document.createElement('div');
    event_div.style.zIndex = 10;
    if (!event.color) {
        const resultOfName = await window.api.getColorOfEventByName(event.summary);
        if (resultOfName.ok) {
            event.color = resultOfName.color;
        }
    }
    const color = hexToRgb(event.color);

    event_div.style.backgroundColor = `rgba(${color} ,0.4)`;
    event_div.style.borderLeft = `7px solid rgb(${color})`

    const start = parseCompactIso(event.start);
    const end = parseCompactIso(event.end);


    event_div.style.width = `${event.widthRatio * 100}%`;
    event_div.style.left = `${(event.offset / event.totalColumns) * 100}%`;
    console.log("offset", event.offset);
    console.log("totalColumns", event.totalColumns);
    
    event_div.style.top = `${((start.getHours() + (start.getMinutes() / 60)) * 100) - 100*7}px`

    const duration = parseFloat(((end - start) / (1000 * 60 * 60)).toFixed(2));

    event_div.style.height = parseInt((duration * 100)) + 'px';
    console.log(`${(1/event.totalColumns)*100}%`);
    console.log(event_div);


    event_div.style.boxSizing = 'border-box'

    const name = document.createElement('h4');
    name.innerHTML = event.summary
    name.className = 'event-name'

    const location = document.createElement('p');
    location.innerHTML = event.location;
    location.className = 'event-location'

    const organizer = document.createElement('p');
    organizer.innerHTML = event.organizer;
    organizer.className = 'event-organizer'

    if(!event.organizer) {
        organizer.style.display = "none"
    }

    const description = document.createElement('p');
    description.innerHTML = event.description;
    description.className = 'event-description'

    const houre = document.createElement('p');
    var minutesS = start.getMinutes(), minutesE = end.getMinutes();

    houre.innerHTML = `${start.getHours()}h${minutesS != '00' ? minutesS : ''} - ${end.getHours()}h${minutesE != '00' ? minutesE : ''}`;

    event_div.appendChild(name)
    event_div.appendChild(location)
    event_div.appendChild(houre)
    event_div.appendChild(description)
    event_div.appendChild(organizer)

    event_div.className = 'event';

    document.getElementsByClassName('day')[start.getDay() === 0 ? 6 : start.getDay() - 1].appendChild(event_div);
}