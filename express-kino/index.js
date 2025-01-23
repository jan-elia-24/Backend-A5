import express from 'express';
import fs from 'fs/promises';

const app = express();

async function renderPage(response, page) {
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

app.get('/', (request, response) => {
    renderPage(response, 'index');
});

app.get('/moviesPage', async (request, response) => {
    renderPage(response, 'moviesPage');
});

app.use('/static', express.static('./static'));

app.use('/script', express.static('./script'));


app.listen(5080);
