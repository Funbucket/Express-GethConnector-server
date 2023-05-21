// 사용자의 프로필을 가져오는 함수를 정의합니다.
exports.getProfile = async (req, res) => {
    try {
        // 요청으로부터 사용자 주소를 가져와 블록체인에서 해당 사용자의 프로필을 조회합니다.
        const profile = await getUserProfileFromBlockchain(req.body.userAddress);
        // 조회한 프로필을 응답으로 보냅니다.
        res.send(profile);
    } catch (error) {
        // 에러가 발생한 경우 에러 메시지를 반환합니다.
        res.status(500).send({ message: error.message });
    }
};