'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Default route -> Health check
app.get('/', async(req, res) => {
    const  response  = 'Health check';
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

