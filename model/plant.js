const mongoose = require('mongoose')

const Plant = new mongoose.Schema({
    name: String,
    watered: Boolean,
    lastWatered: Date,
    consecutive: Number
})

module.exports = mongoose.model('plant', Plant);