import express from 'express'; // Express.js를 위한 패키지를 가져옵니다.
import cors from 'cors'; // CORS를 위한 패키지를 가져옵니다.
import { default as apiRoutes } from './routes/apiRoutes.js';
import contract from '@truffle/contract';
import { swaggerUi, specs } from '../swagger/swagger.js';
import { createWeb3Instance } from './controllers/web3Controller.js';
import handleError from './controllers/errorController.js';

let NFTPhoto = contract('../build/contracts/NFTPhoto.json');
const web3Instance = createWeb3Instance();

NFTPhoto.setProvider(web3Instance.currentProvider);

const app = express(); // Express.js 애플리케이션을 생성합니다.
// JSON 데이터를 파싱하기 위한 미들웨어를 설정합니다.
app.use(express.json());

// CORS 처리를 위한 미들웨어를 설정합니다.
app.use(cors());

// swagger 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
  handleError(req, res, err); // 개선된 에러 처리기
});
const port = process.env.PORT || 80; // 서버가 실행될 포트를 설정합니다. 환경 변수로부터 PORT 값을 얻거나 없을 경우 5000을 사용합니다.

app.listen(port, () => {
  // 설정한 포트에서 서버를 실행합니다.
  console.log(`Server is now up and running on port ${port}`); // 서버가 실행되면 콘솔에 로그를 출력합니다.
});
