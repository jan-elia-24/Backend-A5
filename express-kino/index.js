import express from 'express';
import fs from 'fs/promises';

const app = express();

app.get('/', async (request, response) => {
    const buf = await fs.readFile('./content/index.html');
    const text = buf.toString();

    response.send(text);
});

app.listen(5080);
