const express = require('express')
const app = express();
app.use(express.json());
const tourRouter = require('./routes/tourRoutes');
const tutorialRouter = require('./routes/tutorialRoutes');

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/tutorial',tutorialRouter);

module.exports =  app;