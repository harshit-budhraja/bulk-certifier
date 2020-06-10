const { degrees, PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const { readFile, writeFile, parseParticipantsCSV } = require('./utilities');
const moment = require('moment-timezone');
const TEMPLATE_FILES = {
    participation: './assets/templates/participation.pdf',
    runnerup2: './assets/templates/runnerup2.pdf',
    runnerup1: './assets/templates/runnerup1.pdf',
    winner: './assets/templates/winner.pdf'
}
const PARTICIPANTS_FILE = './assets/all.csv';
const OUTPUT_FOLDER = './assets/output';

const getXForName = (Name, width) => {
    const length = Name.length;
    const defaultX = (width / 2) - (6 * Name.length);
    if (length >= 23) return defaultX - 18;
    else if (length >= 15) return defaultX - 14;
    else if (length >= 11) return defaultX - 11;
    else if (length >= 7) return defaultX - 7;
    else return defaultX;
}

module.exports = async () => {
    const fontBytes = await readFile('./assets/Montserrat-SemiBold.ttf');
    const start = moment();
    const participants = await parseParticipantsCSV(PARTICIPANTS_FILE);
    const processed = [];
    for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        const { Name, cert_type } = participant;
        const pdfBytes = await readFile(TEMPLATE_FILES[cert_type]);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes);
        const firstPage = pdfDoc.getPages()[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText(Name.toUpperCase(), {
            x: getXForName(Name, width),
            y: height / 2 - 10,
            size: 21,
            font: customFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        });
        const newPdfBytes = await pdfDoc.save();
        await writeFile(`${OUTPUT_FOLDER}/${Name}.pdf`, newPdfBytes);
        processed.push({...participant, path: `${OUTPUT_FOLDER}/${Name}.pdf`, status: `SUCCESS`});
        console.log(`Processed ${cert_type} certificate for ${Name}`);
    };
    global.processed.push(...processed);
    console.log(`Exported ${participants.length} certificates in ${moment() - start} ms`);
};