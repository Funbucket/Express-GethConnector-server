exports.getPurchasedPhotos = async (req, res) => {
    try {
        // Request body에 userAddress가 포함되어 있는지 확인합니다.
        validateRequestBody(req.body, ['userAddress']);

        const userAddress = req.body.userAddress;
        const nftCollection = await getNFTCollectionFromBlockchain(userAddress);

        const purchasedPhotos = nftCollection.filter(nft => nft.type === 'photo');

        res.send(purchasedPhotos);
    } catch (error) {
        // 에러가 발생한 경우 에러 메시지를 반환합니다.
        handleBlockchainError(res, error);
    }
};
