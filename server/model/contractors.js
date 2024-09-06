const mongoose = require('mongoose')

const contractorSchema=new mongoose.Schema({
    name:String,
    description:String,
    phone:String,
    mail:String
})

const contractorModel=mongoose.model("contractors",contractorSchema)
module.exports=contractorModel