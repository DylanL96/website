const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/db');
const port = process.env.PORT || 3001;
const authRoutes = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute.js');

//Middleware;
app.use(cors({
  origin: 'http://localhost:3000', // <-- location of the react app we are connecting to
  credentials: true
}))
app.use(express.json());
app.use('/', authRoutes);
app.use('/admin', adminRoutes);



//Connect to mongoDB
connectDB();


app.listen(port, () => {
  console.log(`Connected to server on port ${port}`)
})