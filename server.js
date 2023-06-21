//import required packages

const express = require('express');
const mongoose = require('mongoose');

//middleware
const app = express();
app.use(express.json());

//start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
