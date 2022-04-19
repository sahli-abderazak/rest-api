const mongoose = require('mongoose')
require('dotenv').config()

const connectDB=()=>{
    mongoose.connect(process.env.mongoUrl)
    .then(()=>{console.log('connected to database')})
    .catch((err)=>console.log('error',err))
}

module.exports=connectDB