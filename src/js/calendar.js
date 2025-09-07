const linkforIcsCalendar = "https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/53wkMP3y.shu";


const eventList = [];

window.api.getICSevent(linkforIcsCalendar).then((icsData) => {
    eventList.push(...icsData);
    parseTodayEvent();
    configurationCalendar();
});

function parseTodayEvent() {
    const today = new Date();
    eventList.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
    });
}


function configurationCalendar() {

    buildCalendar();
    console.log(eventList)
    // eventList.forEach(event => {
    //     renderEvents(event);
    // });
    renderEvents(eventList[0]);
    document.getElementById('calendar').style.display = 'flex';
    document.getElementById('loading').style.display = 'none';

}


function buildCalendar() {
    for (let i = 7; i < 23; i++) {
        const divHour = document.createElement('div');
        divHour.classList.add('hour');
        const spanHour = document.createElement('span');
        spanHour.textContent = (i < 10 ? '0' : '') + i + 'h';
        divHour.appendChild(spanHour);
        document.getElementById('side-content').appendChild(divHour);

        const divContentHour = document.createElement('div');
        divContentHour.classList.add('content-hour');
        const semicontentHour1 = document.createElement('div');
        semicontentHour1.classList.add('semicontent-hour-top');
        const semicontentHour2 = document.createElement('div');
        semicontentHour2.classList.add('semicontent-hour-bot');
        divContentHour.appendChild(semicontentHour1);
        divContentHour.appendChild(semicontentHour2);
        document.getElementById('content').appendChild(divContentHour);
    }

    const now = new Date();
    const currentHour = now.getHours() - 7;
    const currentMinutes = now.getMinutes();

    const topPos = currentHour * 100 + ((currentMinutes / 60) * 100);
    document.getElementById('time-now').style.top = topPos + 'px';

}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

function renderEvents(event) {
    const divEvent = document.createElement('div');
    divEvent.classList.add('event');
    divEvent.textContent = event.summary;
    
    const start = new Date(event.start.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, "$1-$2-$3T$4:$5:$6Z"));
    const end = new Date(event.end.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, "$1-$2-$3T$4:$5:$6Z"));
    const startHour = start.getHours();
    const startMinutes = start.getMinutes();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();

    console.log(start, end);

    const durationInHours = endHour - startHour + (endMinutes - startMinutes) / 60;

    const topPos = ((startHour - 7) * 100) + ((startMinutes / 60) * 100);
    const height = durationInHours * 100;

    divEvent.style.top = `${topPos}px`;
    divEvent.style.height = `${height}px`;

    console.log(topPos, height);

    const color = hexToRgb(event.color || getRandomColor());

    divEvent.style.backgroundColor = `rgba(${color} ,0.4)`;
    divEvent.style.borderLeft = `7px solid rgb(${color})`


    document.getElementById('content').appendChild(divEvent);
}

