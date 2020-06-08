const ParticipantsBulkExporter = require('./participants');

const participants = [
    { id: 1, name: "Harshit Budhraja" },
    { id: 2, name: "Himanshu Nikhare" },
    { id: 3, name: "Sanya Kapoor" },
    { id: 4, name: "Kaustubh Kishore" }
];

const App = async () => {
    await ParticipantsBulkExporter(participants);
};

App().then(() => {
    console.log('Done');
}).catch(error => {
    console.log(error);
});