import express from 'express';
import fs from 'fs/promises';

const app = express();

app.get('/', async (request, response) => {
    const buf = await fs.readFile('./content/index.html');
    const text = buf.toString();

    response.send(text);
});

app.get('/moviesPage.html', async (request, response) => {
    const buf = await fs.readFile('./content/moviesPage.html');
    const text = buf.toString();

    response.send(text);
});

app.use('/static', express.static('./static'));

app.use('/script', express.static('./script'));


app.listen(5080);
