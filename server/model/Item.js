const mongoose = require('mongoose')

const itemSchema=new mongoose.Schema({
    contractor:String,
    title:String,
    month:String,
    year:String,
    value:String
})

const itemModel=mongoose.model("Item",itemSchema)
module.exports=itemModel