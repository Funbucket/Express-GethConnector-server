const request = require('supertest');
const express = require('express');
const router = require('../routes/apiRoutes');
const web3Controller = require('../controllers/web3Controller');

// Jest Mocks
jest.mock('../controllers/web3Controller');

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /register', () => {
    it('should register a user and return a transaction hash', async () => {
        const user = {
            email: 'test@test.com',
            username: 'testUser',
            password: 'testPassword',
        };

        const mockTransactionHash = '0x123';

        // Mock the behavior of web3Controller.getAccounts and web3Controller.registerUser
        web3Controller.getAccounts.mockResolvedValue(['0xabc']);
        web3Controller.getUserByUsername.mockResolvedValue(null);
        web3Controller.registerUser.mockResolvedValue(mockTransactionHash);

        const res = await request(app)
            .post('/register')
            .send(user);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('transactionHash');
        expect(res.body.transactionHash).toBe(mockTransactionHash);
    });
});

describe('POST /upload-photo', () => {
    it('should upload a photo and return a transaction hash', async () => {
        const file = 'testFile';
        const mockIpfsHash = 'Qm123';
        const mockTransactionHash = '0x123';

        // Mock the behavior of web3Controller methods
        web3Controller.uploadPhotoToIPFS.mockResolvedValue(mockIpfsHash);
        web3Controller.registerPhoto.mockResolvedValue(mockTransactionHash);

        const res = await request(app)
            .post('/upload-photo')
            .send({ file });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('transactionHash');
        expect(res.body.transactionHash).toBe(mockTransactionHash);
    });
});

describe('POST /register-nft', () => {
    it('should register an NFT and return a transaction hash', async () => {
        const ipfsHash = 'Qm123';
        const price = 1;
        const mockTokenId = 1;
        const mockTransactionHash = '0x123';

        // Mock the behavior of web3Controller methods
        web3Controller.createNFT.mockResolvedValue(mockTokenId);
        web3Controller.registerNFT.mockResolvedValue(mockTransactionHash);

        const res = await request(app)
            .post('/register-nft')
            .send({ ipfsHash, price });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('transactionHash');
        expect(res.body.transactionHash).toBe(mockTransactionHash);
    });
});

// Add similar tests for '/buy', '/update', '/delete', '/profile', '/transaction-history', '/coin-balance', '/purchased-photos' endpoints

afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
});
