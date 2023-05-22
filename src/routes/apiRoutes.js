// 필요한 모듈들을 가져옵니다.
const express = require('express');
const router = express.Router();
const web3Controller = require('../controllers/web3Controller');
const marketplaceController = require('../controllers/marketplaceController');
const profileController = require('../controllers/profileController');
const transactionHistoryController = require('../controllers/transactionHistoryController');
const coinBalanceController = require('../controllers/coinBalanceController');
const purchasedPhotosController = require('../controllers/purchasedPhotosController');

// 에러 처리를 위한 미들웨어를 정의합니다.
const handleError = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: 회원가입
 *     description: 클라이언트의 회원가입 요청을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 성공적으로 회원가입되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionHash:
 *                   type: string
 *       400:
 *         description: 잘못된 요청 본문입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: MetaMask 지갑이 연결되어 있지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: 이미 존재하는 사용자 이름입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post(
  '/register',
  handleError(async (req, res) => {
    // 1. 클라이언트 요청에서 회원가입 정보를 받아옵니다.
    const { email, username, password } = req.body;

    // 2. 회원가입 정보가 유효한지 확인합니다.
    if (!email || !username || !password) {
      return res.status(400).send({
        message: 'Invalid request body',
      });
    }

    // 3. MetaMask 지갑을 연결합니다.
    const accounts = await web3Controller.getAccounts();
    if (accounts.length === 0) {
      return res.status(401).send({
        message: 'Please connect a MetaMask wallet',
      });
    }

    // 4. 사용자 이름이 이미 사용 중인지 확인합니다.
    const user = await web3Controller.getUserByUsername(username);
    if (user) {
      return res.status(409).send({
        message: 'Username already exists',
      });
    }

    // 5. 사용자를 블록체인에 등록합니다.
    const transactionHash = await web3Controller.registerUser(
      email,
      username,
      password
    );

    // 6. 사용자를 클라이언트에 반환합니다.
    return res.status(201).send({
      transactionHash,
    });
  })
);

/**
 * @swagger
 * /upload-photo:
 *   post:
 *     summary: 사진 업로드
 *     description: 클라이언트의 사진 업로드 요청을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *     responses:
 *       201:
 *         description: 사진이 성공적으로 업로드되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionHash:
 *                   type: string
 */
router.post(
  '/upload-photo',
  handleError(async (req, res) => {
    // 1. 클라이언트 요청에서 업로드할 사진 데이터를 받아옵니다.
    const { file } = req.body;

    // 2. 사진 데이터를 IPFS에 저장합니다.
    const ipfsHash = await web3Controller.uploadPhotoToIPFS(file);

    // 3. 사진 정보를 블록체인에 등록합니다.
    const transactionHash = await web3Controller.registerPhoto(ipfsHash);

    // 4. 사진 업로드 결과를 클라이언트에 보냅니다.
    return res.status(201).send({
      transactionHash,
    });
  })
);

/**
 * @swagger
 * /register-nft:
 *   post:
 *     summary: NFT 등록
 *     description: 클라이언트의 NFT 등록 요청을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ipfsHash:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: NFT가 성공적으로 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionHash:
 *                   type: string
 */
router.post(
  '/register-nft',
  handleError(async (req, res) => {
    // 1. 클라이언트 요청에서 NFT로 등록할 사진 정보를 받아옵니다.
    const { ipfsHash, price } = req.body;

    // 2. NFT를 생성합니다.
    const tokenId = await web3Controller.createNFT(ipfsHash, price);

    // 3. NFT를 블록체인에 등록합니다.
    const transactionHash = await web3Controller.registerNFT(tokenId);

    // 4. NFT 등록 결과를 클라이언트에 보냅니다.
    return res.status(201).send({
      transactionHash,
    });
  })
);

// NFT 구매, 업데이트, 삭제 처리를 위한 라우트를 정의합니다.
/**
 * @swagger
 * /buy:
 *   post:
 *     summary: NFT 구매
 *     description: 클라이언트의 NFT 구매 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: NFT가 성공적으로 구매되었습니다.
 */
router.post('/buy', handleError(marketplaceController.buyNFT));
/**
 * @swagger
 * /update:
 *   post:
 *     summary: NFT 업데이트
 *     description: 클라이언트의 NFT 업데이트 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: NFT가 성공적으로 업데이트되었습니다.
 */
router.post('/update', handleError(marketplaceController.updateNFT));
/**
 * @swagger
 * /delete:
 *   post:
 *     summary: NFT 삭제
 *     description: 클라이언트의 NFT 삭제 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: NFT가 성공적으로 삭제되었습니다.
 */
router.post('/delete', handleError(marketplaceController.deleteNFT));

// 사용자 프로필, 거래 내역, 코인 잔액, 구매한 사진 조회를 위한 라우트를 정의합니다.
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: 사용자 프로필 조회
 *     description: 클라이언트의 사용자 프로필 조회 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: 사용자 프로필이 성공적으로 조회되었습니다.
 */
router.get('/profile', handleError(profileController.getProfile));
/**
 * @swagger
 * /transaction-history:
 *   get:
 *     summary: 거래 내역 조회
 *     description: 클라이언트의 거래 내역 조회 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: 거래 내역이 성공적으로 조회되었습니다.
 */

router.get(
  '/transaction-history',
  handleError(transactionHistoryController.getTransactionHistory)
);
/**
 * @swagger
 * /coin-balance:
 *   get:
 *     summary: 코인 잔액 조회
 *     description: 클라이언트의 코인 잔액 조회 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: 코인 잔액이 성공적으로 조회되었습니다.
 */

router.get('/coin-balance', handleError(coinBalanceController.getCoinBalance));
/**
 * @swagger
 * /purchased-photos:
 *   get:
 *     summary: 구매한 사진 조회
 *     description: 클라이언트의 구매한 사진 조회 요청을 처리합니다.
 *     responses:
 *       200:
 *         description: 구매한 사진이 성공적으로 조회되었습니다.
 */
router.get(
  '/purchased-photos',
  handleError(purchasedPhotosController.getPurchasedPhotos)
);

// 라우터를 모듈로 내보냅니다.
module.exports = router;
