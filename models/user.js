const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter user name'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please enterr password'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.models.User || mongoose.model('User', userSchema)