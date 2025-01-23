import express from 'express';
import { engine } from 'express-handlebars';
import renderPage from './lib/renderPage.js'

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.get('/', (request, response) => {
    renderPage(response, 'index');
});

app.get('/moviesPage', async (request, response) => {
    renderPage(response, 'moviesPage');
});
    
app.use('/static', express.static('./static'));

app.use('/script', express.static('./script'));


app.listen(5080);
