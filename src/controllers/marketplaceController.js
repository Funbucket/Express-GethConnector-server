const Web3Controller = require('../utils/web3Controller');
const web3 = Web3Controller.createWeb3Instance();
const contract = Web3Controller.getContractInstance(web3, './contracts/NFTPhoto.sol', 'NFTPhoto');

const handleBlockchainError = (res, error) => {
    res.status(500).send({ message: error.message });
};

// Request body를 검증하는 함수를 만듭니다.
const validateRequestBody = (body, requiredFields) => {
    for (let field of requiredFields) {
        if (!body[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
};

exports.buyNFT = async (req, res) => {
    try {
        validateRequestBody(req.body, ['buyerAddress', 'tokenId', 'price']);

        const { buyerAddress, tokenId, price } = req.body;
        await Web3Controller.buyPhotoNFT(contract, buyerAddress, tokenId, price);
        res.send({ message: 'Successfully purchased NFT' });
    } catch (error) {
        handleBlockchainError(res, error);
    }
};

exports.updateNFT = async (req, res) => {
    try {
        validateRequestBody(req.body, ['ownerAddress', 'tokenId', 'newPrice']);

        const { ownerAddress, tokenId, newPrice } = req.body;
        await Web3Controller.updatePhotoNFTPrice(contract, ownerAddress, tokenId, newPrice);
        res.send({ message: 'Successfully updated NFT price' });
    } catch (error) {
        handleBlockchainError(res, error);
    }
};

exports.deleteNFT = async (req, res) => {
    try {
        validateRequestBody(req.body, ['ownerAddress', 'tokenId']);

        const { ownerAddress, tokenId } = req.body;
        await Web3Controller.deletePhotoNFT(contract, ownerAddress, tokenId);
        res.send({ message: 'Successfully deleted NFT' });
    } catch (error) {
        handleBlockchainError(res, error);
    }
};
