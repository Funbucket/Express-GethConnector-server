const { assert } = require('chai'); // 'chai'라는 라이브러리에서 'assert' 함수를 가져옵니다. 이 함수는 단언(assertion)을 할 때 사용됩니다.
const NFTPhoto = artifacts.require('./NFTPhoto.sol'); // Truffle 프레임워크를 사용하여 스마트 컨트랙트 'NFTPhoto'를 가져옵니다.

// 'contract' 함수는 테스트를 그룹화하는 데 사용되며, 여기서는 'NFTPhoto' 컨트랙트에 대한 테스트를 그룹화합니다.
contract('NFTPhoto', function(accounts) {
    let contract; // 테스트에 사용될 'contract' 변수를 선언합니다.

    // 'beforeEach' 함수는 각 테스트 케이스가 실행되기 전에 항상 실행되는 함수입니다.
    beforeEach(async function() {
        contract = await NFTPhoto.deployed(); // 배포된 'NFTPhoto' 컨트랙트의 인스턴스를 가져와 'contract' 변수에 저장합니다.
    });

    // 'describe' 함수는 테스트 케이스들을 그룹화합니다. 여기서는 'createPhotoNFT' 함수에 대한 테스트 케이스들을 그룹화합니다.
    describe('createPhotoNFT', function() {
        // 'it' 함수는 실제 테스트 케이스를 정의합니다.
        it('creates a new NFT and emits a TokenCreated event', async function() {
            const tokenURI = "QmYgUkahU1hMUKsD7ZMJ9KBoCynTTeKfy7WZ5eZmQy8xv7"; // 토큰 URI를 정의합니다.
            const tokenPrice = 1000; // 토큰 가격을 정의합니다.

            // 'createPhotoNFT' 함수를 호출하고 그 결과를 'result' 변수에 저장합니다.
            const result = await contract.createPhotoNFT(tokenURI, tokenPrice, { from: accounts[0] });

            // 이벤트 로그에서 첫 번째 이벤트를 가져옵니다.
            const event = result.logs[0];
            // 이벤트 이름이 'TokenCreated'인지 확인합니다.
            assert.equal(event.event, 'TokenCreated', 'TokenCreated event should be emitted');
            // 이벤트의 'tokenURI'가 우리가 설정한 'tokenURI'와 같은지 확인합니다.
            assert.equal(event.args.tokenURI, tokenURI, 'tokenURI should be the same');
            // 이벤트의 'tokenPrice'가 우리가 설정한 'tokenPrice'와 같은지 확인합니다.
            assert.equal(event.args.tokenPrice.toNumber(), tokenPrice, 'tokenPrice should be the same');
        });
    });

    // 비슷한 방식으로 'buyPhotoNFT', 'updatePhotoNFTPrice', 'deletePhotoNFT' 등의 테스트 케이스를 작성할 수 있습니다.
});
