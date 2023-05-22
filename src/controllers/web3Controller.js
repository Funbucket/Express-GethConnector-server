// Web3 라이브러리를 가져옵니다.
const Web3 = require('web3');
// 상수를 정의한 파일을 가져옵니다.
const constants = require('../constants');
// 파일 시스템 관련 작업을 위한 Node.js 내장 모듈을 가져옵니다.
const fs = require('fs');
// Solidity 컴파일러를 가져옵니다.
const solc = require('solc');

// Truffle contract를 가져옵니다.
const contract = require("@truffle/contract");
// NFTPhoto 컨트랙트 아티팩트를 가져옵니다.
const contractJSON = require("../build/contracts/NFTPhoto.json");

// Web3 인스턴스를 생성하는 함수를 정의합니다.
exports.createWeb3Instance = () => {
  // 새로운 Web3 인스턴스를 생성하고 HTTP 프로바이더를 사용하여 이더리움 노드에 연결합니다.
  return new Web3(new Web3.providers.HttpProvider(constants.INFURA_URI));
};

// 스마트 계약의 인스턴스를 가져오는 함수를 정의합니다.
exports.getContractInstance = (web3Instance) => {
  let NFTPhoto = contract(contractJSON);
  NFTPhoto.setProvider(web3Instance.currentProvider);
  return NFTPhoto;
};

async function getCoinBalanceFromBlockchain(web3Instance, address) {
  try {
    const NFTPhoto = exports.getContractInstance(web3Instance);
    const contractInstance = await NFTPhoto.deployed();
    // Now use contractInstance to call your contract methods
  } catch (error) {
    console.error(`Failed to load contract: ${error}`);
  }
}

// 트랜잭션을 보내는 함수를 정의합니다.
exports.sendTransaction = async (
  contract,
  address,
  gasLimit,
  method,
  ...methodArgs
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // 계약의 메서드를 호출하고 트랜잭션을 보냅니다.
    await contract.methods[method](...methodArgs).send({
      from: address,
      gas: gasLimit,
    });
  } catch (error) {
    // 에러가 발생하면 에러를 던집니다.
    throw error;
  }
};

// 사진 NFT를 구매하는 함수를 정의합니다.
exports.buyPhotoNFT = async (contract, buyerAddress, tokenId, price) => {
  // 'buyPhotoNFT' 메서드를 호출하는 트랜잭션을 보냅니다.
  return exports.sendTransaction(
    contract,
    buyerAddress,
    constants.GAS_LIMIT,
    'buyPhotoNFT',
    tokenId,
    price
  );
};

// 사진 NFT의 가격을 업데이트하는 함수를 정의합니다.
exports.updatePhotoNFTPrice = async (
  contract,
  ownerAddress,
  tokenId,
  newPrice
) => {
  // 'updatePhotoNFTPrice' 메서드를 호출하는 트랜잭션을 보냅니다.
  return exports.sendTransaction(
    contract,
    ownerAddress,
    constants.GAS_LIMIT,
    'updatePhotoNFTPrice',
    tokenId,
    newPrice
  );
};

// 사진 NFT를 삭제하는 함수를 정의합니다.
exports.deletePhotoNFT = async (contract, ownerAddress, tokenId) => {
  // 'deletePhotoNFT' 메서드를 호출하는 트랜잭션을 보냅니다.
  return exports.sendTransaction(
    contract,
    ownerAddress,
    constants.GAS_LIMIT,
    'deletePhotoNFT',
    tokenId
  );
};
