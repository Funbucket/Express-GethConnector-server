const request = require('supertest'); // 'supertest' 라이브러리를 불러옵니다. HTTP 요청 테스트를 위한 라이브러리입니다.
const express = require('express'); // 'express' 라이브러리를 불러옵니다. 웹 서버를 구현하기 위한 라이브러리입니다.
const { getProfile } = require('../../src/controllers/profileController'); // 'profileController'에서 'getProfile' 함수를 가져옵니다.

// 'profileController'를 모킹합니다. 이렇게 하면 실제 함수를 호출하는 대신 가짜 함수를 호출합니다.
jest.mock('../../src/controllers/profileController');

const app = express(); // 'express' 인스턴스를 생성합니다.
app.use(express.json()); // express 애플리케이션에서 JSON 파싱 미들웨어를 사용하도록 설정합니다.
app.post('/getProfile', getProfile); // '/getProfile' 경로에 대한 POST 요청을 처리하는 라우트 핸들러를 설정합니다.

// 가짜 'getNFTCollectionFromBlockchain' 함수를 생성합니다.
const mockGetNFTCollectionFromBlockchain = jest.fn();
// 'getProfile' 함수가 내부적으로 호출하는 'getNFTCollectionFromBlockchain' 함수를 가짜 함수로 설정합니다.
getProfile.__setMockGetNFTCollectionFromBlockchain(
  mockGetNFTCollectionFromBlockchain
);

// '/getProfile' 경로에 대한 POST 요청에 대한 테스트를 정의합니다.
describe('POST /getProfile', () => {
  it('should get a user profile', async () => {
    const userAddress = 'test'; // 테스트용 사용자 주소를 설정합니다.
    const mockCollection = ['NFT1', 'NFT2', 'NFT3']; // 가짜 NFT 컬렉션을 설정합니다.
    // 가짜 'getNFTCollectionFromBlockchain' 함수가 가짜 NFT 컬렉션을 반환하도록 설정합니다.
    mockGetNFTCollectionFromBlockchain.mockReturnValue(mockCollection);

    // '/getProfile' 경로로 POST 요청을 보냅니다.
    const response = await request(app)
      .post('/getProfile')
      .send({ userAddress });

    // 응답 본문의 'userAddress'가 요청 본문의 'userAddress'와 같은지 확인합니다.
    expect(response.body.userAddress).toBe(userAddress);
    // 응답 본문의 'nftCollection'이 가짜 NFT 컬렉션과 같은지 확인합니다.
    expect(response.body.nftCollection).toEqual(mockCollection);
  });

  it('should return an error if getNFTCollectionFromBlockchain fails', async () => {
    const userAddress = 'test'; // 테스트용 사용자 주소를 설정합니다.
    // 가짜 'getNFTCollectionFromBlockchain' 함수가 오류를 던지도록 설정합니다.
    mockGetNFTCollectionFromBlockchain.mockImplementation(() => {
      throw new Error('Blockchain error');
    });

    // '/getProfile' 경로로 POST 요청을 보냅니다.
    const response = await request(app)
      .post('/getProfile')
      .send({ userAddress });

    // 응답 상태 코드가 500인지 확인합니다.
    expect(response.status).toBe(500);
    // 응답 본문의 메시지가 'Blockchain error'인지 확인합니다.
    expect(response.body.message).toBe('Blockchain error');
  });
});
