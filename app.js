const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// middlewares
app.use(cors());  // 
app.use(bodyParser.json());

// connect to DB
mongoose
  .connect(process.env.db_connection)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

// import routes
const postsRoute = require('./routes/posts');
// this is called middleware
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
  res.send('we are on home');
});

app.listen(8000);
