const https = require("https");
const fs = require("fs");
const path = require("path");


function downloadFile(url, pathname, filename) {
    const filepath = path.join(__dirname, pathname, filename);

    https.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.error("error http :c", res.statusCode);
            return;
        }

        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
            fileStream.close();
            console.log("file downloaded c: ", filepath);
        });
    }).on("error", (err) => {
        console.error("error during download :c ", err.message);
    });
}

async function getFile(url) {
    const response = await fetch(url);
    if(!response.ok) {
        console.error("error http :c", response.status);
        return;
    }
    const icsData = await response.text();
    return icsData;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


module.exports = { getFile, downloadFile, generateUUID };