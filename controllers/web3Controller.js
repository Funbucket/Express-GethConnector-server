const Web3 = require('web3');
const constants = require('../constants');
const fs = require('fs');
const solc = require('solc');

// 기존 코드...
exports.createWeb3Instance = () => {
    return new Web3(new Web3.providers.HttpProvider(constants.INFURA_URI));
};

exports.getContractInstance = (web3, contractPath, contractName) => {
    const source = fs.readFileSync(contractPath, 'utf8');
    const compiledContract = solc.compile(source, 1);
    const contractABI = compiledContract.contracts[`:${contractName}`].interface;

    return new web3.eth.Contract(JSON.parse(contractABI), constants.CONTRACT_ADDRESS);
};

exports.buyPhotoNFT = (contract, buyerAddress, tokenId, price) => {
    return contract.methods.buyPhotoNFT(tokenId)
        .send({ from: buyerAddress, value: price, gas: constants.GAS_LIMIT });
};

exports.updatePhotoNFTPrice = (contract, ownerAddress, tokenId, newPrice) => {
    return contract.methods.updatePhotoNFTPrice(tokenId, newPrice)
        .send({ from: ownerAddress, gas: constants.GAS_LIMIT });
};

exports.deletePhotoNFT = (contract, ownerAddress, tokenId) => {
    return contract.methods.deletePhotoNFT(tokenId)
        .send({ from: ownerAddress, gas: constants.GAS_LIMIT });
};
