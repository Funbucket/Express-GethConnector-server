const express = require('express');
const router = express.Router();
const web3Controller = require('../controllers/web3Controller');
const marketplaceController = require('./controllers/marketplaceController');
const profileController = require('./controllers/profileController');
const transactionHistoryController = require('./controllers/transactionHistoryController');
const coinBalanceController = require('./controllers/coinBalanceController');
const purchasedPhotosController = require('./controllers/purchasedPhotosController');

// 회원가입 처리 라우트
router.post('/register', (req, res, next) => {
    // 1. 클라이언트의 요청에서 회원가입 정보를 받아옵니다.
    // 2. 회원가입 정보가 유효한지 확인합니다.
    // 3. 회원가입 정보를 데이터베이스에 저장합니다.
    // 4. 회원가입 결과를 클라이언트에 보냅니다.
    // 추가 구현: 비밀번호 암호화, 이메일 인증 등의 보안 및 신뢰성 강화 기능을 구현하면 좋을 것입니다.
});

// 사진 업로드 처리 라우트
router.post('/upload-photo', (req, res, next) => {
    // 1. 클라이언트의 요청에서 업로드할 사진 데이터를 받아옵니다.
    // 2. 사진 데이터를 서버에 저장합니다.
    // 3. 사진 업로드 결과를 클라이언트에 보냅니다.
    // 추가 구현: 사진 파일 크기 및 형식 제한, 악성 코드 검사 등의 보안 기능을 구현하면 좋을 것입니다.
});

// NFT 등록 처리 라우트
router.post('/register-nft', (req, res, next) => {
    // 1. 클라이언트의 요청에서 NFT로 등록할 사진 정보를 받아옵니다.
    // 2. 블록체인에 NFT를 생성하고 사진 정보를 등록합니다.
    // 3. NFT 등록 결과를 클라이언트에 보냅니다.
    // 추가 구현: NFT의 유일성 검증, 적절한 gas fee 계산 등의 블록체인 특성을 고려한 기능을 구현하면 좋을 것입니다.
});

// NFT 구매, 업데이트, 삭제 처리 라우트
router.post('/buy', marketplaceController.buyNFT);
router.post('/update', marketplaceController.updateNFT);
router.post('/delete', marketplaceController.deleteNFT);
// 추가 구현: NFT의 소유권 검증, 거래 내역 기록 등의 기능을 구현하면 좋을 것입니다.

// 사용자 프로필, 거래 내역, 코인 잔액, 구매한 사진 조회 라우트
router.get('/profile', profileController.getProfile);
router.get('/transaction-history', transactionHistoryController.getTransactionHistory);
router.get('/coin-balance', coinBalanceController.getCoinBalance);
router.get('/purchased-photos', purchasedPhotosController.getPurchasedPhotos);
// 추가 구현: 페이징, 검색, 필터링 등의 사용자 편의성 강화 기능을 구현하면 좋을 것입니다.

module.exports = router;
