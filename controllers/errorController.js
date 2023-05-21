exports.handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        });
    } else if (process.env.NODE_ENV === 'production') {
        // 에러 메시지를 로깅합니다.
        console.error('ERROR 💥', err);

        // 500 에러의 경우 일반적인 메시지를 보여줍니다.
        if (err.statusCode === 500) {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!'
            });
        } else {
            // 그 외 에러는 원래 메시지를 보여줍니다.
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
    }
};
