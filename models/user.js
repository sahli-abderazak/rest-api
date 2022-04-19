const mongoose = require('mongoose')
const {Schema,model}=mongoose;
const ContactSchema =  new Schema (

{
    name : { type : String , required : true}  , 
    age :  { type : Number } 
}
)
const Contact =model("Contact",ContactSchema)
module.exports = Contact