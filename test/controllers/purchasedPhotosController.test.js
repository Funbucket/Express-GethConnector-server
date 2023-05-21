const request = require('supertest');
const express = require('express');
const { getPurchasedPhotos } = require('../controllers/purchasedPhotosController');

jest.mock('../controllers/purchasedPhotosController');

const app = express();
app.use(express.json());
app.post('/getPurchasedPhotos', getPurchasedPhotos);

const mockGetNFTCollectionFromBlockchain = jest.fn();
getPurchasedPhotos.__setMockGetNFTCollectionFromBlockchain(mockGetNFTCollectionFromBlockchain);

describe('POST /getPurchasedPhotos', () => {
    it('should get a list of purchased photos', async () => {
        const userAddress = 'test';
        const mockCollection = [
            { type: 'photo', id: 1 },
            { type: 'photo', id: 2 },
            { type: 'audio', id: 3 }
        ];
        mockGetNFTCollectionFromBlockchain.mockReturnValue(mockCollection);

        const response = await request(app).post('/getPurchasedPhotos').send({ userAddress });

        expect(response.body).toEqual([
            { type: 'photo', id: 1 },
            { type: 'photo', id: 2 }
        ]);
    });

    it('should return an error if getNFTCollectionFromBlockchain fails', async () => {
        const userAddress = 'test';
        mockGetNFTCollectionFromBlockchain.mockImplementation(() => { throw new Error('Blockchain error') });

        const response = await request(app).post('/getPurchasedPhotos').send({ userAddress });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Blockchain error');
    });
});
