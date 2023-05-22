// getCoinBalance는 사용자의 코인 잔액을 조회하는 함수입니다.
const getCoinBalance = async (req, res, next) => {
  try {
    const userAddress = req.body.userAddress; // 사용자의 주소를 요청 본문으로부터 가져옵니다.

    // 사용자 주소를 가져올 수 없거나 유효하지 않은 경우에 대한 예외 처리입니다.
    if (
      !userAddress ||
      typeof userAddress !== 'string' ||
      !isValidAddress(userAddress)
    ) {
      throw { message: 'Invalid user address', statusCode: 400 }; // 에러 메시지와 함께 예외를 발생시킵니다.
    }

    // 사용자의 주소를 이용하여 블록체인에서 사용자의 코인 잔액을 조회합니다.
    // getCoinBalanceFromBlockchain은 블록체인에 직접 접근하여 잔액을 조회하는 함수를 가정한 것입니다.
    const balance = await getCoinBalanceFromBlockchain(userAddress);

    // 잔액을 요청자에게 응답으로 보냅니다.
    // balance 변수의 값을 이용하여 JSON 형태로 응답을 만듭니다.
    res.send({ balance });
  } catch (error) {
    // 에러 처리를 위해 next 미들웨어로 에러를 전달합니다.
    // 이를 통해 Express.js의 에러 처리 미들웨어가 호출되어 적절한 에러 응답이 구성됩니다.
    next(error);
  }
};

export default getCoinBalance;
