//to run: firs cd to where the index.js is:
//---> cd /Users/orlevi/Desktop/OrLevisProjects/Kanban/calm-parts-throw/server
//then run: node index.js
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./model/Item.js');
const contractorModel = require('./model/contractors');
const taskModel = require('./model/task'); // <-- Task Model
const taskStageModel = require('./model/taskStages'); // <-- TaskStage Model
const cors = require('cors');

// Start the server
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

// GET Request - Fetch data from multiple collections
app.get('/', async (req, res) => {
    try {
        const items = await itemModel.find(); // Get all items
        const contractors = await contractorModel.find(); // Get all contractors
        const tasks = await taskModel.find(); // Get all tasks
        const taskStages = await taskStageModel.find(); // Get all task stages
        console.log('Task Stages:', taskStages); // Log taskStages

        return res.json({ items, contractors, tasks, taskStages });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT Request - Update task's stage (by task's custom id)
app.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;  // This is the custom id (e.g., "8")
    const { title, description, dueDate, stageId, users, completed } = req.body;  // Get other task properties from the request body

    try {
        // Find and update the task by custom `id` (not the MongoDB `_id`)
        const updatedTask = await taskModel.findOneAndUpdate(
            { id: taskId },  // Use the custom `id` field to find the task
            { title, description, dueDate, stageId, users, completed },  // Update task properties
            { new: true }  // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// POST Request - Create new task
app.post('/tasks', async (req, res) => {
    const { title, description, dueDate, completed, stageId, users, createdAt, updatedAt } = req.body;

    try {
        const newTask = new taskModel({
            id: new mongoose.Types.ObjectId().toString(), // Generate a new id
            title,
            description,
            dueDate,
            completed: completed || false, // Default to false if not provided
            stageId,
            users,
            createdAt,
            updatedAt,
        });

        const savedTask = await newTask.save(); // Save the new task to MongoDB
        return res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE elements-->MongoDB's findByIdAndDelete uses _id, not the custom id field 

app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find and delete task by the custom `id` field
        const result = await taskModel.findOneAndDelete({ id: taskId });
        if (!result) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send({ message: 'Server error' });
    }
});


// GET Request - Fetch a single task by ID
app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        // Find a single task by ID
        const task = await taskModel.findOne({ id: taskId }); // Adjust the query if needed
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        return res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Start the server
app.listen(port, () => {
    console.log('App is running on port PORT');
});


// const express = require('express')
// const connectDB=require('./db.js')
// const itemModel = require('./model/Item.js')
// const contractorModel = require('./model/contractors')
// const cors=require('cors')

// const app = express()
// app.use(express.json())
// app.use(cors())
// connectDB()
// app.get('/',async (req,res) =>{
//     const response=await itemModel.find()//find and fetch all the records
//     return res.json({items:response})
// })
// app.listen(3000,()=>{
//     console.log("app is running");
// })