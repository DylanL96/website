const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/db');
const port = process.env.PORT || 3001;

//Connect to mongoDB
connectDB();

app.get('/', (req, res) => {
  res.send(`Hello from ${port}`)
})

app.listen(port, () => {
  console.log(`Connected to server on port ${port}`)
})