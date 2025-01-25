import { expect, test} from '@jest/globals';
import request from "supertest";
import app from '../index.js';

test('Home page shows list of movies', () => {
    request(app)
        .get('/')
        .expect('content-Type', /html/)
        .expect(200);
});