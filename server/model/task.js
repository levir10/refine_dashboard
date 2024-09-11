const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    id:String,
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean,
    stageId: String,
    users: [
      {
        id: String,
        name: String,
        avatarUrl: String
      }
    ],
    createdAt: String,
    updatedAt: String
  });

const taskModel=mongoose.model("task",TaskSchema)
module.exports=taskModel