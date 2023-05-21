import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract NFTPhoto is ERC721, Ownable {
    using Address for address payable;

    uint256 public tokenCounter;
    mapping (uint256 => string) private _tokenURIs;
    mapping (uint256 => uint256) private _tokenPrices;

    event TokenCreated(uint256 tokenId, string tokenURI, uint256 tokenPrice);
    event TokenPurchased(uint256 tokenId, address previousOwner, address newOwner, uint256 price);
    event TokenPriceUpdated(uint256 tokenId, uint256 newPrice);

    constructor () public ERC721("NFTPhoto", "NFTP") {
        tokenCounter = 0;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(_baseURI(), _tokenURIs[tokenId]));
    }

    function tokenPrice(uint256 tokenId) public view returns (uint256) {
        return _tokenPrices[tokenId];
    }

    function createPhotoNFT(string memory tokenURI, uint256 tokenPrice) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(msg.sender, newTokenId);
        _tokenURIs[newTokenId] = tokenURI;
        _tokenPrices[newTokenId] = tokenPrice;
        tokenCounter = tokenCounter + 1;

        emit TokenCreated(newTokenId, tokenURI, tokenPrice);

        return newTokenId;
    }

    function buyPhotoNFT(uint256 tokenId) public payable {
        require(msg.value >= _tokenPrices[tokenId], "Not enough funds to purchase the NFT");
        require(ownerOf(tokenId) != msg.sender, "Can't buy your own NFT");

        address previousOwner = ownerOf(tokenId);
        address newOwner = msg.sender;

        _transfer(previousOwner, newOwner, tokenId);
        payable(previousOwner).sendValue(msg.value);

        emit TokenPurchased(tokenId, previousOwner, newOwner, msg.value);
    }

    function updatePhotoNFTPrice(uint256 tokenId, uint256 newPrice) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the NFT");

        _tokenPrices[tokenId] = newPrice;

        emit TokenPriceUpdated(tokenId, newPrice);
    }

    function deletePhotoNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the NFT");

        _burn(tokenId);
        delete _tokenURIs[tokenId];
        delete _tokenPrices[tokenId];
    }
}
