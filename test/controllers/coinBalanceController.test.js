const request = require('supertest');
const express = require('express');
const { getCoinBalance } = require('../controllers/coinBalanceController');

const app = express();
app.use(express.json());
app.get('/coinBalance', getCoinBalance);

describe('GET /coinBalance', () => {
    it('responds with the coin balance for a valid address', async () => {
        // NOTE: This assumes that getCoinBalanceFromBlockchain is a real function that you've implemented
        // You may need to mock this function if it relies on an actual blockchain
        const userAddress = '0x123'; // Replace with a real address
        const expectedBalance = 100; // Replace with a real balance

        const response = await request(app)
            .get('/coinBalance')
            .send({ userAddress });

        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBe(expectedBalance);
    });

    it('responds with 400 for an invalid address', async () => {
        const userAddress = 'not a valid address';

        const response = await request(app)
            .get('/coinBalance')
            .send({ userAddress });

        expect(response.statusCode).toBe(400);
    });
});
