const request = require('supertest');
const express = require('express');
const { getProfile } = require('../controllers/profileController');

jest.mock('../controllers/profileController');

const app = express();
app.use(express.json());
app.post('/getProfile', getProfile);

const mockGetNFTCollectionFromBlockchain = jest.fn();
getProfile.__setMockGetNFTCollectionFromBlockchain(mockGetNFTCollectionFromBlockchain);

describe('POST /getProfile', () => {
    it('should get a user profile', async () => {
        const userAddress = 'test';
        const mockCollection = ['NFT1', 'NFT2', 'NFT3'];
        mockGetNFTCollectionFromBlockchain.mockReturnValue(mockCollection);

        const response = await request(app).post('/getProfile').send({ userAddress });

        expect(response.body.userAddress).toBe(userAddress);
        expect(response.body.nftCollection).toEqual(mockCollection);
    });

    it('should return an error if getNFTCollectionFromBlockchain fails', async () => {
        const userAddress = 'test';
        mockGetNFTCollectionFromBlockchain.mockImplementation(() => { throw new Error('Blockchain error') });

        const response = await request(app).post('/getProfile').send({ userAddress });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Blockchain error');
    });
});
