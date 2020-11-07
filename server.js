const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/db');
const port = process.env.PORT || 3001;
const authRoutes = require('./routes/auth');

//Middleware;
app.use(cors());
app.use(express.json());
app.use('/', authRoutes);


//Connect to mongoDB
connectDB();


app.listen(port, () => {
  console.log(`Connected to server on port ${port}`)
})