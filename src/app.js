global.processed = [];
const { exportJSON } = require('./utilities');
const ParticipantsBulkExporter = require('./participants');

const App = async () => {
    await ParticipantsBulkExporter();
};

App().then(async () => {
    const logOutPath = `./assets/${process.env.NODE_ENV}/log.xlsx`;
    await exportJSON(global.processed, logOutPath);
    console.log(`Successfully exported log file to ${logOutPath}`);
}).catch(error => {
    console.log(error);
});