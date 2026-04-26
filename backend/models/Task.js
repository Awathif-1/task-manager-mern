const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    default: "low"
  },
  dueDate: {
    type: Date
  }
});

module.exports = mongoose.model("Task", taskSchema);