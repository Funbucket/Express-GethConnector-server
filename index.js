const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const errorController = require('./controllers/errorController');

const app = express();

// Set up routes
app.use('/api', apiRoutes);

// Handle errors
app.use(errorController.handleError);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
