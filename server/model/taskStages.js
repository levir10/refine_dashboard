const mongoose = require('mongoose')

const TaskStageSchema = new mongoose.Schema({
    id: String, 
    title: String, 
    createdAt: String,
    updatedAt: String
  });

  const taskStageModel = mongoose.model('taskStages', TaskStageSchema);
  module.exports = taskStageModel;