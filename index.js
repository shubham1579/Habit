const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/', require('./routes/habits'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
