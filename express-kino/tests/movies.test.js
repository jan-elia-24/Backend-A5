import { expect, test } from '@jest/globals';
import request from "supertest";
import app from '../index.js';

test('Home page shows list of movies', async () => {
    const response = await request(app)
        .get('/allmovies')
        .expect('Content-Type', /html/)
        .expect(200);


    expect(response.text).toMatch('Pulp Fiction');
    expect(response.text).toMatch('Fire Walk With Me');
    expect(response.text).toMatch('Isle of dogs');
    expect(response.text).toMatch('Min granne Totoro');
    expect(response.text).toMatch('The Shawshank Redemption');
    expect(response.text).toMatch('Forrest Gump');
    expect(response.text).toMatch('The Muppets');
    expect(response.text).toMatch('Encanto');
    expect(response.text).toMatch('Training Day');
});