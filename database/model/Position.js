const mongoose = require('mongoose')

const Position = new mongoose.Schema({
    x: {
        type: Number,
        default: 141.88966369629,
    },
    y: {
        type: Number,
        default: -996.70471191406,
    },
    z: {
        type: Number,
        default: 29.35743713378,
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Character'
    }
})

module.exports = mongoose.model('Position', Position)