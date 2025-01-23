import fs from 'fs/promises';

export default async function renderPage(response, page) {
    try {
        const contentBuf = await fs.readFile(`./content/${page}.html`);
        const contentText = contentBuf.toString();

        const templateBuf = await fs.readFile('./templates/main.html');
        const templateText = templateBuf.toString();

        const outputHtml = templateText.replace('Hello', contentText);

        response.send(outputHtml);
    } catch (error) {
        console.error(`Error rendering page "${page}":`, error);
        response.status(500).send('An error occurred while rendering the page.');
    }
}