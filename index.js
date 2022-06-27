const express = require('express'); 
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
//Import Route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//Connecting to DB
mongoose.connect(process.env.DB_CONNECT,
() => console.log('Connected to db'));

//Middleware
app.use(express.json());

//Route Middlewares 
app.use('/', authRoute); 
app.use('/post', postRoute)

app.listen(2200, () => 
console.log('Server up and running'));
