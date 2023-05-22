// 사용자의 거래 기록을 가져오는 함수를 정의합니다.
exports.getTransactionHistory = async (req, res) => {
  try {
    // 요청 본문에 'userAddress'가 존재하는지 검증합니다.
    validateRequestBody(req.body, ['userAddress']);

    // 요청 본문에서 사용자 주소를 추출합니다.
    const userAddress = req.body.userAddress;
    // 블록체인에서 사용자 주소에 연결된 NFT 컬렉션을 조회합니다. 이는 비동기적으로 수행됩니다.
    const nftCollection = await getNFTCollectionFromBlockchain(userAddress);

    // 조회된 NFT 컬렉션에서 각 NFT의 거래 기록을 추출합니다.
    const transactionHistory = nftCollection.map(
      (nft) => nft.transactionHistory
    );

    // 추출한 거래 기록을 응답으로 보냅니다.
    res.send(transactionHistory);
  } catch (error) {
    // 만약 에러가 발생하면, 해당 에러를 처리하고 에러 메시지를 응답으로 보냅니다.
    handleBlockchainError(res, error);
  }
};
