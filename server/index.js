const express = require('express');
const connectDB = require('./db.js');
const itemModel = require('./model/Item.js');
const contractorModel = require('./model/contractors');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get('/', async (req, res) => {
    try {
        // Fetch data from both collections
        const items = await itemModel.find(); // Get all items
        const contractors = await contractorModel.find(); // Get all contractors

        // Send combined response
        return res.json({ items: items, contractors: contractors });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
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