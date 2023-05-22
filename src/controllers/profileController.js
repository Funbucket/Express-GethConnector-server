// 사용자의 프로필 정보를 조회하는 함수입니다.
exports.getProfile = async (req, res) => {
  try {
    // 요청 본문에서 사용자 주소를 가져옵니다.
    const userAddress = req.body.userAddress;
    // 블록체인에서 사용자 주소에 연결된 NFT 컬렉션을 조회합니다. 이는 비동기적으로 수행됩니다.
    const nftCollection = await getNFTCollectionFromBlockchain(userAddress);
    // 조회된 정보를 바탕으로 사용자 프로필 객체를 생성합니다.
    const profile = {
      userAddress, // 사용자 주소를 프로필 객체에 추가합니다.
      nftCollection, // 조회된 NFT 컬렉션을 프로필 객체에 추가합니다.
    };
    // 생성된 프로필 객체를 클라이언트에게 응답으로 보냅니다.
    res.send(profile);
  } catch (error) {
    // 만약 프로세스 중 에러가 발생하면, 해당 에러 메시지를 클라이언트에게 응답으로 보냅니다.
    res.status(500).send({ message: error.message });
  }
};
