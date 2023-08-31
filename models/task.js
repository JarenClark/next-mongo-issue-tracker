const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter task name'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    type: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: [
                'Backlog',
                'In progress',
                'Stuck',
                'Testing',
                'Completed'
            ]
        }
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    relatedProject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.models.Task || mongoose.model('Task', taskSchema)