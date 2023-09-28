//require the library
const mongoose = require('mongoose');
const env = require('./env');

//connect to the database
mongoose.connect(process.env.MONGO_URL);

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to database: MongoDB");

});

module.exports = db;