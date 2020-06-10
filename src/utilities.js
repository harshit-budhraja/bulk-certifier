const fs = require('fs');
const csv = require('neat-csv');
const json2xls = require('json2xls');

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

const parseParticipantsCSV = async (path) => {
    const rows = [];
    const data = await csv(await readFile(path));
    data.forEach(row => {
        if (row.cert_type !== '')
            rows.push({
                Name: row.Name,
                Email: row.Email,
                Team: row.Team,
                cert_type: row.cert_type
            });
    });
    return rows;
};

const exportJSON = (jsonData, path) => new Promise((resolve, reject) => {
    writeFile(path, json2xls(jsonData), 'binary').then(() => resolve()).catch((error) => reject(error));
});

module.exports = { readFile, writeFile, parseParticipantsCSV, exportJSON };