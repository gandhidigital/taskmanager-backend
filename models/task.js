const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  validator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String },
  dueDate: { type: Date },
  notes: { type: String },
  parentTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

