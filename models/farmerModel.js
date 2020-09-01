const mongoose = require("mongoose") 
const Schema = mongoose.Schema 
// farmer schema
const farmerSchema = new Schema ({
    name: {
        type: String, 
        maxlength: 20, 
        minlength: 3,  
        required:true
    }, 
    password: {
        type: String, 
        required: true, 
        
        minlength: 8
    }, 
    email : {
        type: String, 
        required: true, 
        unique: true
        
    }, 
    crop : {
        type: String, 
        required: true, 

    }, 
    bags: { 
        type: Number, 
        required: true
      
    }, 
    location : {
        type: String, 
        
    }
   

}) 
module.exports = mongoose.model("Farmer", farmerSchema)