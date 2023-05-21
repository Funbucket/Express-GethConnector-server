exports.getCoinBalance = async (req, res, next) => {
    try {
        const userAddress = req.body.userAddress;

        // 요청으로부터 사용자 주소를 가져왔는지 확인하고, 주소가 유효한지 확인합니다.
        if (!userAddress || typeof userAddress !== 'string' || !isValidAddress(userAddress)) {
            throw { message: 'Invalid user address', statusCode: 400 };
        }

        // 블록체인에서 해당 사용자의 코인 잔액을 조회합니다.
        const balance = await getCoinBalanceFromBlockchain(userAddress);

        // 조회한 잔액을 응답으로 보냅니다.
        res.send({ balance });
    } catch (error) {
        // 에러를 next 미들웨어로 전달합니다.
        next(error);
    }
};
