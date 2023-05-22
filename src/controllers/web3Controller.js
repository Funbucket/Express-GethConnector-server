// Web3 라이브러리를 가져옵니다.
import Web3 from 'web3';

// 상수를 정의한 파일을 가져옵니다.
import constants from '../constants.js';

// Truffle contract를 가져옵니다.
import TruffleContract from '@truffle/contract';

// Web3 인스턴스를 생성하는 함수를 정의합니다.
export const createWeb3Instance = () => {
  // 새로운 Web3 인스턴스를 생성하고 HTTP 프로바이더를 사용하여 이더리움 노드에 연결합니다.
  return new Web3(new Web3.providers.HttpProvider(constants.INFURA_URI));
};

// 스마트 계약의 인스턴스를 가져오는 함수를 정의합니다.
export const getContractInstance = (web3Instance) => {
  const NFTPhoto = TruffleContract('../../build/contracts/NFTPhoto.json');
  NFTPhoto.setProvider(web3Instance.currentProvider);
  return NFTPhoto;
};

// 트랜잭션을 보내는 함수를 정의합니다.
export const sendTransaction = async (
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
export const buyPhotoNFT = async (
  contractInstance,
  buyerAddress,
  tokenId,
  price
) => {
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
export const updatePhotoNFTPrice = async (
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
export const deletePhotoNFT = async (
  contractInstance,
  ownerAddress,
  tokenId
) => {
  return exports.sendTransaction(
    contractInstance,
    ownerAddress,
    constants.GAS_LIMIT,
    'deletePhotoNFT',
    tokenId
  );
};

// IPFS에 사진을 업로드하는 함수를 정의합니다.
// export const uploadPhotoToIPFS = async (file) => {
//   try {
//     const ipfs = ipfsClient({
//       host: 'localhost',
//       port: 80,
//       protocol: 'http',
//     });
//     const result = await ipfs.add(file);
//     console.log(result);
//   } catch (error) {
//     throw error;
//   }
// };

// 사진을 블록체인에 등록하는 함수를 정의합니다.
// export const registerPhoto = async (ipfsHash) => {
//   try {
//     const contractInstance = await getContractInstance(web3Instance);
//     const accounts = await web3Instance.eth.getAccounts();
//     const ownerAddress = accounts[0];
//     await sendTransaction(
//       contractInstance,
//       ownerAddress,
//       constants.GAS_LIMIT,
//       'registerPhoto',
//       ipfsHash
//     );

//     const transactionHash = '0x123abc'; // 등록된 사진의 트랜잭션 해시값

//     return transactionHash;
//   } catch (error) {
//     throw error;
//   }
// };

// MetaMask와 연결하는 함수
export async function getAccounts() {
  // MetaMask와 연결하는 로직을 구현합니다.
}

// 사용자 이름으로 사용자를 조회하는 함수
export async function getUserByUsername(username) {
  // 사용자 이름으로 사용자를 조회하는 로직을 구현합니다.
}

// 사용자를 블록체인에 등록하는 함수
export async function registerUser(email, username, password) {
  // 사용자를 블록체인에 등록하는 로직을 구현합니다.
}

// 사진을 IPFS에 업로드하는 함수
export async function uploadPhotoToIPFS(file) {
  // 사진을 IPFS에 업로드하는 로직을 구현합니다.
}

// 사진을 블록체인에 등록하는 함수
export async function registerPhoto(ipfsHash) {
  // 사진을 블록체인에 등록하는 로직을 구현합니다.
}

// NFT를 생성하는 함수
export async function createNFT(ipfsHash, price) {
  // NFT를 생성하는 로직을 구현합니다.
}

// NFT를 블록체인에 등록하는 함수
export async function registerNFT(tokenId) {
  // NFT를 블록체인에 등록하는 로직을 구현합니다.
}
