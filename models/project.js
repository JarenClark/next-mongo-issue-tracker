const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter project name'],
        trim: true,
    },
    groups: [
        {
            group_name: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required:false,
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.models.Project || mongoose.model('Project', projectSchema)