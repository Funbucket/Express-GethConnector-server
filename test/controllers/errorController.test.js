const request = require('supertest'); // 'supertest' 라이브러리를 불러옵니다. HTTP 요청 테스트를 위한 라이브러리입니다.
const express = require('express'); // 'express' 라이브러리를 불러옵니다. 웹 서버를 구현하기 위한 라이브러리입니다.
const { handleError } = require('../../src/controllers/errorController'); // 'errorController'에서 'handleError' 함수를 가져옵니다.

const app = express(); // 'express' 인스턴스를 생성합니다.
app.use(express.json()); // express 애플리케이션에서 JSON 파싱 미들웨어를 사용하도록 설정합니다.
app.get('/error', (req, res, next) => {
  // '/error' 경로에 대한 GET 요청을 처리하는 라우트 핸들러를 설정합니다.
  const err = new Error('Test error'); // 에러 객체를 생성합니다.
  err.statusCode = 400; // 에러 상태 코드를 설정합니다.
  next(err); // 에러를 다음 미들웨어로 전달합니다.
});
app.use(handleError); // 'handleError' 미들웨어를 사용하여 에러를 처리합니다.

// 'describe' 함수를 사용하여 테스트 스위트를 정의합니다. 여기서는 '/error' 경로에 대한 GET 요청에 대한 테스트를 정의합니다.
describe('GET /error', () => {
  // 'it' 함수를 사용하여 개별 테스트 케이스를 정의합니다. 이 테스트에서는 에러 메시지를 반환하는지 확인합니다.
  it('should return the error message', async () => {
    const response = await request(app).get('/error'); // '/error' 경로로 GET 요청을 보냅니다.

    // 응답의 상태 코드가 400이고, 응답 본문의 message가 'Test error'인지 확인합니다.
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Test error');
  });
});
