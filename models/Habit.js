const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;