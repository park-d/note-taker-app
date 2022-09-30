const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');

const app = express();

app.use('/api', apiRouter);
app.use('/', htmlRouter);

module.exports = app;
