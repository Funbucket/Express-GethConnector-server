// 사용자의 거래 이력을 가져오는 함수를 정의합니다.
exports.getTransactionHistory = async (req, res) => {
    try {
        // 요청으로부터 사용자 주소를 가져와 블록체인에서 해당 사용자의 거래 이력을 조회합니다.
        const transactionHistory = await getTransactionHistoryFromBlockchain(req.body.userAddress);
        // 조회한 거래 이력을 응답으로 보냅니다.
        res.send(transactionHistory);
    } catch (error) {
        // 에러가 발생한 경우 에러 메시지를 반환합니다.
        res.status(500).send({ message: error.message });
    }
};