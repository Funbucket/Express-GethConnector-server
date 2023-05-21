// 사용자의 프로필을 가져오는 함수를 정의합니다.
exports.getProfile = async (req, res) => {
    try {
        // 요청으로부터 사용자 주소를 가져옵니다.
        const userAddress = req.body.userAddress;
        // 사용자의 NFT 컬렉션을 가져옵니다.
        const nftCollection = await getNFTCollectionFromBlockchain(userAddress);
        // 사용자의 프로필을 생성합니다.
        const profile = {
            userAddress,
            nftCollection,
        };
        // 프로필을 응답으로 보냅니다.
        res.send(profile);
    } catch (error) {
        // 에러가 발생한 경우 에러 메시지를 반환합니다.
        res.status(500).send({ message: error.message });
    }
};