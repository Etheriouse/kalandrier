const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');

const admin_pwd = '$2b$10$1uKxYJ4bXBAYx1pttWeGrOoqKUMAzShiKi7pRuI6gbh5mrCrO/vRy';

const password = register_pwd("Istic", admin_pwd);
console.log("password registered")

console.log(show_pwd(password, admin_pwd));

// var crypt = crypto.format.OpenSSL.stringify(crypto.AES.encrypt('Hello my password', "lily"));
// console.log(crypt);

// console.log(crypto.AES.decrypt(crypto.format.OpenSSL.parse(crypt), "lily").toString(crypto.enc.Utf8))


// //const {encryptedData, iv, salt } = create_secret_key(admin_pwd);
// //console.log(decrypt(admin_pwd, encryptedData, salt, iv));

