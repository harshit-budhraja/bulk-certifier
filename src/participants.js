const { degrees, PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const { readFile, writeFile, parseParticipantsCSV } = require('./utilities');
const moment = require('moment-timezone');
if (!process.env.NODE_ENV) throw new Error("NODE_ENV not set.");
const ASSETS = `./assets/${process.env.NODE_ENV}`;

const PARTICIPANTS_FILE = `${ASSETS}/all.csv`;
const CERT_OUTPUT_FOLDER = `${ASSETS}/certificates`;
const TEMPLATE_FOLDER = `${ASSETS}/templates`;
const FONT_FILE = `${ASSETS}/fonts/Montserrat-SemiBold.ttf`;

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
    const fontBytes = await readFile(FONT_FILE);
    const start = moment();
    const participants = await parseParticipantsCSV(PARTICIPANTS_FILE);
    const processed = [];
    for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        const { Name, cert_type, Team } = participant;
        const pdfBytes = await readFile(`${TEMPLATE_FOLDER}/${cert_type}.pdf`);
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
        const outDir = `${CERT_OUTPUT_FOLDER}/${Team}`;
        const finalOutPath = `${outDir}/${Name}.pdf`;

        await writeFile(finalOutPath, newPdfBytes);
        processed.push({...participant, path: finalOutPath, status: `SUCCESS`});
        console.log(`Processed ${cert_type} certificate for ${Name} at ${finalOutPath}`);
    };
    global.processed.push(...processed);
    console.log(`Exported ${participants.length} certificates in ${moment() - start} ms`);
};