// web3와 컨트랙트 인스턴스를 가져옵니다.
const Web3Controller = require('../utils/web3Controller');
const web3 = Web3Controller.createWeb3Instance();
const contract = Web3Controller.getContractInstance(web3, './contracts/NFTPhoto.sol', 'NFTPhoto');

// NFT를 구매하는 함수를 정의합니다.
exports.buyNFT = async (req, res) => {
    const buyerAddress = req.body.buyerAddress;  // 구매자의 주소를 가져옵니다.
    const tokenId = req.body.tokenId;  // 구매하려는 NFT의 토큰 ID를 가져옵니다.
    const price = req.body.price;  // 구매 가격을 가져옵니다.

    try {
        await Web3Controller.buyPhotoNFT(contract, buyerAddress, tokenId, price);  // NFT를 구매하는 함수를 호출합니다.
        res.send({ message: 'Successfully purchased NFT' });  // 구매 성공 메시지를 반환합니다.
    } catch (error) {
        res.status(500).send({ message: error.message });  // 에러가 발생한 경우 에러 메시지를 반환합니다.
    }
};

// NFT의 가격을 업데이트하는 함수를 정의합니다.
exports.updateNFT = async (req, res) => {
    const ownerAddress = req.body.ownerAddress;  // NFT의 소유주 주소를 가져옵니다.
    const tokenId = req.body.tokenId;  // 가격을 업데이트하려는 NFT의 토큰 ID를 가져옵니다.
    const newPrice = req.body.newPrice;  // 새로운 가격을 가져옵니다.

    try {
        await Web3Controller.updatePhotoNFTPrice(contract, ownerAddress, tokenId, newPrice);  // NFT의 가격을 업데이트하는 함수를 호출합니다.
        res.send({ message: 'Successfully updated NFT price' });  // 가격 업데이트 성공 메시지를 반환합니다.
    } catch (error) {
        res.status(500).send({ message: error.message });  // 에러가 발생한 경우 에러 메시지를 반환합니다.
    }
};

// NFT를 삭제하는 함수를 정의합니다.
exports.deleteNFT = async (req, res) => {
    const ownerAddress = req.body.ownerAddress;  // NFT의 소유주 주소를 가져옵니다.
    const tokenId = req.body.tokenId;  // 삭제하려는 NFT의 토큰 ID를 가져옵니다.

    try {
        await Web3Controller.deletePhotoNFT(contract, ownerAddress, tokenId);  // NFT를 삭제하는 함수를 호출합니다.
        res.send({ message: 'Successfully deleted NFT' });  // 삭제 성공 메시지를 반환합니다.
    } catch (error) {
        res.status(500).send({ message: error.message });  // 에러가 발생한 경우 에러 메시지를 반환합니다.
    }
};

// 추가 구현: 위의 코드는 기본적인 NFT 구매, 가격 업데이트, 삭제에 대한 로직을 담고 있습니다. 이에 더해, NFT의 소유자 변경 이력을 추적하거나, NFT의 소유자에게 알림을 보내는 기능 등을 추가할 수 있습니다. 또한, 컨트랙트의 gas cost 최적화와 사용자 입력에 대한 검증 로직을 더욱 강화하는 것이 좋습니다.
