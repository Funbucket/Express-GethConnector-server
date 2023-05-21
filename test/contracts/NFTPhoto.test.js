const { assert } = require('chai');
const NFTPhoto = artifacts.require('./NFTPhoto.sol');

contract('NFTPhoto', function(accounts) {
    let contract;

    beforeEach(async function() {
        contract = await NFTPhoto.deployed();
    });

    describe('createPhotoNFT', function() {
        it('creates a new NFT and emits a TokenCreated event', async function() {
            const tokenURI = "QmYgUkahU1hMUKsD7ZMJ9KBoCynTTeKfy7WZ5eZmQy8xv7";
            const tokenPrice = 1000;

            const result = await contract.createPhotoNFT(tokenURI, tokenPrice, { from: accounts[0] });

            const event = result.logs[0];
            assert.equal(event.event, 'TokenCreated', 'TokenCreated event should be emitted');
            assert.equal(event.args.tokenURI, tokenURI, 'tokenURI should be the same');
            assert.equal(event.args.tokenPrice.toNumber(), tokenPrice, 'tokenPrice should be the same');
        });
    });

    // Similarly, you can write tests for buyPhotoNFT, updatePhotoNFTPrice, and deletePhotoNFT

});
