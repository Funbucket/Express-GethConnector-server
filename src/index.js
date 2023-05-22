const express = require('express'); // Express.js 프레임워크를 가져옵니다.
const cors = require('cors'); // 웹 애플리케이션 간 자원 공유를 가능하게 하는 CORS(Cross-Origin Resource Sharing)를 위한 패키지를 가져옵니다.
const apiRoutes = require('./routes/apiRoutes'); // API 라우트 설정을 가져옵니다.
const errorController = require('./controllers/errorController'); // 에러 처리 컨트롤러를 가져옵니다.

const app = express(); // Express.js 애플리케이션을 생성합니다.

// JSON 데이터를 파싱하기 위한 미들웨어를 설정합니다.
app.use(express.json());

// CORS 처리를 위한 미들웨어를 설정합니다.
app.use(cors());

// 라우트를 설정합니다.
app.use('/api', apiRoutes);

// 에러를 처리합니다. 이 부분은 모든 라우트 다음에 위치해야 합니다.
app.use((err, req, res, next) => {
  // err 파라미터가 추가된 에러 핸들링 함수입니다.
  if (res.headersSent) {
    // 만약 이미 응답 헤더가 전송된 경우에는, 다음 미들웨어를 호출합니다.
    return next(err);
  }
  // 에러를 처리하는 컨트롤러를 호출합니다.
  errorController.handleError(req, res, err); // 개선된 에러 처리기
});

const port = process.env.PORT || 5000; // 서버가 실행될 포트를 설정합니다. 환경 변수로부터 PORT 값을 얻거나 없을 경우 5000을 사용합니다.
app.listen(port, () => {
  // 설정한 포트에서 서버를 실행합니다.
  console.log(`Server is now up and running on port ${port}`); // 서버가 실행되면 콘솔에 로그를 출력합니다.
});

const web3Instance =
  require('./controllers/web3Controller').createWeb3Instance();
const getCoinBalanceFromBlockchain = require('./controllers/web3Controller/getCoinBalanceFromBlockchain');

console.log('hello', getCoinBalanceFromBlockchain(web3Instance, '0x123'));
