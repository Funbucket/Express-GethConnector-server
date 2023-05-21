const request = require('supertest');
const express = require('express');
const { buyNFT, updateNFT, deleteNFT } = require('../controllers/marketplaceController');
// 이거 에러 뜰 거 같은데 web3Controller 같은 경우는 controllers에 있는데
const Web3Controller = require('../utils/web3Controller');

jest.mock('../utils/web3Controller');

const app = express();
app.use(express.json());
app.post('/buyNFT', buyNFT);
app.post('/updateNFT', updateNFT);
app.post('/deleteNFT', deleteNFT);

beforeEach(() => {
    Web3Controller.buyPhotoNFT.mockReset();
    Web3Controller.updatePhotoNFTPrice.mockReset();
    Web3Controller.deletePhotoNFT.mockReset();
});

describe('POST /buyNFT', () => {
    it('should purchase an NFT', async () => {
        const body = { buyerAddress: 'test', tokenId: 1, price: 10 };

        const response = await request(app).post('/buyNFT').send(body);

        expect(Web3Controller.buyPhotoNFT).toHaveBeenCalledWith(expect.anything(), body.buyerAddress, body.tokenId, body.price);
        expect(response.body.message).toBe('Successfully purchased NFT');
    });
});

describe('POST /updateNFT', () => {
    it('should update an NFT', async () => {
        const body = { ownerAddress: 'test', tokenId: 1, newPrice: 10 };

        const response = await request(app).post('/updateNFT').send(body);

        expect(Web3Controller.updatePhotoNFTPrice).toHaveBeenCalledWith(expect.anything(), body.ownerAddress, body.tokenId, body.newPrice);
        expect(response.body.message).toBe('Successfully updated NFT price');
    });
});

describe('POST /deleteNFT', () => {
    it('should delete an NFT', async () => {
        const body = { ownerAddress: 'test', tokenId: 1 };

        const response = await request(app).post('/deleteNFT').send(body);

        expect(Web3Controller.deletePhotoNFT).toHaveBeenCalledWith(expect.anything(), body.ownerAddress, body.tokenId);
        expect(response.body.message).toBe('Successfully deleted NFT');
    });
});
