require('dotenv').config();
const connectMongoDB = require('./utils/db/mongodb');

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
const globalErrorHandler = require('./controllers/error');
const morgan = require('morgan');
const cors = require('cors');
const mqttClient = require('./utils/mqtt');

const app = express();
app.use(cors())
const PORT = process.env.BACKEND_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


connectMongoDB();

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/weather', weatherRoutes);

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, (error) => {
  if (!error) {
    console.log('Listening on port ' + PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
