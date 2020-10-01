const mongoose = require('mongoose')

const User = new mongoose.Schema({
    steamId:{
        type: String,
		required: true,
		unique: true,
		index: true
	},
	last_login:{
		type: Date,
		default: Date.now
	},
    queue_priority:{
        type: Number,
        default: 0
    },
	whitelisted:{
		type: Boolean,
		default: 0,
	},
    banned:{
        type: Boolean,
        default: 0,
    },
    bannedBy:{
        type: String,
        required: false,
        default: "Não afetado."
    },
    personLimit:{
        type: Number,
        default: 1,
    },
    character: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character'
        }
    ]
})

module.exports = mongoose.model('User', User)