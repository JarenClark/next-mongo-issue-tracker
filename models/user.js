const mongoose = require('mongoose')
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter user name'],
        trim: true,
    },
    fName: {
        type: String,
        trim: true,
    },
    lName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [6, 'Password must be longer than 6 characters'],
        trim: true,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


export default mongoose.models.User || mongoose.model('User', userSchema)