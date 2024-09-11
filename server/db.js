const mongoose=require('mongoose');
require('dotenv').config(); // Load environment variables
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected`)
    }catch(error){
        console.error(error);
        process.exit(1);
    }
};

module.exports=connectDB