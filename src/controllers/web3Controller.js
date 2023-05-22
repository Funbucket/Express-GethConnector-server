// Web3 라이브러리를 가져옵니다.
const Web3 = require('web3');
// 상수를 정의한 파일을 가져옵니다.
const constants = require('../constants');

// Truffle contract를 가져옵니다.
const TruffleContract = require("@truffle/contract");
// NFTPhoto 컨트랙트 아티팩트를 가져옵니다.
const contractJSON = require("../../build/contracts/NFTPhoto.json");

// Web3 인스턴스를 생성하는 함수를 정의합니다.
exports.createWeb3Instance = () => {
  // 새로운 Web3 인스턴스를 생성하고 HTTP 프로바이더를 사용하여 이더리움 노드에 연결합니다.
  return new Web3(new Web3.providers.HttpProvider(constants.INFURA_URI));
};

// 스마트 계약의 인스턴스를 가져오는 함수를 정의합니다.
exports.getContractInstance = (web3Instance) => {
  const NFTPhoto = TruffleContract(contractJSON);
  NFTPhoto.setProvider(web3Instance.currentProvider);
  return NFTPhoto;
};

// 트랜잭션을 보내는 함수를 정의합니다.
exports.sendTransaction = async (
    contractInstance,
    address,
    gasLimit,
    method,
    ...methodArgs
) => {
  try {
    await contractInstance.methods[method](...methodArgs).send({
      from: address,
      gas: gasLimit,
    });
  } catch (error) {
    throw error;
  }
};

// 사진 NFT를 구매하는 함수를 정의합니다.
exports.buyPhotoNFT = async (contractInstance, buyerAddress, tokenId, price) => {
  return exports.sendTransaction(
      contractInstance,
      buyerAddress,
      constants.GAS_LIMIT,
      'buyPhotoNFT',
      tokenId,
      price
  );
};

// 사진 NFT의 가격을 업데이트하는 함수를 정의합니다.
exports.updatePhotoNFTPrice = async (
    contractInstance,
    ownerAddress,
    tokenId,
    newPrice
) => {
  return exports.sendTransaction(
      contractInstance,
      ownerAddress,
      constants.GAS_LIMIT,
      'updatePhotoNFTPrice',
      tokenId,
      newPrice
  );
};

// 사진 NFT를 삭제하는 함수를 정의합니다.
exports.deletePhotoNFT = async (contractInstance, ownerAddress, tokenId) => {
  return exports.sendTransaction(
      contractInstance,
      ownerAddress,
      constants.GAS_LIMIT,
      'deletePhotoNFT',
      tokenId
  );
};
