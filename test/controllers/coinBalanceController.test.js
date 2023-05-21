const request = require('supertest'); // 'supertest' 라이브러리를 불러옵니다. HTTP 요청 테스트를 위한 라이브러리입니다.
const express = require('express'); // 'express' 라이브러리를 불러옵니다. 웹 서버를 구현하기 위한 라이브러리입니다.
const { getCoinBalance } = require('../controllers/coinBalanceController'); // 'coinBalanceController'에서 'getCoinBalance' 함수를 가져옵니다.

const app = express(); // 'express' 인스턴스를 생성합니다.
app.use(express.json()); // express 애플리케이션에서 JSON 파싱 미들웨어를 사용하도록 설정합니다.
app.get('/coinBalance', getCoinBalance); // '/coinBalance' 경로에 대한 GET 요청을 처리하는 라우트 핸들러를 설정합니다.

// 'describe' 함수를 사용하여 테스트 스위트를 정의합니다. 여기서는 '/coinBalance' 경로에 대한 GET 요청에 대한 테스트를 정의합니다.
describe('GET /coinBalance', () => {
    // 'it' 함수를 사용하여 개별 테스트 케이스를 정의합니다. 이 테스트에서는 유효한 주소에 대해 코인 잔액을 반환하는지 확인합니다.
    it('responds with the coin balance for a valid address', async () => {
        // 이 테스트는 getCoinBalanceFromBlockchain이 실제로 구현된 함수라고 가정합니다.
        // 실제 블록체인에 의존하는 경우, 이 함수를 모킹해야 할 수 있습니다.
        const userAddress = '0x123'; // 실제 주소로 대체합니다.
        const expectedBalance = 100; // 실제 잔액으로 대체합니다.

        // 'request' 함수를 사용하여 서버에 요청을 보내고 그 응답을 검사합니다.
        const response = await request(app)
            .get('/coinBalance') // '/coinBalance' 경로로 GET 요청을 보냅니다.
            .send({ userAddress }); // 요청 본문에 userAddress를 포함시킵니다.

        // 응답의 상태 코드가 200이고, 응답 본문의 balance가 기대하는 잔액과 같은지 확인합니다.
        expect(response.statusCode).toBe(200);
        expect(response.body.balance).toBe(expectedBalance);
    });

    // 'it' 함수를 사용하여 또 다른 테스트 케이스를 정의합니다. 이 테스트에서는 유효하지 않은 주소에 대해 400 상태 코드를 반환하는지 확인합니다.
    it('responds with 400 for an invalid address', async () => {
        const userAddress = 'not a valid address';

        const response = await request(app)
            .get('/coinBalance') // '/coinBalance' 경로로 GET 요청을 보냅니다.
            .send({ userAddress }); // 요청 본문에 userAddress를 포함시킵니다.

        // 응답의 상태 코드가 400인지 확인합니다.
        expect(response.statusCode).toBe(400);
    });
});
