global.processed = [];
const { exportJSON } = require('./utilities');
const ParticipantsBulkExporter = require('./participants');

const App = async () => {
    await ParticipantsBulkExporter();
};

App().then(async () => {
    await exportJSON(global.processed, './assets/log.xlsx');
    console.log(`Successfully exported log file to './assets/log.xlsx'`);
}).catch(error => {
    console.log(error);
});