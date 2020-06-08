const { degrees, PDFDocument, rgb } = require('pdf-lib');
const { fontkit } = require('@pdf-lib/fontkit');
const { readFile, writeFile } = require('./utilities');

module.exports = async (participants) => {
    const fontBytes = await readFile('./assets/Montserrat-SemiBold.ttf');
    const Montserrat_SemiBold = fontkit.create(fontBytes);
    participants.forEach(async (participant) => {
        const pdfBytes = await readFile('./assets/template.pdf');
        const output_folder = 'output';
        const pdfDoc = await PDFDocument.load(pdfBytes);
        await pdfDoc.embedFont(Montserrat_SemiBold);
        const firstPage = pdfDoc.getPages()[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText(participant.name.toUpperCase(), {
            x: width / 2 - 100,
            y: height / 2 - 10,
            size: 21,
            font: Montserrat_SemiBold,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        });
        const newPdfBytes = await pdfDoc.save();
        await writeFile(`./assets/${output_folder}/${participant.name}.pdf`, newPdfBytes);
    });
};