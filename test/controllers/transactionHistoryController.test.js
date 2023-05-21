const request = require('supertest');
const express = require('express');
const { getTransactionHistory } = require('../controllers/transactionHistoryController');

jest.mock('../controllers/transactionHistoryController');

const app = express();
app.use(express.json());
app.post('/getTransactionHistory', getTransactionHistory);

const mockGetNFTCollectionFromBlockchain = jest.fn();
getTransactionHistory.__setMockGetNFTCollectionFromBlockchain(mockGetNFTCollectionFromBlockchain);

describe('POST /getTransactionHistory', () => {
    it('should get transaction history', async () => {
        const userAddress = 'test';
        const mockCollection = [
            { id: 1, transactionHistory: ['tx1', 'tx2'] },
            { id: 2, transactionHistory: ['tx3'] }
        ];
        mockGetNFTCollectionFromBlockchain.mockReturnValue(mockCollection);

        const response = await request(app).post('/getTransactionHistory').send({ userAddress });

        expect(response.body).toEqual([
            ['tx1', 'tx2'],
            ['tx3']
        ]);
    });

    it('should return an error if getNFTCollectionFromBlockchain fails', async () => {
        const userAddress = 'test';
        mockGetNFTCollectionFromBlockchain.mockImplementation(() => { throw new Error('Blockchain error') });

        const response = await request(app).post('/getTransactionHistory').send({ userAddress });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Blockchain error');
    });
});
