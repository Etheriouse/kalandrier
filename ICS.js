const { getFile, generateUUID } = require("./utils");

const events = [];


async function getICSEvent(url) {
    const icsData = await getFile(url);
    if(icsData) {
        parseICSData(icsData);
    } else {
        console.log("No ICS data found.");
    }
    return events;
}

async function parseICSData(icsData) {

    const lines = icsData.split(/\r?\n/);
    const event = {};
    lines.forEach(line => {
        if(line.startsWith('BEGIN:VEVENT')) {
            event.uuid = generateUUID();
        } else if(line.startsWith('END:VEVENT')) {
            events.push(event);
        } else if(line.startsWith('SUMMARY:')) {
            event.summary = line.replace('SUMMARY:', '');
        } else if(line.startsWith('DTSTART:')) {
            event.start = line.replace('DTSTART:', '');
        } else if(line.startsWith('DTEND:')) {
            event.end = line.replace('DTEND:', '');
        } else if(line.startsWith('DESCRIPTION:')) {
            event.description = line.replace('DESCRIPTION:', '');
        } else if(line.startsWith('LOCATION:')) {
            event.location = line.replace('LOCATION:', '');
        }
    });
}

module.exports = { getICSEvent };