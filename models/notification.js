const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user receiving the notification
  content: { type: String, required: true }, // Notification message or content
  type: { type: String, required: true }, // Type of notification (e.g., task_assigned, comment_added, due_date_reminder)
  is_read: { type: Boolean, default: false }, // Whether the user has read the notification
  created_at: { type: Date, default: Date.now }, // Timestamp when the notification was created
});


export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema)