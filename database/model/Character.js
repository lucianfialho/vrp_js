const mongoose = require('mongoose')

const Character = new mongoose.Schema({
    registration: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        default: 'Individuo'
    },
    lastName: {
        type: String,
        default: 'Indigente'
    },
    age: {
        type: Number,
        default: 21,
    },
    firstSpawn: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
})

module.exports = mongoose.model('Character', Character)