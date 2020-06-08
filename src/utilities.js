const fs = require('fs');

const readFile = (path, opts = null) => new Promise((resolve, reject) => {
    fs.readFile(path, opts, (error, data) => {
        if (error) reject(error);
        else resolve(data);
    });
});

const writeFile = (path, data, opts = null) => new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (error) => {
        if (error) reject(error);
        else resolve();
    });
});

module.exports = { readFile, writeFile };