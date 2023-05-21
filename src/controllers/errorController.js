// handleError는 에러를 처리하는 미들웨어 함수입니다.
exports.handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;  // 에러의 상태 코드를 설정합니다. 없는 경우 500으로 설정합니다.
    err.status = err.status || 'error';  // 에러의 상태를 설정합니다. 없는 경우 'error'로 설정합니다.

    // 개발 환경인 경우에 대한 에러 처리입니다.
    if (process.env.NODE_ENV === 'development') {
        // 상태 코드, 상태, 에러 메시지, 에러 객체, 스택 트레이스를 포함하는 JSON 응답을 보냅니다.
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        });
    } else if (process.env.NODE_ENV === 'production') {  // 프로덕션 환경인 경우에 대한 에러 처리입니다.
        // 에러 메시지를 콘솔에 로깅합니다.
        console.error('ERROR 💥', err);

        // 500 에러인 경우 일반적인 에러 메시지를 보냅니다.
        if (err.statusCode === 500) {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!'
            });
        } else {
            // 그 외 에러인 경우 원래 에러 메시지를 보냅니다.
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
    }
};
