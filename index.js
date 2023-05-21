const express = require('express');
const cors = require('cors'); // CORS를 위한 패키지 추가
const apiRoutes = require('./routes/apiRoutes');
const errorController = require('./controllers/errorController');

const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Set up routes
app.use('/api', apiRoutes);

// Handle errors
app.use((err, req, res, next) => { // err 파라미터 추가
    if (res.headersSent) {
        return next(err);
    }
    errorController.handleError(req, res, err); // Error handling improved
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is now up and running on port ${port}`);
});

