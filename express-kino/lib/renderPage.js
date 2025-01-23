import fs from 'fs/promises';

export default async function renderPage(response, page) {
    try {
        response.render(page);
    } catch (error) {
        console.error(`Error rendering page "${page}":`, error);
        response.status(500).send('An error occurred while rendering the page.');
    }
}