const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please enter comment name'],
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    relatedTask: {
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    },
    parentComment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'    
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.models.Comment || mongoose.model('Comment', commentSchema)