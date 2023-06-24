//import required packages

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const Thought = require('./models/thought');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create mongoose connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



mongoose.connection.on('connected', () => {
  console.log('Connected to the MongoDB database');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to the MongoDB database: ${err}`);
});

