const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: ture
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    mobile:{
        type: String,
        require: true,
        unique: true
    },
    address:{
        type: String,
        require: true
    },
    adharCardNumber:{
        type: Number,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User