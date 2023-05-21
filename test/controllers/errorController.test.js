const request = require('supertest');
const express = require('express');
const { handleError } = require('../controllers/errorController');

const app = express();
app.use(express.json());
app.get('/error', (req, res, next) => {
    const err = new Error('Test error');
    err.statusCode = 400;
    next(err);
});
app.use(handleError);

describe('GET /error', () => {
    it('should return the error message', async () => {
        const response = await request(app).get('/error');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Test error');
    });
});
