// OpenZeppelin의 ERC721과 Ownable을 상속받아서 새로운 NFTPhoto 스마트 컨트랙트를 정의합니다.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTPhoto is ERC721, Ownable {
    // 새로운 NFT를 만들 때마다 1씩 증가시킬 토큰 카운터 변수를 선언합니다.
    uint256 public tokenCounter;

    // 각 토큰의 ID를 매핑하는 변수들을 선언합니다.
    mapping (uint256 => string) public tokenURI;
    mapping (uint256 => address) public tokenOwner;
    mapping (uint256 => uint256) public tokenPrice;

    // 컨트랙트가 배포될 때, 초기 토큰 카운터를 0으로 설정합니다.
    constructor () public ERC721("NFTPhoto", "NFTP") {
        tokenCounter = 0;
    }

    // 사진 NFT를 생성하는 함수를 정의합니다. 이 함수는 컨트랙트의 소유자만 호출할 수 있습니다.
    function createPhotoNFT(string memory _tokenURI, uint256 _tokenPrice) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(msg.sender, newTokenId);  // 새로운 토큰을 발행합니다.
        tokenURI[newTokenId] = _tokenURI;  // 토큰의 URI를 저장합니다.
        tokenPrice[newTokenId] = _tokenPrice;  // 토큰의 가격을 저장합니다.
        tokenCounter = tokenCounter + 1;  // 토큰 카운터를 1 증가시킵니다.
        return newTokenId;  // 새로운 토큰 ID를 반환합니다.
    }

    // 사진 NFT를 구매하는 함수를 정의합니다.
    function buyPhotoNFT(uint256 _tokenId) public payable {
        require(msg.value >= tokenPrice[_tokenId], "Not enough funds to purchase the NFT");  // 구매 가격 검증
        require(ownerOf(_tokenId) != msg.sender, "Can't buy your own NFT");  // 자기 자신의 NFT를 구매하는 것을 방지

        address previousOwner = ownerOf(_tokenId);  // 이전 소유자 주소를 저장합니다.
        address newOwner = msg.sender;  // 새로운 소유자 주소를 저장합니다.

        _transfer(previousOwner, newOwner, _tokenId);  // 토큰의 소유권을 이전합니다.
        tokenOwner[_tokenId] = newOwner;  // 새로운 소유자를 저장합니다.

        payable(previousOwner).transfer(msg.value);  // 이전 소유자에게 이더를 전송합니다.
    }

    // 사진 NFT의 가격을 업데이트하는 함수를 정의합니다. 이 함수는 토큰의 소유자만 호출할 수 있습니다.
    function updatePhotoNFTPrice(uint256 _tokenId, uint256 _newPrice) public {
        require(tokenOwner[_tokenId] == msg.sender, "Not the owner of the NFT");  // 토큰 소유자 검증

        tokenPrice[_tokenId] = _newPrice;  // 새 가격을 저장합니다.
    }

    // 사진 NFT를 삭제하는 함수를 정의합니다. 이 함수는 토큰의 소유자만 호출할 수 있습니다.
    function deletePhotoNFT(uint256 _tokenId) public {
        require(tokenOwner[_tokenId] == msg.sender, "Not the owner of the NFT");  // 토큰 소유자 검증

        _burn(_tokenId);  // 토큰을 삭제합니다.
        delete tokenOwner[_tokenId];  // 토큰 소유자 정보를 삭제합니다.
        delete tokenURI[_tokenId];  // 토큰의 URI를 삭제합니다.
        delete tokenPrice[_tokenId];  // 토큰의 가격 정보를 삭제합니다.
    }
}
// 추가 구현: 위에 구현된 사진 NFT에 대한 다양한 기능들을 더 추가할 수 있습니다. 예를 들면, 사진의 저작권 관련 정보를 담은 메타데이터를 추가하거나, 사진을 좋아요 및 평가할 수 있는 기능 등을 추가할 수 있습니다. 또한, 다양한 이벤트를 통해 사용자에게 중요한 액션에 대한 알림을 줄 수 있습니다.
