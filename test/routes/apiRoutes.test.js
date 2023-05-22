const request = require('supertest'); // supertest를 가져옵니다. 이는 Express 앱을 테스트하기 위한 라이브러리입니다.
const express = require('express'); // express를 가져옵니다. 이는 웹 애플리케이션을 만드는 데 사용하는 프레임워크입니다.
const router = require('../routes/apiRoutes'); // apiRoutes를 가져옵니다.
const web3Controller = require('../../src/controllers/web3Controller'); // web3Controller를 가져옵니다.

// Jest를 사용하여 web3Controller를 모킹합니다.
jest.mock('../../src/controllers/web3Controller');

const app = express(); // Express 앱 인스턴스를 생성합니다.
app.use(express.json()); // JSON 형식의 요청 본문을 처리하도록 설정합니다.
app.use('/', router); // 라우터를 설정합니다.

// '/register' 엔드포인트에 대한 테스트를 정의합니다.
describe('POST /register', () => {
  it('should register a user and return a transaction hash', async () => {
    const user = {
      email: 'test@test.com',
      username: 'testUser',
      password: 'testPassword',
    };

    const mockTransactionHash = '0x123';

    // web3Controller의 getAccounts와 registerUser 메소드의 동작을 모킹합니다.
    web3Controller.getAccounts.mockResolvedValue(['0xabc']);
    web3Controller.getUserByUsername.mockResolvedValue(null);
    web3Controller.registerUser.mockResolvedValue(mockTransactionHash);

    // POST 요청을 보내고 응답을 받습니다.
    const res = await request(app).post('/register').send(user);

    // 응답이 예상대로 이루어졌는지 확인합니다.
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('transactionHash');
    expect(res.body.transactionHash).toBe(mockTransactionHash);
  });
});

// '/upload-photo' 엔드포인트에 대한 테스트를 정의합니다.
describe('POST /upload-photo', () => {
  it('should upload a photo and return a transaction hash', async () => {
    const file = 'testFile';
    const mockIpfsHash = 'Qm123';
    const mockTransactionHash = '0x123';

    // web3Controller의 메소드 동작을 모킹합니다.
    web3Controller.uploadPhotoToIPFS.mockResolvedValue(mockIpfsHash);
    web3Controller.registerPhoto.mockResolvedValue(mockTransactionHash);

    // POST 요청을 보내고 응답을 받습니다.
    const res = await request(app).post('/upload-photo').send({ file });

    // 응답이 예상대로 이루어졌는지 확인합니다.
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('transactionHash');
    expect(res.body.transactionHash).toBe(mockTransactionHash);
  });
});

// '/register-nft' 엔드포인트에 대한 테스트를 정의합니다.
describe('POST /register-nft', () => {
  it('should register an NFT and return a transaction hash', async () => {
    const ipfsHash = 'Qm123';
    const price = 1;
    const mockTokenId = 1;
    const mockTransactionHash = '0x123';

    // web3Controller의 메소드 동작을 모킹합니다.
    web3Controller.createNFT.mockResolvedValue(mockTokenId);
    web3Controller.registerNFT.mockResolvedValue(mockTransactionHash);

    // POST 요청을 보내고 응답을 받습니다.
    const res = await request(app)
      .post('/register-nft')
      .send({ ipfsHash, price });

    // 응답이 예상대로 이루어졌는지 확인합니다.
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('transactionHash');
    expect(res.body.transactionHash).toBe(mockTransactionHash);
  });
});

// '/buy', '/update', '/delete', '/profile', '/transaction-history', '/coin-balance', '/purchased-photos' 등과 같은 추가 엔드포인트에 대한 비슷한 테스트를 추가할 수 있습니다.

// 모든 테스트가 완료된 후에는 모든 모킹된 함수의 호출을 초기화합니다.
afterEach(() => {
  jest.clearAllMocks();
});
