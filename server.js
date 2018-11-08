const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8888;

// Middleware
app.use(bodyParser.json());

// Default route -> Health check
app.get('/', async(req, res) => {
    const response  = 'Health check';
    res.json(response);
});

// Routes
app.use('/vehicles', require('./routes/cars'));

// Initialize server
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});