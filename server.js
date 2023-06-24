//import required packages

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
