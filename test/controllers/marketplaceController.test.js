const request = require('supertest'); // 'supertest' 라이브러리를 불러옵니다. HTTP 요청 테스트를 위한 라이브러리입니다.
const express = require('express'); // 'express' 라이브러리를 불러옵니다. 웹 서버를 구현하기 위한 라이브러리입니다.
// 'marketplaceController'에서 'buyNFT', 'updateNFT', 'deleteNFT' 함수를 가져옵니다.
const {
  buyNFT,
  updateNFT,
  deleteNFT,
} = require('../../src/controllers/marketplaceController');
// 'web3Controller'를 불러옵니다. 이 파일은 실제로 존재해야 합니다.
const Web3Controller = require('../../src/controllers/web3Controller');

// 'web3Controller'를 모킹합니다. 이렇게 하면 실제 함수를 호출하는 대신 가짜 함수를 호출합니다.
jest.mock('../../src/controllers/web3Controller.js');

const app = express(); // 'express' 인스턴스를 생성합니다.
app.use(express.json()); // express 애플리케이션에서 JSON 파싱 미들웨어를 사용하도록 설정합니다.
// 각각의 경로에 대한 POST 요청을 처리하는 라우트 핸들러를 설정합니다.
app.post('/buyNFT', buyNFT);
app.post('/updateNFT', updateNFT);
app.post('/deleteNFT', deleteNFT);

// 각 테스트 전에 호출될 콜백 함수를 정의합니다.
beforeEach(() => {
  // 모킹된 함수들의 호출 정보를 초기화합니다.
  Web3Controller.buyPhotoNFT.mockReset();
  Web3Controller.updatePhotoNFTPrice.mockReset();
  Web3Controller.deletePhotoNFT.mockReset();
});

// '/buyNFT' 경로에 대한 POST 요청에 대한 테스트를 정의합니다.
describe('POST /buyNFT', () => {
  it('should purchase an NFT', async () => {
    // POST 요청의 본문을 정의합니다.
    const body = { buyerAddress: 'test', tokenId: 1, price: 10 };

    // '/buyNFT' 경로로 POST 요청을 보냅니다.
    const response = await request(app).post('/buyNFT').send(body);

    // buyPhotoNFT 함수가 예상대로 호출되었는지 확인합니다.
    expect(Web3Controller.buyPhotoNFT).toHaveBeenCalledWith(
      expect.anything(),
      body.buyerAddress,
      body.tokenId,
      body.price
    );
    // 응답 본문의 메시지가 'Successfully purchased NFT'인지 확인합니다.
    expect(response.body.message).toBe('Successfully purchased NFT');
  });
});

// '/updateNFT' 경로에 대한 POST 요청에 대한 테스트를 정의합니다.
describe('POST /updateNFT', () => {
  it('should update an NFT', async () => {
    // POST 요청의 본문을 정의합니다.
    const body = { ownerAddress: 'test', tokenId: 1, newPrice: 10 };

    // '/updateNFT' 경로로 POST 요청을 보냅니다.
    const response = await request(app).post('/updateNFT').send(body);

    // updatePhotoNFTPrice 함수가 예상대로 호출되었는지 확인합니다.
    expect(Web3Controller.updatePhotoNFTPrice).toHaveBeenCalledWith(
      expect.anything(),
      body.ownerAddress,
      body.tokenId,
      body.newPrice
    );
    // 응답 본문의 메시지가 'Successfully updated NFT price'인지 확인합니다.
    expect(response.body.message).toBe('Successfully updated NFT price');
  });
});

// '/deleteNFT' 경로에 대한 POST 요청에 대한 테스트를 정의합니다.
describe('POST /deleteNFT', () => {
  it('should delete an NFT', async () => {
    // POST 요청의 본문을 정의합니다.
    const body = { ownerAddress: 'test', tokenId: 1 };

    // '/deleteNFT' 경로로 POST 요청을 보냅니다.
    const response = await request(app).post('/deleteNFT').send(body);

    // deletePhotoNFT 함수가 예상대로 호출되었는지 확인합니다.
    expect(Web3Controller.deletePhotoNFT).toHaveBeenCalledWith(
      expect.anything(),
      body.ownerAddress,
      body.tokenId
    );
    // 응답 본문의 메시지가 'Successfully deleted NFT'인지 확인합니다.
    expect(response.body.message).toBe('Successfully deleted NFT');
  });
});
