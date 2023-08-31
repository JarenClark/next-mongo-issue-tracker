const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
    name: { type: String, required: true }, // Notification message or content
});

export default mongoose.models.Label || mongoose.model('Label', labelSchema)
