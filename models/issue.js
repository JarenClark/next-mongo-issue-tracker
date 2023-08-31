const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  project_id: { type: Schema.Types.ObjectId, ref: 'Project' },
  issue_key: { type: String, unique: true },
  summary: { type: String, required: true },
  description: String,
  reporter_id: { type: Schema.Types.ObjectId, ref: 'User' },
  assignee_id: { type: Schema.Types.ObjectId, ref: 'User' },
  priority: String,
  status: String,
  created_at: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
