const Web3 = require('web3');
const constants = require('../constants');
const fs = require('fs');
const solc = require('solc');

exports.createWeb3Instance = () => {
    return new Web3(new Web3.providers.HttpProvider(constants.INFURA_URI));
};

exports.getContractInstance = (web3, contractPath, contractName) => {
    const source = fs.readFileSync(contractPath, 'utf8');
    const compiledContract = solc.compile(source, 1);
    const contractABI = compiledContract.contracts[contractName].interface;

    return new web3.eth.Contract(JSON.parse(contractABI), constants.CONTRACT_ADDRESS);
};

exports.sendTransaction = async (contract, address, gasLimit, method, ...methodArgs) => {
    try {
        await contract.methods[method](...methodArgs).send({ from: address, gas: gasLimit });
    } catch (error) {
        throw error;
    }
};

exports.buyPhotoNFT = async (contract, buyerAddress, tokenId, price) => {
    return exports.sendTransaction(contract, buyerAddress, constants.GAS_LIMIT, 'buyPhotoNFT', tokenId, price);
};

exports.updatePhotoNFTPrice = async (contract, ownerAddress, tokenId, newPrice) => {
    return exports.sendTransaction(contract, ownerAddress, constants.GAS_LIMIT, 'updatePhotoNFTPrice', tokenId, newPrice);
};

exports.deletePhotoNFT = async (contract, ownerAddress, tokenId) => {
    return exports.sendTransaction(contract, ownerAddress, constants.GAS_LIMIT, 'deletePhotoNFT', tokenId);
};